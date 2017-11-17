import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Orders} from "/imports/api/orders/orders.js"

import { allUsersMount,
        allCardUsersMount,
        getLimitUserIds,
        getBasicUserById,
        getUserByAgencyId,
      } from './actions.js';

Meteor.methods({
  'user.role'() {
    if (!Meteor.user()) {

      return [];
    }
    return Meteor.user().roleId;
  },
  'users.count'(){
    return allUsersMount();
  },
  'users.cards.count'(){
    return allCardUsersMount();
  },

  'get.userIds.limit'(condition, page, pageSize){
    return getLimitUserIds(condition, page, pageSize);
  },
  'get.users.limit'(condition={},page=1, pageSize=20){
    let users =  Meteor.users.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
          'roles': 1,
          'profile': 1,
          'username': 1,
          'createdAt': 1,
          'cards': 1,
          'carnumber': 1,
        }
      }
    );
    return users.fetch();
  },

  'get.users.addOnToady'(){
    let date = new Date();
    var currentDate = date.Format("yyyy/MM/dd");
    let nextdate = (new Date((date/1000+86400)*1000))
    var nextDate = nextdate.Format("yyyy/MM/dd");

    return Meteor.users.find({createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)}}).count();
  },

  'get.user.id'(userId){
    return getBasicUserById(userId);
  },
  "get.user.agencyId"(agencyId){
    return getUserByAgencyId(agencyId);
  },


  'users.cards.addOnToady'(){
    let date = new Date();
    let nextdate = (new Date((date/1000+86400)*1000))
    var currentDate = date.Format("yyyy/MM/dd");
    var nextDate = nextdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)}, status:'paid',type:'card'}).count();

  },
  'users.cards.addOnWeek'(){
    var day_of_week = new Date().getDay()
    if( day_of_week == 0){
       day_of_week = 7
    }
    let date = new Date();
    let exdate = (new Date((date/1000-day_of_week*86400)*1000))
    var currentDate =  (new Date((date/1000+86400)*1000)).Format("yyyy/MM/dd");
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card'}).count();
  }
});

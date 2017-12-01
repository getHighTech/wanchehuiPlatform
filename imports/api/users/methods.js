import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import {Orders} from "/imports/api/orders/orders.js"

import { allUsersMount,
        allCardUsersMount,
        getLimitUserIds,
        getBasicUserById,
        getUserByAgencyId,
        chengduCardUsersMount,
        beijingCardUsersMount,removeUserById
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
  'users.cards.chengducount'(){
    return chengduCardUsersMount();
  },
  'users.cards.beijingcount'(){
    return beijingCardUsersMount();
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


  'get.orders.addOnToadyInChengDu'(){
    let date = new Date();
    var currentDate = date.Format("yyyy/MM/dd");
    let nextdate = (new Date((date/1000+86400)*1000))
    var nextDate = nextdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)},"type":"card","area":"CHENGDU",status:'paid',}).count();
  },


  'get.orders.addOnToadyInBeiJing'(){
    let date = new Date();
    var currentDate = date.Format("yyyy/MM/dd");
    let nextdate = (new Date((date/1000+86400)*1000))
    var nextDate = nextdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)},"type":"card","area":"BEIJING",status:'paid',}).count();
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
  },

  'get.orders.InThisWeekInBeiJing'(){
    var day_of_week = new Date().getDay()
    if( day_of_week == 0){
       day_of_week = 7
    }

    let date = new Date();
    let exdate = (new Date((date/1000-day_of_week*86400)*1000))
    console.log(exdate);
    var currentDate =  (new Date((date/1000+86400)*1000)).Format("yyyy/MM/dd");
    // console.log(currentDate);
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card',area:'BEIJING'}).count();
  },

  'get.orders.InThisMonthInBeiJing'(){
    let date =new Date();
    let currentDate = date.Format("yyyy/MM/dd");
    let day_of_month =new Date().getDate()-1;
    let exdate=(new Date((date/1000-day_of_month*86400)*1000));
    var exDate = exdate.Format("yyyy/MM/dd");
    console.log(exDate);
    return Orders.find({createdAt: {'$gte':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card',area:'BEIJING'}).count();
  },

  'get.orders.InThisWeekInChengDu'(){
    var day_of_week = new Date().getDay()
    if( day_of_week == 0){
       day_of_week = 7
    }
    let date = new Date();
    let exdate = (new Date((date/1000-day_of_week*86400)*1000))
    var currentDate =  (new Date((date/1000+86400)*1000)).Format("yyyy/MM/dd");
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card',area:'CHENGDU'}).count();
  },



  'get.orders.InThisMonthInChengDu'(){
    let date =new Date();
    let currentDate = date.Format("yyyy/MM/dd");
    let day_of_month =new Date().getDate();
    let exdate=(new Date((date/1000-day_of_month*86400)*1000));
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card',area:'CHENGDU'}).count();
  },

  'users.remove'(userId){
    return removeUserById(userId);
  },



});

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { allUsersMount, allCardUsersMount } from './actions.js';

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
  'get.users.limit'(condition={},page=0, pagesize=20){
    let users =  Meteor.users.find(condition, {
      skip: page*pagesize, limit: pagesize,
      sort: {createdAt: -1},
      fields:
        {
          'roles': 1,
          'profile': 1,
          'username': 1,
          'createdAt': 1,
          'member_status': 1,
          'coupons': 1,
          'fansCount': 1,
          'cards': 1,
        }
      }
    );
    return users.fetch();
  }


});

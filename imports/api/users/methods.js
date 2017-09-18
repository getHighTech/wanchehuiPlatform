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
  }


});

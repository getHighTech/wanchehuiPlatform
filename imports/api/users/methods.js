import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {ScoreRecords} from './score_records.js';
import {Activities} from '/imports/api/activities/activities.js';
import {LoginRecords} from './login_records.js';
import { Accounts } from 'meteor/accounts-base';
import { allUsersMount } from './actions.js';

Meteor.methods({
  'user.role'() {
    if (!Meteor.user()) {

      return [];
    }
    return Meteor.user().roleId;
  },
  'users.count'(){
    return allUsersMount();
  }


});

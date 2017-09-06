import { Meteor } from 'meteor/meteor';
import {getRoleByUsername} from './basic_actions.js';

Meteor.methods({
  'role.by.username'(username) {
    return getRoleByUsername(username);
  },
});

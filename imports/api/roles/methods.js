import { Meteor } from 'meteor/meteor';
import {getRoleByUsername} from './actions.js';

Meteor.methods({
  'role.by.username'(username) {
    return getRoleByUsername(username);
  },
});

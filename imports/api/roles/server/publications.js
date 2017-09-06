// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Roles } from '../roles.js';

Meteor.publish('roles.all', function(){
  let current_user = Meteor.users.findOne({_id: this.userId});
  if (current_user == undefined) {
    this.stop();
  }
  return Roles.find({_id: current_user.roleId}, {sort: {createdAt: -1}});
});

// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Roles } from '../roles.js';

Meteor.publish('roles.current', function(){
  let current_user = Meteor.users.findOne({_id: this.userId});
  if (current_user == undefined) {
    this.stop();
  }
  return Roles.find({users: {$all: [this.userId]}}, {sort: {createdAt: -1}});
});

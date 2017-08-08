import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';

Meteor.publish('user.unread.messages', function(){

  return Messages.find({toUser: this.userId, state: 0}, {sort: {createdAt: -1}});
});

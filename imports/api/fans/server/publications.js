// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Fans } from '../fans.js';

Meteor.publish('fans.all', function(){
  return Fans.find({userId: this.userId}, {sort: {createdAt: -1}});
});
Meteor.publish('emojis', function() {
  // Here you can choose to publish a subset of all emojis
  // if you'd like to.
  return Emojis.find();
});

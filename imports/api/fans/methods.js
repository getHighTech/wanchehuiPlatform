import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Fans } from './fans.js';
Meteor.methods({
  'fans.update.count'(userId) {
    let fansCount = Fans.find({userId: userId}).count();
    Meteor.users.update(userId, {
      $set: {
        fansCount
      }
    });
    return fansCount;
  },
});

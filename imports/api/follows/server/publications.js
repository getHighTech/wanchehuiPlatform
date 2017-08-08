// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Follows } from '../follows.js';

Meteor.publish('follows.recentPost', function(timelong=86400000){
  let d = new Date();
  return Follows.find({followed: this.userId, recentPost: {
    $gte: new Date(d.getTime()-timelong),
    $lte: new Date()
  }});
});

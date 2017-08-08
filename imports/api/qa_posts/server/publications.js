// All links-related publications

import { Meteor } from 'meteor/meteor';
import { QaPosts } from '../qa_posts.js';

Meteor.publish('qa_posts.all', function(){
  return QaPosts.find({}, {sort: {createdAt: -1}});
});

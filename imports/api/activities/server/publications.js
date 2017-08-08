// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Activities } from '../activities.js';
import { Fans } from '../../fans/fans.js';
import { Follows } from '../../follows/follows.js';

Meteor.publish('activities.current_user.all', function(){
  return Activities.find({userId: this.userId}, {sort: {createdAt: -1}});
});
Meteor.publish('activities.current_user.limit', function(page, pagesize){
  return Activities.find(
    {userId: this.userId},
    {skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}});
});

Meteor.publish('activities.user.all', function(id){
  return Activities.find({userId: id}, {sort: {createdAt: -1}});
});

Meteor.publish('activities.should.know', function(follows_contion){
  return Activities.find({$or: follows_contion}, {sort: {createdAt: -1}});
});

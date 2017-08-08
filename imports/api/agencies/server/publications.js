// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Agencies } from '../agencies.js';



Meteor.publish('get.root.agencies', function(page, pagesize, productId){
  let currentUser = Meteor.users.findOne({_id: this.userId});
  if (currentUser.username == "wanchehui") {
    return Agencies.find({isRoot: true, productId: productId}, { skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}});
  }
  let agencyMe = Agencies.findOne({userId: this.userId});
  if (agencyMe == undefined) {
    return Agencies.find({superAgencyId: null, isRoot: false, productId: productId}, { skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}});
  }
  return Agencies.find({superAgencyId: agencyMe._id, isRoot: false, productId}, { skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}});

});


Meteor.publish('get.subs.agencies', function(page, pagesize, superAgencyId){
  return Agencies.find({isRoot: false, superAgencyId}, { skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}});
});


Meteor.publish('get.ids.agencies', function(ids){
  console.log(ids);
  let agencies = Agencies.find({_id: {$in: ids}}, {sort: {createdAt: -1}});
  console.log(agencies.fetch());
  return Agencies.find({_id: {$in: ids}}, {sort: {createdAt: -1}});
});

Meteor.publish('get.product.username.agencies', function(page, pagesize, username, productId){
  let user = Meteor.users.findOne({username});
  return Agencies.find({isRoot: false, userId: user._id, productId}, { skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}});
});

// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Services } from '../services.js';

Meteor.publish('services.getOne', function(){
  return Services.find({userId: this.userId}, {sort: {createdAt: -1}});
});


Meteor.publish('user.services.limit', function(page=0, pagesize=20){
  return Services.find({publishedUserId: this.userId}, {
    skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}
  });
});

Meteor.publish('services.type.limit', function(serviceType="",page=0, pagesize=40){
  let skip = page*pagesize
  let services = Services.find({serviceType: eval("/"+serviceType+"/")}, {
    skip, limit: pagesize, sort: {createdAt: -1}
  });
  console.log(services.fetch());
  return services;
});
Meteor.publish('services.getone.id', function(id){
  return Services.find({_id: id});
});

import { Meteor } from 'meteor/meteor';

import { Orders } from '../orders.js';

Meteor.publish('user.orders', function(page=0,pagesize=40){

  return Orders.find({createdBy: this.userId},
    {skip:page*pagesize, limit: pagesize,sort: {createdAt: -1}});
});

Meteor.publish('orders.all', function(){

  return Orders.find({},{sort: {createdAt: -1}});
});


Meteor.publish('orders.product.id', function(productId, page=0,pagesize=10){

  return Orders.find({productId},
    {skip:page*pagesize, limit: pagesize,sort: {createdAt: -1}});
});
Meteor.publish('orders.getone.id', function(id, page=0,pagesize=10){
  return Orders.find({_id: id},
    {skip:page*pagesize, limit: pagesize,sort: {createdAt: -1}});
});

// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Products } from '../products.js';


Meteor.publish('user.products', function (pageId) {
  return Products.find({pageId: pageId});
});

Meteor.publish('products.user_id', function(user_id, page, pagesize
){
  return Products.find({userId: user_id},
  {skip: page*pagesize, limit: pagesize, sort: {createdAt: -1}});
  
});

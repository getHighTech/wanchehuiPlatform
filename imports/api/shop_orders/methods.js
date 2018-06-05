import { Meteor } from 'meteor/meteor';
import { ShopOrders } from './shop_orders.js';

Meteor.methods({
  'get.shoporder'(){
    return ShopOrders.find().fetch()
  }


  });

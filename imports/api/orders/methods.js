import {Orders } from './orders';

Meteor.methods({
  'orders.insert'(type,name, mobile,
    carNubmer,productId, count,
    price, realNote){
    return Orders.insert({
      type,name, mobile, carNubmer,productId, count, price,realNote,
      createdBy: Meteor.userId(),
      status: 'unpaid',
      createdAt: new Date
    })
  }

});

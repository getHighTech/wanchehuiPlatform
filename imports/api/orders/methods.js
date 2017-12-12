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
  },
  'orders.orderdata'(condition={},page=1,pageSize=20){
    console.log(page,pageSize);
    let orderdata =  Orders.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
        'type':1,
        'username':1,
        'name':1,
        'mobile':1,
        'carNubmer':1,
        'location':1,
        'price':1,
        'status':1,
      }

    })
    return chargesdata.fetch();
  },
  }
  'orders.count'(){
    return Orders.find().count();
  }
});

import { Meteor } from 'meteor/meteor';
import {Orders} from './orders.js';
import {ordersCount} from './actions.js';


Meteor.methods({
  // 'orders.insert'(type,name, mobile,
  //   carNubmer,productId, count,
  //   price, realNote){
  //   return Orders.insert({
  //     type,name, mobile, carNubmer,productId, count, price,realNote,
  //     createdBy: Meteor.userId(),
  //     status: 'unpaid',
  //     createdAt: new Date
  //   })
  // },
  'orders.insert'(params){
    console.log(params)
      return Orders.insert({
          type: params.type,
          username:params.username,
          name: params.name,
          mobile: params.mobile,
          carNubmer: params.carNubmer,
          location: params.location,
          price: params.price,
          status: params.status,
        });
      },
  'orders.ordersdata'(condition,page=1,pageSize=20){
    console.log(page,pageSize);
    let ordersdata = Orders.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
        'type':1,
        'name':1,
        'realNote':1,
        'mobile':1,
        'location':1,
        'price':1,
        'status':1,
        'createdAt':1,
        // 'realNote':1,
      }
    }
  )
    return ordersdata.fetch();
  },
  'orders.count'(condition){
    console.log("call orders.count")
    console.log(condition)
    return ordersCount(condition);
    //return Orders.find(condition).count();
  },
  "orders.status.updatePaid"(_id){
    return Orders.update(_id,{
      $set:{
        status:"paid"
      }
    })

  }
});

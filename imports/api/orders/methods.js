import { Meteor } from 'meteor/meteor';
import {Orders} from './orders.js';
import {Shops} from '../shops/shops.js';
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
  'app.orders.insert'(params){
    return  Orders.insert({
      type: params.type,
      userId: params.userId,
      status: params.status,
      shopId: params.shopId,
      products: params.products,
      username: params.username,
      address: params.adderss,
      
    })
    // return {
    //   ...orders,
    //   formMethod: 'app.orders.insert'
    // }
  },
  'app.order.getone'(id) {
    let order =  Orders.findOne({
      _id: id
    })
    let shop = Shops.findOne({_id: order.shopId})
    return {
     order,
     shop
   }
  },
  'app.order.update'(params) {
    console.log(params)
      return Orders.update(
      { _id: params.id},
      {$set:{remark:params.remark, address: params.address, shop_name: params.shop_name}}
     )
  },

  'orders.insert'(params){
      return  Orders.insert({
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
    let ordersdata = Orders.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
        'type':1,
        'name':1,
        'realNote':1,
        'mobile':1,
        'area':1,
        'price':1,
        'status':1,
        'createdAt':1,
      }
    }
  )
    return ordersdata.fetch();
  },
  'orders.accouts'(ids) {
    return Orders.find({createdBy: {$in: ids}}).fetch();
  },
  'orders.count'(condition){
    return ordersCount(condition);
    //return Orders.find(condition).count();
  },
  "orders.status.updatePaid"(_id){
    return Orders.update(_id,{
      $set:{
        status:"paid"
      }
    })

  },
  "get.orders.InThisTime"(condition){
    return Orders.find(condition,{sort: {"createdAt": -1}}).fetch();
  },
  "get.orders.InThisTimeCount"(condition){
    return Orders.find(condition).count();
  },
  "get.allOrders"(userId){
    let orders =  Orders.find({'createdBy':userId}).fetch();
    console.log(orders)
    if(orders.length > 0){
      return orders
    }else{
      return Orders.find({'userId':userId}).fetch();
    }
  },
  "get.paidOrders"(userId){
    let orders =  Orders.find({'createdBy':userId,'status':'paid'}).fetch();
    console.log(orders)
    if(orders.length > 0){
      return orders
    }else{
      return Orders.find({'userId':userId}).fetch();
    }
  },
  "get.unpaidOrders"(userId){
    let orders =  Orders.find({'createdBy':userId,'status':'unpaid'}).fetch();
    if(orders.length > 0){
      return orders
    }else{
      return Orders.find({'userId':userId}).fetch();
    }
  }
});

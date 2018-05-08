import { Meteor } from 'meteor/meteor';
import {Orders} from './orders.js';
import {Shops} from '../shops/shops.js';
import {ShopCarts} from '../shop_cart/shop_cart.js';
import {ordersCount} from './actions.js';
import { generateRondom } from './helper.js'
import { validLoginToken } from '../actions/validLoginToken.js';

Meteor.methods({
  'app.orders.insert'(params){
     let  orderCode = new Date().getTime().toString()+generateRondom(10).toString();
     let order = Orders.insert({
      type: params.type,
      userId: params.userId,
      status: params.status,
      shopId: params.shop_id,
      shopCover: params.shopCover,
      shopName: params.shopName,
      shopAddress: params.shopAddress,
      products: params.products,
      username: params.username,
      mobile: params.mobile,
      orderCode,
      remark: '',
      createdAt : new Date(),
    })
    return {
      orderCode,
      formMethod: 'app.orders.insert'
    }
  },
  'app.shop_carts.orders'(product,filter,userId) {
    console.log(product);
    console.log(filter);
    console.log(userId);

    let  orderCode = new Date().getTime().toString()+generateRondom(10).toString();
    for(var i=0;i<product.length;i++){
      if(product[i].productsData.length !== 0 )
         var order = Orders.insert({
             userId,
             status: 'unpaid',
             address: "user.address.id",
             username: product[i].username,
             nickname: product[i].nickname,
             mobile: product[i].mobile,
             shopId: product[i].shop_id,
             products: product[i].productsData,
             orderCode,
             remark: '',
             createdAt : new Date(),
          })
         if(order){
           ShopCarts.update(
             { userId },
              { $set:
                {"shopsData": filter}
              }
            )
         }
    }
    return {
      orderCode,
      formMethod: 'app.shop_carts.orders',
    }
  },
  'app.order.getone'(id) {
    let total = 0;
    let orders =  Orders.find({
      orderCode: id
    }).fetch()
    console.log('order: ' + orders.length            );
    for(var i=0;i<orders.length;i++){

      for(var j =0;j<orders[i].products.length; j++) {
        total += orders[i].products[j].count*orders[i].products[j].productSpec.spec_value/100
      }
    }
   return {
    orders,
    total,
    formMethod: 'app.order.getone'
   }
  },
  'app.getOrderByCode'(code) {
    let order =  Orders.findOne({
      orderCode: code
    })
   return {
    order,
    formMethod: 'app.getOrderByCode'
   }
  },
  'app.order.update'(params) {
    console.log(params)
      return Orders.update(
      { _id: params.id},
      {$set:{remark:params.remark, address: params.address, shopName: params.shopName}}
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
  'orders.getShopId'(id){
    console.log(id);
    console.log(Orders.find({'products.shopId':id}).fetch());
    return Orders.find({'products.shopId':id}).fetch();
  },
  'orders.accouts'(ids) {
    return Orders.find({createdBy: {$in: ids}}).fetch();
  },
  'orders.count'(condition){
    return ordersCount(condition);
  },
  "orders.status.updatePaid"(_id){
    return Orders.update(_id,{
      $set:{
        status:"paid"
      }
    })

  },
  "shopOrders.updateStatus"(_id,status){
    return Orders.update(_id,{
      $set:{
        status:status
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
    let orders =  Orders.find({'userId':userId}).fetch();
    // console.log(orders)
    if(orders.length > 0){
      return orders
    }else{
      return []
    }
  },
  "get.paidOrders"(userId){
    let orders =  Orders.find({'userId':userId,'status':'paid'}).fetch();
    console.log(orders)
    if(orders.length > 0){
      return orders
    }else{
      return []
    }
  },
  "get.unpaidOrders"(userId){
    let orders =  Orders.find({'userId':userId,'status':'unpaid'}).fetch();
    if(orders.length > 0){
      return orders
    }else{
      return []
    }
  },
  "get.cancelOrders"(userId){
    let orders =  Orders.find({'userId':userId,'status':'canceled'}).fetch();
    if(orders.length > 0){
      return orders
    }else{
      return []
    }
  },
  'app.cancel.order'(code,token){
    if(validLoginToken(token)){
      let order = Orders.findOne({orderCode:code})
      Orders.update(order,{
        $set:{
          status: "canceled"
        }
      })
    }
  }
});

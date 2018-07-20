import { Meteor } from 'meteor/meteor';
import {ShopOrders} from './shop_orders';
import {Shops} from '../shops/shops.js'
Meteor.methods({
  'get.shoporder'(id){
    let aaa= ShopOrders.findOne({orderId:id});
    console.log('aaa'+aaa);
    if (typeof(aaa)!='undefined') {
      let products =aaa.products;
      for(var i = 0; i<products.length;i++){
        if (products[i].isAppointment==true) {
          return true
        }
        else {
          return false
        }
      }
    }else {
      let bbb =ShopOrders.findOne({_id:id});
      console.log('bbb'+bbb);
      let products =bbb.products;
      for(var i = 0; i<products.length;i++){
        if (products[i].isAppointment==true) {
          return true
        }
        else {
          return false
        }
      }
    }
  },
  'get.byShopId'(shopId,page,pageSize){
    let shop = Shops.findOne({ _id: shopId})
    if (shop.name ==='万人车汇自营店'){
      return ShopOrders.find({ shopId: shopId, appName: { $exists: false } },{skip: (page - 1) * pageSize, limit: pageSize,
      sort: { "createdAt": -1 },}).fetch();
    }else{
      return ShopOrders.find({ shopId: shopId},{skip: (page - 1) * pageSize, limit: pageSize,
      sort: { "createdAt": -1 },}).fetch();
    }
  },
  'get.orders.count'(shopId){
    return ShopOrders.find({shopId:shopId}).count()
  },
  "shopOrders.updateStatus"(_id,status){
    return ShopOrders.update(_id,{
      $set:{
        status:status
      }
    })

  },
  'shopOrder.findOne'(id){
    return ShopOrders.findOne({_id:id})
  },
  'shopOrder.getById'(id){
    let aaa= ShopOrders.findOne({orderId:id});
    console.log('aaa'+aaa);
    if (typeof(aaa)!='undefined') {
      return aaa
    }else {
      let bbb =ShopOrders.findOne({_id:id});
      console.log('bbb'+bbb);
      return bbb
    }
  }

})

import { Meteor } from 'meteor/meteor';
import {ShopOrders} from './shop_orders';
import {Shops} from '../shops/shops.js'
import { OrderStatus } from '../order_status/order_status'
import {OrderStatusAccesses} from '../order_status_accesses/order_status_accesses'
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
  'get.orders.byShopId'(shopId,page,pageSize){
    let shop = Shops.findOne({ _id: shopId})
    if (shop.name ==='万人车汇自营店'){
      let result =  ShopOrders.find({ shopId: shopId, appName: { $exists: false } },{skip: (page - 1) * pageSize, limit: pageSize,
      sort: { "createdAt": -1 },}).fetch();
      result.forEach((item)=>{
        
      })
      return result
    }else{
      let result =  ShopOrders.find({ shopId: shopId},{skip: (page - 1) * pageSize, limit: pageSize,
      sort: { "createdAt": -1 },}).fetch();
      result.forEach((item)=>{
        //-----格式化金额------//
        item.totalAmount = item.totalAmount/100

        //-----格式化订单状态------//
        let status = OrderStatus.findOne({name:item.status})
        if(status){
          item.status_zh = status.name_zh
        }else{
          item.status_zh = '未注册状态'
        }
        //-----查询下单账号------//
        let user = Meteor.users.findOne({_id:item.userId})
        if(user){
          item.username = user.username
        }else{
          item.username = '未知用户'
        }

         //--------查询可到达的所有状态--------//

        let accessStatus = OrderStatusAccesses.find({sFrom:item.status,accessable:true}).fetch()
        let arr = []
        if(accessStatus.length>0){
          accessStatus.forEach((obj)=>{
            console.log(obj.sTo)
            let status = OrderStatus.findOne({name:obj.sTo})
            if(status){
              arr.push({'name':obj.sTo,'name_zh':status.name_zh})
            }
          })
        }
        item.allStatus = arr
      })
     
      return result
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

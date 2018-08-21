import { Meteor } from 'meteor/meteor';
import {ShopOrders} from './shop_orders';
import {Shops} from '../shops/shops.js'
import { OrderStatus } from '../order_status/order_status'
import {OrderStatusAccesses} from '../order_status_accesses/order_status_accesses'
import {Orders} from '../orders/orders'
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
    let appName = shop.appName
    if (appName ==='wanrenchehui'){
      let result =  ShopOrders.find({ shopId: shopId, appName: { $exists: false } },{skip: (page - 1) * pageSize, limit: pageSize,
      sort: { "createdAt": -1 },}).fetch();
      return result
    }else if(appName){
      let result =  ShopOrders.find({ appName: appName},{skip: (page - 1) * pageSize, limit: pageSize,
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
            let status = OrderStatus.findOne({name:obj.sTo})
            if(status){
              arr.push({'name':obj.sTo,'name_zh':status.name_zh})
            }
          })
        }
        item.allStatus = arr
      })
     
      return result
    }else{
      return []
    }
  },
  'get.orders.count'(shopId){
    return ShopOrders.find({shopId:shopId}).count()
  },
  "shopOrders.updateStatus"(_id,orderId,status){
    //同步更改orders和ShopOrders的状态

     ShopOrders.update(_id,{
      $set:{
        status:status
      }
    },function(err,alt){
      if(!err){
        Orders.update(orderId, {
          $set: {
            status: status
          }
        },function(err,rlt){
          if(!err){
          console.log('更新订单状态成功')
          }else{
            throw new Meteor.Error("更新订单状态Orders失败")
          }
        })
      }else{
        throw new Meteor.Error("更新订单状态ShopOrders失败")
      }
    })
  },
  'shopOrder.updateTrackingnumber'(_id,number){
    ShopOrders.update(_id,{
      $set:{
      tracking_number:number
    }
    },function(err,alt){
      if(!err){
        console.log('更新快递单号成功')
      }else{
        throw new Meteor.Error("更新快递单号失败")

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

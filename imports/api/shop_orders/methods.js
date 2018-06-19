import { Meteor } from 'meteor/meteor';
import {ShopOrders} from './shop_orders';

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
  'get.byShopId'(shopId){
    return ShopOrders.find({shopId:shopId}).fetch();
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

import { Meteor } from 'meteor/meteor';
import {ShopOrders} from './shop_orders';

Meteor.methods({
  'get.shoporder'(id){
    let products = ShopOrders.findOne({_id:id}).products;
    for(var i = 0; i<products.length;i++){
      if (products[i].isAppointment==true) {
        return true
      }
      else {
        return false
      }
    }
  },
  'get.byShopId'(shopId){
    return ShopOrders.find({shopId:shopId}).fetch();
  },
  'shopOrder.getById'(id){
    return ShopOrders.findOne({_id:id});
  }

})

import { Meteor } from 'meteor/meteor';
import { ShopCarts } from './shop_cart.js';


Meteor.methods({
  'shop_carts.add_cart'(params,userId){

    ShopCarts.update(
     { userId },
      { $set:
        {"shopsData": params}
      }
    )
    let shop_cart = ShopCarts.findOne({userId})
    return {
        ...shop_cart,
        formMethod: 'shop_carts.add_cart'
    }
  },
  'shop_carts.get_cart'(userId) {
    let shop_cart = ShopCarts.findOne({userId: userId});
    shop_cart = shop_cart === undefined ?  { shopsData: [],userId: ''} : shop_cart
    return {
        ...shop_cart,
        formMethod: 'shop_carts.get_cart'
    }
    
  },
  'shop_carts.insert_cart'(params) {
    let shop_cart = ShopCarts.insert(
      params,
      )
    return ShopCarts.findOne({_id: shop_cart})
  },
  

})
import { Meteor } from 'meteor/meteor';
import { ShopCarts } from './shop_cart.js';


Meteor.methods({
  'shop_carts.add_cart'(params){
    console.log(params);
    let shop_cart = ShopCarts.update(
      {'user_id': 2},
      { $set:
        {"shopsData": params}
      }
    )

    return ShopCarts.findOne({id: shop_cart._id})
    // console.log(`add_cart`)
    // console.log(shop_cart)
    // console.log(params)
    // let product = ShopCarts.findOne({'product_id': params.id, 'user_id': params.id,'spec': params.selected})
    // let count = product !== undefined ? parseInt(params.count)+parseInt(product.count) : params.count
    // if(product!==undefined){
    //   var shop_carts = ShopCarts.update(
    //   { 'count': product.count },
    //   { $set: { 'count': count}}
    //   )
    // }else{
    //      // var shop_carts = ShopCarts.insert({
    //      //  'user_id': params.id,
    //      //  'shop_id': params.shop_id,
    //      //  'price': params.selected.price, 
    //      //  'count': count,
    //      //  'product_id': params.id,
    //      //  'spec': params.selected,
    //      //  'status': 1,
    //      //  'name': params.name,
    //      //   createdAt : new Date(),
       
         // var shop_carts = db.shop_carts.insert({
         //    user_id: 2,
         //    shopsData: [{
         //      shop_name: '卡哇伊2',
         //      checked: false,
         //      shop_id: 2,
         //        productsData: [
         //          {
         //            shop_id: 2,
         //            checked: false, 
         //            name: "测试1",
         //            status: 1,
         //            count: 10,
         //            cover: '图片地址',
         //            prodductSpec: {name: '蓝色'},
         //            product_id: 5
         //          },
         //          {
         //            shop_id: 2,
         //            checked: false, 
         //            name: "测试2",
         //            status: 1,
         //            count: 9,
         //            cover: '图片地址',
         //            prodductSpec: {name: '蓝色'},
         //            product_id: 6
         //          },
         //        ]
         //    }],
         //    shopMap: {
         //      2: {
         //        shop_name: '卡哇伊2',
         //        checked: false,
         //        shop_id: 2,
         //        productsMap: {
         //          5: {
         //            shop_id: 2,
         //            checked: false, 
         //            name: "测试1",
         //            status: 1,
         //            count: 10,
         //            cover: '图片地址',
         //            prodductSpec: {name: '蓝色'},
         //            product_id: 5
         //          },
         //          6: {
         //            shop_id: 2,
         //            checked: false, 
         //            name: "测试2",
         //            status: 1,
         //            count: 9,
         //            cover: '图片地址',
         //            prodductSpec: {name: '蓝色'},
         //            product_id: 6
         //          },
         //      }
         //    }]
         // })
    // } 


    // db.shop_carts.aggregate([
    //         {$match: {"shopsData.productsData.product_id": 6}},
    //         {$unwind: "$shopsData"},
    //         {$unwind: "$shopsData.productsData"},
    //         {$match: {"shopsData.productsData.product_id": 6}},
    // ]);
    // return shop_carts
  },
  'shop_carts.get_cart'(id) {
    console.log(id)
    return ShopCarts.findOne({user_id: id});
  },
  'shop_carts.insert_cart'(params) {
    console.log(`insertcart`)
    console.log(params);
    let shop_cart = ShopCarts.insert(
      params,
      )
    return ShopCarts.findOne({_id: shop_cart})
  },

})
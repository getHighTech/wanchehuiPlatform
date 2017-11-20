import { Meteor } from 'meteor/meteor';
import { Shops } from './shops.js'

Meteor.methods({
    'shops.insert'(params){
      console.log(params)
        return Shops.insert({
            shopName: params.shopName,
            shopPhone: params.shopPhone,
            shopAddress: params.shopAddress,
            shopStartTime:params.shopStartTime,
            shopCloseTime:params.shopCloseTime,
            shopDescrption:params.shopDescrption,
            shopTag:params.shopTag,
            shopState: true, //true为营业，fasle为关闭
            createdAt : new Date(),
          });
    },
    'get.shops.limit'(condition={},page=1, pageSize=20){
        let shops =  Shops.find(condition, {
            skip: (page-1)*pageSize, limit: pageSize,
            sort: {"createdAt": -1},
            fields:
              {
                'shopName': 1,
                'shopAddress': 1,
                'shopPhone': 1,
                'shopState':1 ,
                'createdAt': 1,
              }
            }
          );
          return shops.fetch();
        },
    'shops.findShopById'(shopId){
      let shop = Shops.findOne({_id:shopId})
      if (!shop) {
        return "SHOP NOT FOUND";
      }
      return shop;
    },
    'shops.changeShopState'(shopId){
      let shop = Shops.findOne({_id:shopId})
       Shops.update(shopId, {
        $set: {
          shopState: !shop.shopState,
        }
      });
      return shop
    },
    'shops.update'(shop, params){
      Shops.update(shop, {
        $set: {
          shopName: params.shopName,
          shopAddress: params.shopAddress,
          shopPhone: params.shopPhone,
        }
      });
    },
})

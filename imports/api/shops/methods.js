import { Meteor } from 'meteor/meteor';
import { Shops } from './shops.js'

Meteor.methods({
    'shops.insert'(params){
        return Shops.insert({
            shopName: params.shopName,
            shopPhone: params.shopPhone,
            shopAddress: params.shopAddress,
            state:1,
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
                'state': 1,
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
    }
})
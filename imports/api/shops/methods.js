import { Meteor } from 'meteor/meteor';
import { Shops } from './shops.js'

Meteor.methods({
    'shops.insert'(params){
        return Shops.insert({
            shopName: params.shopName,
            shopPhone: params.shopPhone,
          });
    }
})
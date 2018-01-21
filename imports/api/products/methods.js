import { Meteor } from 'meteor/meteor';

import { Products } from './products.js';
import {getProductTypeById} from './actions.js';


Meteor.methods({
  "products.insert"(product,shopId){
    Products.insert({
      name: product.name,
      name_zh:product.name_zh,
      price: product.price,
      description: product.description,
      brief:product.brief,
      cover:product.cover,
      createdByUserId: product.createdByUserId,
      endPrice:product.endPrice,
      curency:product.curency,
      isTool:product.isTool,
      roleName:product.roleName,
      categoryld:product.categoryld,
      images: product.images,
      onLine: false,
      shopId:shopId,
    });
  },
  'product.online'(id){
    Products.update(id, {
      $set: {
        onLine: true,
      }
    });
  },
  'product.offline'(id){
    Products.update(id, {
      $set: {
        onLine: false,
      }
    });
  },
  'product.descount'(id, discount){
    Products.update(id, {
      $set: {
        onLine: discount,
      }
    });
  },
  'product.edit'(product){
    Products.update({
      $set: {
        name: product.name,
        price: product.price,
        discount: product.discount,
        descirption: product.descirption,
        image_des: product.image_des,
        images: product.images,
        onLine: product.onLine,
      }
    });
  },
  'get.product.id'(productId){
    return getProductTypeById(productId);
  },
  'get.product.byShopId'(id){
    return Products.find({shopId:id}).fetch();
  },
  'get.oneproduct.id'(id){
    return Products.findOne({_id:id});
  },
  'product.update'(old,product){
    Products.update(old,{
      $set:{
        name: product.name,
        name_zh:product.name_zh,
        price: product.price,
        description: product.description,
        brief:product.brief,
        image_des: product.image_des,
        images: product.images,
        onLine: product.onLine,
      }
    })
  }
});

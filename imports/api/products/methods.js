import { Meteor } from 'meteor/meteor';

import { Products } from './products.js';
import {getProductById} from './actions.js';


Meteor.methods({
  "products.insert"(product){
    Products.insert({
      name: product.name,
      price: product.price,
      discount: product.discount,
      descirption: product.descirption,
      image_des: product.image_des,
      images: product.images,
      onLine: false
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
    return getProductById(productId);
  }
});

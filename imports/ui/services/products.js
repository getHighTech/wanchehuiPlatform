import { Meteor } from 'meteor/meteor';

export function getMeteorProductById(productId, callback){
  return Meteor.call("get.product.id", productId, function(error, result){
      callback(error, result);
  })
}

export function getProductById(productId, callback){
  if (Meteor) {
    return getMeteorProductById(productId, callback);
  }
}

import { Meteor } from 'meteor/meteor';

import {Products} from './products.js';
import {Cards} from '../cards/cards.js';


export function getProductTypeById(productId){
  let card =  Cards.findOne({_id: productId});
  if (card) {
    return {type: "card", card}
  }
  let product = Products.findOne({_id: productId});
  if (product) {
    return {type: "none_card", product}
  }

  return "NOT FOUND";

}

export function getProductByZhName(zhName){
  return Products.findOne({name_zh: zhName});
}

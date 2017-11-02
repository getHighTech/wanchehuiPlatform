import { Meteor } from 'meteor/meteor';

import {Products} from './products.js';
import {Cards} from '../cards/cards.js';


export function getProductById(productId){
  let card =  Cards.findOne({_id: productId});
  if (card) {
    return {type: "card", card}
  }
  let Product = Products.findOne({_id: productId});
  if (Product) {
    return Product
  }

  return "NOT FOUND";

}

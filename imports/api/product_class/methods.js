import { Meteor } from 'meteor/meteor';

import { ProductClass } from './product_class.js';



Meteor.methods({
  'get.productclass'(){
    let aaa =ProductClass.find().fetch();
    console.log(aaa);
    let bbb=[]
    if (typeof(aaa)!='undefined') {
      for (var i = 0; i < aaa.length; i++) {
        bbb.push(aaa[i].ProductClass)
      }
    }
    return bbb;
  },
  'productclass.insert'(productclass){
    ProductClass.insert({
      ProductClass:productclass
    })
  }


})

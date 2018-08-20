import { Meteor } from 'meteor/meteor';

import { ProductClass } from './product_class.js';



Meteor.methods({
  'get.all_product_classes'(){
    let data =  ProductClass.find().fetch()
    return data
  },
  'product_class.insert'(params){
    let data = ProductClass.findOne({name:params.name})
    if(data){
      throw new Meteor.Error("添加失败，分类已经存在");
    }else{
      ProductClass.insert({
        name: params.name,
        name_zh:params.name_zh,
        decription:params.decription,
        createdAt:new Date(),
        deletable:true,
      })
    }
  },
  'product_class.remove'(id){
    return ProductClass.remove(id);
  }


})

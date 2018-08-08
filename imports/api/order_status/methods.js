import { Meteor } from 'meteor/meteor';
import {OrderStatus} from './order_status';

Meteor.methods({
  'order_status.insert'(obj){
    let status = OrderStatus.findOne({$or:[{name:obj.name},{name_zh:obj.name_zh}]})
    if(status){
      throw new Meteor.Error("状态已经存在，请勿重复添加");
    }else{
      return OrderStatus.insert({
        name:obj.name,
        name_zh:obj.name_zh,
        createdAt : new Date(),
      })
    }
  },
  'get.all_status'(){
    return OrderStatus.find({}).fetch()
  },
})
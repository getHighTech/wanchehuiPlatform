import { Meteor } from 'meteor/meteor';
import {OrderStatusAccesses} from './order_status_accesses';

import {OrderStatus} from '../order_status/order_status';



Meteor.methods({
  'order_status_accesses.insert'(obj){
    console.log(obj)
    let status_access = OrderStatusAccesses.findOne({
      sFrom:obj.sFrom,
      sTo:obj.sTo
    })
    if(status_access){
      throw new Meteor.Error('该对应关系已经存在，请勿重复添加')
    }else if(obj.sFrom == obj.sTo){
      throw new Meteor.Error('起点状态和终点状态不能相同')
    }else{
      return OrderStatusAccesses.insert({
        sFrom:obj.sFrom,
        sTo:obj.sTo,
        accessable:true,
        createdAt:new Date()
      })
    }
  },
  'delete.order_status_access'(id){
    if(OrderStatusAccesses.remove({_id:id})){
      return
    }else{
      throw new Meteor.Error('删除失败')
    }
  },
  'get.OrderState.byStatus'(status){
    return OrderStatusAccesses.find({'sFrom':status,'accessable':true}).fetch();
  },
  'get.all.OrderStatusAccesses'(){
    let obj =  OrderStatusAccesses.find().fetch();
    obj.forEach((item) => {
      if(OrderStatus.findOne({name:item.sFrom})){
        item.sFrom = OrderStatus.findOne({name:item.sFrom}).name_zh
      }
      if(OrderStatus.findOne({name:item.sTo})){
        item.sTo = OrderStatus.findOne({name:item.sTo}).name_zh
      }
    })
    return obj
  },
  // 'get.all.status'(){
  //   let OrderStatusAccesses.find().fetch
  // }
  'get.OrderState.byCondition'(condition){
    let obj =  OrderStatusAccesses.find(condition).fetch()
    obj.forEach((item) => {
      if(OrderStatus.findOne({name:item.sFrom})){
        item.sFrom = OrderStatus.findOne({name:item.sFrom}).name_zh
      }
      if(OrderStatus.findOne({name:item.sTo})){
        item.sTo = OrderStatus.findOne({name:item.sTo}).name_zh
      }
    })
    return obj
  },
  'get.OrderState.byId'(id){
    return OrderStatusAccesses.findOne({_id:id})
  },
  'OrderStatus.AccessableUpdate'(_id){
    let access = OrderStatusAccesses.findOne({_id:_id});
    console.log(access.accessable);
    OrderStatusAccesses.update(_id,{
      $set:{
        'accessable':!access.accessable
      }
    })

    return access
  },
  'OrderStatus.update'(old,newObj){
    OrderStatusAccesses.update({_id:old._id},{
      $set:{
        sFrom:newObj.current,
        sTo:newObj.next
      }
    })
  },
  'OrderStatus.insert'(newObj){
    console.log(newObj);
    OrderStatusAccesses.insert({
      sFrom:newObj.current,
      sTo:newObj.next,
      accessable:true,
    })
  },
  'find.SameStatus'(newobj){
    console.log('------------------------------------');
    console.log(newobj);
    let result =OrderStatusAccesses.find({
      sFrom:newobj.current,
      sTo:newobj.next
    }).fetch();
    console.log(result);
    return result.length
  }

  })

import { Meteor } from 'meteor/meteor';
import {OrderStatusAccesses} from './order_status_accesses';




Meteor.methods({
  'order_status_accesses.insert'(){

  },
  'get.OrderState.byStatus'(status){
    return OrderStatusAccesses.find({'sFrom':status}).fetch();
  },
  'get.all.OrderStatusAccesses'(){
    return OrderStatusAccesses.find().fetch();
  },
  // 'get.all.status'(){
  //   let OrderStatusAccesses.find().fetch
  // }
  'get.OrderState.byId'(id){
    return OrderStatusAccesses.findOne({_id:id})
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
      accessable:true
    })
  }

  })

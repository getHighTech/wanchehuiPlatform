import { Meteor } from 'meteor/meteor';
import {OrderStatusAccesses} from './order_status_accesses';




Meteor.methods({
  'order_status_accesses.insert'(){

  },
  'get.OrderState.byStatus'(status){
    return OrderStatusAccesses.find({'sFrom':status,'accessable':true}).fetch();
  },
  'get.all.OrderStatusAccesses'(){
    return OrderStatusAccesses.find().fetch();
  },
  // 'get.all.status'(){
  //   let OrderStatusAccesses.find().fetch
  // }
  'get.OrderState.byCondition'(condition){
    return OrderStatusAccesses.find(condition).fetch()
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
      productClass:newObj.productClass
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

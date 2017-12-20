import { Meteor } from 'meteor/meteor';

export function getMeteorOrdersUnpaid(conditionUnpaid,page,pageSize,callback){
  Meteor.call("orders.ordersdataUnpaid",conditionUnpaid,page,pageSize,function(err,rlt){
    callback(err,rlt);
    console.log(rlt);
  })
}

export function getMeteorOrdersPaid(conditionPaid,page,pageSize,callback){
  Meteor.call("orders.ordersdataPaid",conditionPaid,page,pageSize,function(err,rlt){
    callback(err,rlt);
    console.log(rlt);
  })
}

export function countOrders(condition,callback){
  return Meteor.call('orders.count',condition,function(err,rlt){
    callback(err,rlt)
    console.log(rlt);
  })

}

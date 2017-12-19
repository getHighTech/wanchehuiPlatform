import { Meteor } from 'meteor/meteor';

export function getMeteorOrders(condition,page,pageSize,callback){
  Meteor.call("orders.ordersdata",condition,page,pageSize,function(err,rlt){
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

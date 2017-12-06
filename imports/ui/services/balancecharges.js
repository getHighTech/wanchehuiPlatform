import { Meteor } from 'meteor/meteor';


export function getMeteorBalanceCharge(condition,page,pageSize,callback){
  Meteor.call("balance.chargesdata",condition,page,pageSize,function(err,rlt){
    callback(err,rlt);
  });
}

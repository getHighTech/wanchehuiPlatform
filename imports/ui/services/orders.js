import { Meteor } from 'meteor/meteor';



export function getMeteorOrders(condition,page,pageSize,callback){
  Meteor.call("orders.orderdata",condition,page,pageSize,function(err,rlt){
    for(let index in rlt){
      rlt[index].money = rlt[index].money/100;
      let _id=rlt[index].userId;
      Meteor.call("bankcards.accountNumber",_id,function(error,result){
        if(!error){
          rlt[index].bankId = result
          console.log("更改后的银行卡号:" + rlt[index].bankId );
          // return rlt[index].bankId
        }
      })
      // rlt[index].realName =Bankcards.findOne({userId:_id}).realName;
    }
    console.log(rlt);
    callback(err,rlt);
  });
}


export function countBalanceCharge(callback){
  return Meteor.call('balancecharge.count',function(err,rlt){
    callback(err,rlt)
  })
}

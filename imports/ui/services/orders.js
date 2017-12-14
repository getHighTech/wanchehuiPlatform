import { Meteor } from 'meteor/meteor';



export function getMeteorOrders(condition,page,pageSize,callback){
  Meteor.call("orders.orderdata",condition,page,pageSize,function(err,rlt){
    // var bankIds = [];
    // var result = [];
    // for(var charge  of rlt){
    //   charge.money = charge.money/100.0;
    //   result.push(charge);
    //   let userId = charge.userId;
    //   bankIds.push(userId);
    // }
    //
    //
    // for(let index in rlt){
    //   rlt[index].money = rlt[index].money/100;
    //   let _id=rlt[index].userId;
    //   Meteor.call("bankcards.accountNumber",_id,function(error,result){
    //     if(!error){
    //       rlt[index].bankId = result
    //       console.log("更改后的银行卡号:" + rlt[index].bankId );
    //       // return rlt[index].bankId
    //     }
    //   })
    //   // rlt[index].realName =Bankcards.findOne({userId:_id}).realName;
    // }
    // console.log(rlt);
    callback(err,rlt);
    console.log(rlt);
  });

}


export function countOrders(callback){
  return Meteor.call('orders.count',function(err,rlt){
    callback(err,rlt)
  })
}

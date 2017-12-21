import { Meteor } from 'meteor/meteor';



export function getMeteorBalanceCharge(condition,page,pageSize,callback){
  Meteor.call("balance.chargesdata",condition,page,pageSize,function(err,rlt){
    var bankIds = [];
    var result = [];
    for(var charge  of rlt){
      charge.money = charge.money/100.0;
      let address='address';
      charge[address]='1';
      let name='name';
      charge[name]='1';
      result.push(charge);
      let userId = charge.userId;
      bankIds.push(userId);
      console.log(bankIds);
    }






    // Meteor.call('orders.accouts',bankIds,function(err,alt){
    //   Hash = {}
    //   console.log('111');
    //   for(let accout of alt) {
    //     Hash[accout.userId] = accout;
    //   }
    //   for(var charge of result) {
    //     charge.name = Hash[charge.userId].name;
    //     console.log(result);
    // }
    // })
    // Meteor.call("orders.accouts", bankIds, function(error, accouts) {
    //   console.log(accouts);
    //   if (!error) {
    //     accoutHash = {}
    //     for(let accout of accouts) {
    //       accoutHash[accout.createdBy] = accout;
    //       console.log(accout);
    //     }
    //     console.log(accoutHash)
    //     for(var charge of result) {
    //       console.log(result);
    //       charge.name = accoutHash[charge.createdBy].name;
    //   }
    //
    //
    //   }
    // });












    Meteor.call("bankcards.accouts", bankIds, function(error, accouts) {
      console.log(accouts);
      if (!error) {
        accoutHash = {}
        for(let accout of accouts) {
          accoutHash[accout.userId] = accout;
        }
        console.log(accoutHash)
        for(var charge of result) {
          console.log(charge.userId);
          charge.bankId = accoutHash[charge.userId].accountNumber;
          charge.address= accoutHash[charge.userId].bankAddress;
          charge.userId =  accoutHash[charge.userId].realName;
      }

        callback(err, result);
        console.log(result);
      }
    });

  });
}



export function countBalanceCharge(condition,callback){
  console.log(condition);
  return Meteor.call('balancecharge.count',condition,function(err,rlt){
    console.log(rlt);
    callback(err,rlt)
  })
}

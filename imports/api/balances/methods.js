import { Meteor } from 'meteor/meteor';
import { findBalanceByUserId,　findBalanceByUsername } from './balances_actions.js'
import {findBalanceChargeData} from './balance_charge_actions.js'
import {BalanceCharges} from './balance_charges';


Meteor.methods({
  "balances.userId"(userId){
    return findBalanceByUserId(userId);
  },
  "balance.username"(username){
    return findBalanceByUsername(username);
  },
  "balance.chargesdata"(condition={},page=1, pageSize=20){
    let chargesdata = BalanceCharges.find(condition,{
      ship:(page-1)*pageSize,limit:pageSize,
      sort:{"createdAt":-1},
      fields:
      {
        'text':1,
        "money":1,
        'bankId':1,
        'userId':1,
        'status':1,
      }
    })
    console.log(chargesdata.fetch());

    return chargesdata.fetch();
  }



});

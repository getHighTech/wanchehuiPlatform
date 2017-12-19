import { Meteor } from 'meteor/meteor';

import {findBalanceChargeData} from './balance_charge_actions.js'
import {BalanceCharges} from './balance_charges';
import {Balances} from './balances';
import {allBalanceChargeCount} from './actions.js';
import { Bankcards } from "/imports/api/bankcards/bankcards.js";

import { findBalanceByUserId, findBalanceByUserIdAll, findBalanceByUsername } from './balances_actions.js'
import { getIncomeRecords } from './balance_incomes_actions.js'
import { log } from 'util';

Meteor.methods({
  "balances.userId"(userId){
    return findBalanceByUserId(userId);
  },
  "balances.userId.all"(userId){
    return findBalanceByUserIdAll(userId);
  },
  "balance.username"(username){
    return findBalanceByUsername(username);
  },

  "balance.chargesdata"(condition,page=1, pageSize=20){

    let chargesdata =  BalanceCharges.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
        'text':1,
        "money":1,
        'bankId':1,
        'userId':1,
        'status':"unpaid",
        'createdAt': 1,
      }

    })
    return chargesdata.fetch();
  },
  "balance.chargesOne"(_id){
    return BalanceCharges.findOne(_id);
  },
  'balance.userId'(userId){
    console.log(Balances.findOne({userId:userId}));
    return Balances.findOne({userId:userId});
  },
  'balances.updaterevoke.amount'(userId,money,amounted){
    let balance = Balances.findOne({userId: userId})
    console.log(money);
    console.log(amounted);
    console.log(balance.amount);
    let amount=money/100+amounted
    console.log(amount);
    return Balances.update(balance._id, {
      $set: {
        amount: amount
      }
    });
  },
  "balancecharge.count"(condition){
    return allBalanceChargeCount(condition);
    //return BalanceCharges.find(condition).count();
  },
  'bankcards.accountNumber'(_id){
    return Bankcards.findOne({userId:_id}).accountNumber;
  },
  'bankcards.accouts'(ids) {
    return Bankcards.find({userId: {$in: ids}}).fetch();
  },
  "get.limit.balance_incomes"(page, pagesize, balanceId, userId){
    return getIncomeRecords(page, pagesize, balanceId, userId);
  },
  "balancecharge.status.updatePaid"(_id){
    return BalanceCharges.update(_id,{
      $set:{
        status:"paid"
      }
    })

  },
  "balancecharge.status.updateRevoke"(_id){
    return BalanceCharges.update(_id,{
      $set:{
        status:"revoke"
      }
    })

  },
  // "get.balance_charges.InThisTime"(startTime,endTime,condition){
  //   console.log(condition);
  //   return BalanceCharges.find({createdAt: {'$gt':new Date(startTime),'$lte':new Date(endTime)},status:condition}).fetch();
  // },
  "get.balance_charges.InThisTime"(condition){
    console.log(condition);
    return BalanceCharges.find(condition,{sort: {"createdAt": -1}}).fetch();
  },
  "get.balance_charges.InThisTimeCount"(condition){
    return BalanceCharges.find(condition).count();
  }


});

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
        'status':1,
        'createdAt': 1,
      }

    })
    return chargesdata.fetch();
  },
  "balance.chargesOne"(_id){
    return BalanceCharges.findOne(_id);
  },
  'balance.userId'(userId){
    return Balances.findOne({userId:userId});
  },
  'balances.updaterevoke.amount'(userId,money,amounted){
    let balance = Balances.findOne({userId: userId})
    let amount=money/100+amounted
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
    return Bankcards.find({_id: {$in: ids}}).fetch();
  },
  'bankcards.address'(ids) {
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
  "get.balance_charges.InThisTime"(condition,page=1, pageSize=20){
    return BalanceCharges.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
        'text':1,
        "money":1,
        'bankId':1,
        'userId':1,
        'status':1,
        'address':1,
        'createdAt': 1,
      }

    },{sort: {"createdAt": -1}}).fetch();
  },
  "get.balance_charges.InThisTimeCount"(condition){
    return BalanceCharges.find(condition).count();
  }


});

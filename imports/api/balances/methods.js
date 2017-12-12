import { Meteor } from 'meteor/meteor';

import {findBalanceChargeData} from './balance_charge_actions.js'
import {BalanceCharges} from './balance_charges';
import {allBalanceChargeCount} from './actions.js';
import { Bankcards } from "/imports/api/bankcards/bankcards.js";
import { findBalanceByUserId, findBalanceByUserIdAll, findBalanceByUsername } from './balances_actions.js'
import { getIncomeRecords } from './balance_incomes_actions.js'

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

  "balance.chargesdataUnpaid"(condition={},page=1, pageSize=20){
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
  "balance.chargesdataPaid"(condition={},page=1, pageSize=20){
    console.log(page,pageSize);
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
    console.log(chargesdata.fetch());
    return chargesdata.fetch();
  },
  "balance.chargesdataRevoke"(condition={},page=1, pageSize=20){
    console.log(page,pageSize);
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

    },{status:"revoke"});
    return chargesdata.fetch();
  },

  "balancecharge.count"(){
    return allBalanceChargeCount();
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

});

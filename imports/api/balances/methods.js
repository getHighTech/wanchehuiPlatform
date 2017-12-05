import { Meteor } from 'meteor/meteor';

import { findBalanceByUserId,　findBalanceByUsername, getIncomeRecords } from './balances_actions.js'

Meteor.methods({
  "balances.userId"(userId){
    return findBalanceByUserId(userId);
  },
  "balance.username"(username){
    return findBalanceByUsername(username);
  },
  "get.limit.balance_incomes"(page, pagesize, condition, balanceId, userId){
    return getIncomeRecords(page, pagesize, condition, balanceId, userId);
  }

});

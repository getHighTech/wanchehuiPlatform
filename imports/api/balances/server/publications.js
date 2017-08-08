// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Balances } from '../balances.js';
import { BalanceIncomes } from '../balance_incomes.js';
import { BalanceCharges } from '../balance_charges.js';


Meteor.publish('get.current.balance', function(){
  return Balances.find({userId: this.userId});
})

Meteor.publish('get.balance.balance_incomes', function(balanceId, page=0, pagesize=68){
  return BalanceIncomes.find({balanceId},
    {skip: page, limit: page*pagesize, sort:{createdAt: -1}});
})

Meteor.publish('get.balance.balance_charges', function(balanceId, page=0, pagesize=68){
  return BalanceCharges.find({balanceId},
    {skip: page, limit: page*pagesize, sort:{createdAt: -1}});
})

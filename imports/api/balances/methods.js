import { Meteor } from 'meteor/meteor';

import { findBalanceByUserId,　findBalanceByUsername } from './balances_actions.js'

Meteor.methods({
  "balances.userId"(userId){
    return findBalanceByUserId(userId);
  },
  "balance.username"(username){
    return findBalanceByUsername(username);
  }

});

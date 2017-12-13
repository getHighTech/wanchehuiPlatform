import { Meteor } from 'meteor/meteor';

import {findBalanceChargeData} from './balance_charge_actions.js'
import {BalanceCharges} from './balance_charges';
import {allBalanceChargeCount} from './actions.js';
import { Bankcards } from "/imports/api/bankcards/bankcards.js";
<<<<<<< HEAD


// <<<<<<< HEAD
// import { findBalanceByUserId, findBalanceByUserIdAll, findBalanceByUsername } from './balances_actions.js'
// import { getIncomeRecords } from './balance_incomes_actions.js'
// =======
// >>>>>>> 5f9827fe944ce04e6cd02090f8aaebd1476fda9b
=======
import { findBalanceByUserId, findBalanceByUserIdAll, findBalanceByUsername } from './balances_actions.js'
import { getIncomeRecords } from './balance_incomes_actions.js'
import { log } from 'util';
>>>>>>> 433bd4413f775b7d335e5a05125e2f48602a5400

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
<<<<<<< HEAD
// <<<<<<< HEAD
//   "get.limit.balance_incomes"(page, pagesize, balanceId, userId){
//     return getIncomeRecords(page, pagesize, balanceId, userId);
//   },
// =======
  "balance.chargesdata"(condition={},page=1, pageSize=20){
    console.log(page,pageSize);
=======

  "balance.chargesdataUnpaid"(condition,page=1, pageSize=20){
>>>>>>> 433bd4413f775b7d335e5a05125e2f48602a5400
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
  "balance.chargesdataPaid"(condition,page=1, pageSize=20){
    let chargesdata =  BalanceCharges.find(condition,{
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

    }
  )
    return chargesdata.fetch();
  },
  "balance.chargesdataRevoke"(condition,page=1, pageSize=20){
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

    });
    return chargesdata.fetch();
  },

  "balancecharge.count"(condition){
    return allBalanceChargeCount(condition);
  },
  'bankcards.accountNumber'(_id){
    return Bankcards.findOne({userId:_id}).accountNumber;
<<<<<<< HEAD
  }
// >>>>>>> 5f9827fe944ce04e6cd02090f8aaebd1476fda9b
=======
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

  }
>>>>>>> 433bd4413f775b7d335e5a05125e2f48602a5400

});

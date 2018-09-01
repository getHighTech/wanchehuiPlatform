import {Balances} from './balances.js';

import {findUserByUsername, getUserByAgencyId } from '../users/actions.js';
import { getIncomeRecords, getIncomeRecordsAll } from './balance_incomes_actions.js'
import { getChargesRecords, getChargesRecordsAll } from './balance_charge_actions.js'
import { Bankcards } from '../bankcards/bankcards.js';
export function findBalanceById(id){

  return Balances.findOne({_id: id});

}

export function findBalanceByUserId(userId){
  let balance = Balances.findOne({userId});
  if (!balance) {
    return "BALANCE NOT FOUND";
  }
  //默认取前5条
  balance.incomes = getIncomeRecords(1, 5, balance._id, userId);
  for (var i = 0; i < balance.incomes.length; i++) {
    balance.incomes[i].agencyUser = getUserByAgencyId(balance.incomes[i].agency);
  }
  balance.charges = getChargesRecords(1, 5, userId);
  for (var i = 0; i < balance.charges.length; i++) {
    balance.charges[i].bank = Bankcards.findOne({_id: balance.charges[i].bankId});
  }
  return balance;
}

export function findBalanceByUserIdAll(userId){
  let balance = Balances.findOne({userId});
  if (!balance) {
    return "BALANCE NOT FOUND";
  }
  balance.totalIn = 0;
  balance.incomes = getIncomeRecordsAll(balance._id, userId);
  for (var i = 0; i < balance.incomes.length; i++) {
    balance.incomes[i].agencyUser = getUserByAgencyId(balance.incomes[i].agency);
    balance.totalIn += balance.incomes[i].amount;
  }
  balance.totalOut = 0
  balance.charges = getChargesRecordsAll(userId);
  for (var i = 0; i < balance.charges.length; i++) {
    balance.charges[i].bank = Bankcards.findOne({_id: balance.charges[i].bankId});
    balance.totalOut += balance.charges[i].money;
  }
  return balance;
}

export function findBalanceByUsername(username){
  let user = findUserByUsername(username);
  if (!user.username) {
    return "USER NOT FOUND IN FINDBALANCE";

  }
  return findBalanceByUserId(user._id);
}

export function createBlanceByUserId(userId){
  return Balances.insert({
    userId,
    amount: 0,
    createdAt: new Date()
  })
}

export function findOrCreateBalanceByUser(userId){
  let balance = findBalanceByUserId(userId);
  if (balance === undefined || balance === "BALANCE NOT FOUND") {
    let balanceId = createBlanceByUserId(userId);
    balance = findBalanceById(balanceId);
  }
  return balance;
}


export function addMountToBalance(balanceId, mount){
  let balance = findBalanceById(balanceId);
  if (!balance) {
    return "BALANCE NOT FOUND IN addMountToBalance";
  }
  let balance_amount = balance.amount;
  if (!balance.amount) {
    balance_amount = 0;
  }
  balance_amount = balance_amount + mount;
  return Balances.update(balanceId, {
    $set: {
      amount: balance_amount
    }
  })
}

export function loseMountFromBalance(balanceId, mount){

  let balance = findBalanceById(balanceId);
  if (!balance) {
    return "BALANCE NOT FOUND IN loseMountFromBalance";
  }
  let balance_amount = balance.amount;
  if (!balance.amount) {
    balance_amount = 0;
  }
  balance_amount = balance_amount - mount;
  return Balances.update(balanceId, {
    $set: {
      amount: balance_amount
    }
  })
}

export function changeMountOnBalance(balanceId, mount, positive){
  if (positive) {
    return addMountToBalance(balanceId, mount);
  }else{
    return loseMountFromBalance(balanceId, mount);
  }
}

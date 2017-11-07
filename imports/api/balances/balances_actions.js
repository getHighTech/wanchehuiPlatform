import {Balances} from './balances.js';

import {findUserByUsername} from '../users/actions.js';

export function findBalanceById(id){

  return Balances.findOne({_id: id});

}

export function findBalanceByUserId(userId){
  let balance = Balances.findOne({userId});
  if (!balance) {
    return "BALANCE NOT FOUND";
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
  console.log(balance)
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
  console.log(balance);
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

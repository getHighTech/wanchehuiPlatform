import {Balances} from './balances.js';

export function findBalanceByUserId(userId){
  return  Balances.findOne({userId});
}

export function findBalanceById(id){
  return Balances.findOne({_id: id});
}

export function addMountToBalance(balanceId, mount){
  let balance = findBalanceById(balanceId);
  let balance_amount = balance.amount;
  balance_amount = balance_amount + mount;
  return Balances.update(balanceId, {
    $set: {
      amount: balance_amount
    }
  })
}

export function loseMountFromBalance(balanceId, mount){
  let balance = findBalanceById(balanceId);
  let balance_amount = balance.amount;
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

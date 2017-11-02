import {Balances} from './balances.js';

export function findBalanceById(id){
  return Balances.findOne({_id: id});
}

export function findBalanceByUserId(userId){
  return  Balances.findOne({userId});
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
  if (balance === undefined) {
    let balanceId = createBlanceByUserId(userId);
    balance = findBalanceById(balanceId);
  }
  return balance;
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

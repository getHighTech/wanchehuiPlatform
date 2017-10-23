import {BalanceCharges} from './balance_charges';

export function addNewBalanceChargeWithDrawType(balanceId, userId, text, money, bankId, status){
  return BalanceCharges.insert({
    balanceId,
    userId,
    text,
    money,
    bankId,
    status,
    reasonType: "withdraws",
    createdAt: new Date()
  })
}

export function addNewBalanceChargeRefund(balanceId, userId, text, money, status){
  return BalanceCharges.insert({
    balanceId,
    userId,
    text,
    money,
    status,
    reasonType: "refund",
    createdAt: new Date()
  })
}

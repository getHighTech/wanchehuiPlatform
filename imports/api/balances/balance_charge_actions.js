import {BalanceCharges} from './balance_charges';

export function addNewBalanceCharge(userId, text, money, bankId, status, reasonType){
  return BalanceCharges.insert({
    userId,
    text,
    money,
    bankId,
    status,
    reasonType,
    createdAt: new Date()
  })
}

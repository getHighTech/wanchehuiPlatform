import {addMountToBalance, loseMountFromBalance, findOrCreateBalanceByUser} from './balances_actions.js'
import {noteIncome} from './balance_incomes_actions.js'
import {noteCharge} from './balance_charge_actions.js'

export function giveUserMoney(userId, amount, reason){
  console.log('userId', userId);
  let balance = findOrCreateBalanceByUser(userId);
  if (!balance) {
    return "BLANCE NOT FOUND IN giveUserMoney";
  }
  let text = ''
  if (reason.type === "agencyCard") {
    text = '分销收入'
  }
  noteIncome(reason, amount, text, balance._id);
  console.log(balance);
  return addMountToBalance(balance._id, amount);
}

export function loseUserMoney(userId, amount, reason){
  let balance = findOrCreateBalanceByUser(userId);

  if (!balance) {
    return "BLANCE NOT FOUND IN loseUserMoney";
  }
  let text = ''
  if (reason.type === "withdrawals") {
    text = '提现金额';
  }
  if (reason.type === "refund") {
    text = "用户已经退款";
  }

  noteCharge(reason, amount, text, balance._id);
  return loseMountFromBalance(balance._id, amount);
}

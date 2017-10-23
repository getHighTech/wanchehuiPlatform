import {findOrCreateBalanceByUser, addMountToBalance} from './balances_actions.js';
import {addNewBalanceIncomeFromAgency, addIncomeRecord} from './balance_incomes_actions.js';


export function addNewBalanceIncomeFromAgencyAndUpdateBalance(agencyId, balanceId, amount, text){
  let incomeId = addNewBalanceIncomeFromAgency(agencyId, balanceId, amount, text);
  if (incomeId == undefined) {
    //收入记账失败
    return {
      error: "INCOME_INSERT_FAILED"
    }

  }
  return addMountToBalance(balanceId, amount);
}

export function addMountToUser(userId, amount, text, reasonType){
    let balance  = findOrCreateBalanceByUser(userId);
    let incomeResult = addIncomeRecord(balance._id, amount, text, reasonType);
    if (!incomeResult) {
      return "BILL RECORD FAILED UNKNOWN"
    }
    return addMountToBalance(balance._id, amount);
}

//由于退款，减少用户的奖励
export function chargeBalanceWithRefund(userId, money, text){
  let balance = findBalanceByUserId(userId)
  let chargeRlt = addNewBalanceChargeRefund(balance._id, userId,
    text,
    money, "done");
  if (chargeRlt != 1) {
    return "INSERT NEW CHARGE FAILED";
  }
  return loseMountFromBalance(balance._id, money);

}

import {addMountToBalance} from './balances_actions.js';
import {addNewBalanceIncomeFromAgency} from './balance_incomes_actions.js';


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

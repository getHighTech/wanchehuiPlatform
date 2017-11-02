import {BalanceIncomes} from './balance_incomes.js';

export function addNewBalanceIncomeFromAgency(agencyId, balanceId, amount, text){
  return BalanceIncomes.insert({
    reasonType: "agencyGive",
    balanceId,
    text,
    amount,
    createdAt: new Date()
  });
}


export function addIncomeRecord(balanceId, amount, text, reasonType){
  return BalanceIncomes.insert({
    reasonType,
    balanceId,
    text,
    amount,
    createdAt: new Date()
  });
}

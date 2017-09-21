import {BalanceIncomes} from './balance_charges';

export function addNewBalanceIncomeFromAgency(agencyId, balanceId, amount, text){
  return BalanceIncomes.insert({
    reasonType: "agencyGive",
    balanceId,
    text,
    amount,
    createdAt: new Date()
  });
}

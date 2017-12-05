import {BalanceIncomes} from './balance_incomes.js';



export function addNewBalanceIncomeFromAgency(agencyId, balanceId, amount, text){
  return BalanceIncomes.insert({
    reasonType: "agencyGive",
    balanceId,
    text,
    amount,
    agency: agencyId,
    createdAt: new Date()
  });
}

export function noteIncome(reason, amount, text, balanceId){
  switch (reason.type) {
  case "agencyCard":
    if (!reason.agencyId) {
      return "AGENCYCARD TYPE SHOULD HAS AGENCYID IN NOT INCOME";
    }
    return addNewBalanceIncomeFromAgency(reason.agencyId, balanceId, amount ,text);
  default:
      return "NOT INCOME TYPE WRONG";

  }
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

export function getIncomeRecords(page, pagesize, balanceId, userId){
  return BalanceIncomes.find({balanceId, userId},{
    skip: (page-1)*pagesize, limit: pagesize,
    sort: {"createdAt": -1},
    fields:
      {
        'agency': 1,
        'text': 1,
        'amount': 1,
        'createdAt': 1,
        'reasonType': 1
      }
    })
}

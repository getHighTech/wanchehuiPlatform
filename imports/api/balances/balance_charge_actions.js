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

export function addNewBalanceChargeRefund(balanceId, userId, text, money, status, recyclerId){
  return BalanceCharges.insert({
    balanceId,
    userId,
    text,
    money,
    status,
    recyclerId,
    reasonType: "refund",
    createdAt: new Date()
  })
}

export function noteCharge(reason, amount, text, balanceId){
  let bankId = reason.bankId;
  let userId = reason.userId;
  let recyclerId = reason.recyclerId;
  switch (reason.type) {
  case 'withdrawals':

    if (!bankId || !userId) {
      return "WITHDRAWALS MESSAGES MISSING"
    }
    let status = reason.status;
    if (!status) {
      status = "revoke"
    }
    return addNewBalanceChargeWithDrawType(balanceId, userId, text, amount, bankId, status);
  case "refund":
    if(!userId || !recyclerId){
      return "REFUND MESSAGES MISSING"
    }
    return addNewBalanceChargeRefund(balanceId, userId, text, money, "done", recyclerId);
  default:
      return "NO CHARGE TYPE"
  }
}

export function getChargesRecords(page=1, pagesize=5, userId=null){
  return BalanceCharges.find({userId},{
    skip: (page-1)*pagesize, limit: pagesize,
    sort: {"createdAt": -1},
    fields:
      {
        'userId': 1,
        'text': 1,
        'money': 1,
        'bankId': 1,
        'status': 1,
        'reasonType': 1,
        'createdAt': 1
      }
    }).fetch();
}
export function getChargesRecordsAll(userId=null){
  return BalanceCharges.find({userId},{
    sort: {"createdAt": -1},
    fields:
      {
        'userId': 1,
        'text': 1,
        'money': 1,
        'bankId': 1,
        'status': 1,
        'reasonType': 1,
        'createdAt': 1
      }
    }).fetch();
}

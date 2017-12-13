const RECEIVED_LIMIT_WITHDRAWS = "RECEIVED_LIMIT_WITHDRAWS"
const ADD_ONE_WITHDRAW = "ADD_ONE_WITHDRAWS";
const REQUEST_WITHDRAWS = "REQUEST_WITHDRAWS";
const FETCH_LIMIT_WITHDRAW = "FETCH_LIMIT_WITHDRAWS";

export function receivedLimitWithdraws(type, withDraws){
  return {
    type: RECEIVED_LIMIT_WITHDRAWS,
    withDraws,
  }
}

export function requestPosts(type, withdraws){
  return {
    type: REQUEST_WITHDRAWS,
    withdraws,
  }
}



export function addOneWithDraw(type, withDraw){
  return {
    type: ADD_ONE_WITHDRAW,
    withDraw,
  }
}

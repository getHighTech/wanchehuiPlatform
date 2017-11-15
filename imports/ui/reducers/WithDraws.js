import {RECEIVED_LIMIT_WITHDRAWS, REQUEST_WITHDRAWS} from '../actions/withdraws.js';
export function WithDraws(state=[], action){
    switch (action.type) {
      case RECEIVED_LIMIT_WITHDRAWS:
        let withDraws = action.withDraws;
        return [...state, ...withDraws];

      default:
        return state;

    }
}
export function getWithDraw(state={status: "loading", payBack: "" }, action){
  switch (action.type) {
    case REQUEST_WITHDRAWS:
      return Object.assign({}, state, {
        status: "loading",
      });

    default:

      return state;

  }
}

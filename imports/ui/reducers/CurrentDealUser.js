import GET_ONE_USER from '../actions/current_deal_user.js';


export function CurrentDealAgency(state={}, action){
  switch (action.type) {
  case GET_ONE_USER:
    return Object.assign({},state, {
      _id: action.userId,
    })
  default:
    return state;
  }
}

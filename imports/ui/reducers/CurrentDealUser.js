import {GET_ONE_USER} from '../actions/current_deal_user.js';


export default function CurrentDealUser(state={userId: null, removing: 0, operaType: ""}, action){
  switch (action.type) {
  case GET_ONE_USER:
    return Object.assign({},state, {
      userId: action.userId,
      operaType: action.operaType,
    })
  default:
    return state;
  }
}

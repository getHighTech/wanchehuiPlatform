import {EDIT_ORDER_STATUS} from '../actions/order_status.js';



const initialState = {
    OrderStatus:[],
    Id:''
  };


function OrderStatus(state = initialState,action){
  console.log(action.type);
  console.log(action.getStatus);
  switch (action.type) {
    case EDIT_ORDER_STATUS:
      return Object.assign({},state,{
        OrderStatus:action.getStatus,
        Id:action.id
      })
      default:
        return state
  }
}
export default OrderStatus

import {EDIT_ORDER_STATUS,ADD_ORDER_STATUS,EDIT_STATUS,GET_ORDER_STATUS} from '../actions/order_status.js';



const initialState = {
    OrderStatus:[],
    getStatus:[],
    statusmodalInsert: true, // 当前modal是用来insert还是update
    statusmodalEditable: true,
    Id:''
  };


function OrderStatus(state = initialState,action){
  switch (action.type) {
    case EDIT_ORDER_STATUS:
      return Object.assign({},state,{
        OrderStatus:action.getStatus,
        statusmodalInsert:false,
        statusmodalEditable:true,
        Id:action.id
      })
    case GET_ORDER_STATUS:
      return Object.assign({},state,{
        getStatus:action.newStatus,
      })
    case ADD_ORDER_STATUS:
    return Object.assign({},state,{
        OrderStatus:{},
        statusmodalInsert:true,
        statusmodalEditable:true
    })
    case EDIT_STATUS:
    return Object.assign({},state,{
        OrderStatus:action.rlt,
        statusmodalInsert:false,
        statusmodalEditable:true,
    })

      default:
        return state
  }
}

export default OrderStatus

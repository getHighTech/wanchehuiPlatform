export const EDIT_ORDER_STATUS = "EDIT_ORDER_STATUS";
export const START_EDIT="START_EDIT";
export const ADD_ORDER_STATUS = "ADD_ORDER_STATUS";
export const EDIT_STATUS="EDIT_STATUS";
export const GET_ORDER_STATUS="GET_ORDER_STATUS"


export function startEdit(){
  console.log('调用startEdit')
  return{
    type:START_EDIT
  }
}

export function getOrderStatus(newStatus){
    return{
      type:GET_ORDER_STATUS,
      newStatus
    }
}

export function addOrderStatus(state){
  return {
    type:ADD_ORDER_STATUS,
    state
  }
}

export function editStatus(rlt){
  return {
    type:EDIT_STATUS,
    rlt
  }
}


export function editOrderStatus(getStatus,id){
    console.log(getStatus,id);
    return{

        type:EDIT_ORDER_STATUS,
        getStatus,
        id

    }
}

export const EDIT_ORDER_STATUS = "EDIT_ORDER_STATUS";
export const START_EDIT="START_EDIT";



export function startEdit(){
  console.log('调用startEdit')
  return{
    type:START_EDIT
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

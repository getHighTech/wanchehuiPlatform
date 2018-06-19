export const ADD_PRODUCT = "ADD_PRODUCT ";
export const SHOW_PRODUCT = "SHOW_PRODUCT ";
export const EDIT_PRODUCT  = "EDIT_PRODUCT ";
export const CHANGE_PRICE = "CHANGE_PRICE";
export const CHANGE_IMAGE_STATE="CHANGE_IMAGE_STATE";


export function showProduct(product){
  return{
    type:SHOW_PRODUCT,
    product
  }
}

export function editProduct(product,spec_length,arr,agency_arr,parameter_arr,id){
  return{
    type:EDIT_PRODUCT,
    product,
    spec_length,
    arr,agency_arr,parameter_arr,id
  }
}

export function addProduct(state){
  return{
    type:ADD_PRODUCT,
    state
  }
}

export function changeimagestate(state){
  return{
    type:CHANGE_IMAGE_STATE,
    state
  }
}

export function changePrice(price,endPrice,id){
  return{
    type:CHANGE_PRICE,
    price,endPrice,id
  }
}

export const ADD_PRODUCT = "ADD_PRODUCT ";
export const SHOW_PRODUCT = "SHOW_PRODUCT ";
export const EDIT_PRODUCT  = "EDIT_PRODUCT ";




export function showProduct(product){
  return{
    type:SHOW_PRODUCT,
    product
  }
}

export function editProduct(product,spec_length,arr){
  console.log(product,spec_length,arr);
  return{
    type:EDIT_PRODUCT,
    product,
    spec_length,
    arr
  }
}

export function addProduct(state){
  return{
    type:ADD_PRODUCT,
    state
  }
}

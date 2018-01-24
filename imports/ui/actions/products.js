export const ADD_PRODUCT = "ADD_PRODUCT ";
export const SHOW_PRODUCT = "SHOW_PRODUCT ";
export const EDIT_PRODUCT  = "EDIT_PRODUCT ";




export function showProduct(product){
  return{
    type:SHOW_PRODUCT,
    product
  }
}

export function editProduct(product){
  console.log(product);
  return{
    type:EDIT_PRODUCT,
    product
  }
}

export function addProduct(state){
  return{
    type:ADD_PRODUCT,
    state
  }
}

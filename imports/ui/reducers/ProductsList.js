import { SHOW_PRODUCT, EDIT_PRODUCT, ADD_PRODUCT } from "../actions/products.js";


const initialState = {
    singleProduct: {},
    productmodalInsert: true, // 当前modal是用来insert还是update
    productmodalEditable: true,
    key_length:0,
    key_arr:[],
    key_agencyarr:[],
    id:''
  };


  function ProductsList(state = initialState,action){
    console.log(action.type);
    switch (action.type) {
        case SHOW_PRODUCT:
          return Object.assign({}, state, {
            singleProduct: action.product,
            productmodalInsert: false,
            productmodalEditable: false
          })
        case EDIT_PRODUCT:
        return Object.assign({}, state, {
          singleProduct: action.product,
          productmodalInsert: false,
          productmodalEditable: true,
          key_length:action.spec_length,
          key_arr:action.arr,
          key_agencyarr:action.agency_arr,
          productId:action.id
        })
        case ADD_PRODUCT:
        return Object.assign({}, state,{
          singleProduct: {},
          productmodalInsert: true,
          productmodalEditable: true,
          key_length:0,
          key_arr:[],
          key_agencyarr:[]
        })


        default:
          return state
      }
}

export default ProductsList

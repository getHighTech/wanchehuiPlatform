import { SHOW_PRODUCT, EDIT_PRODUCT, ADD_PRODUCT,CHANGE_PRICE } from "../actions/products.js";


const initialState = {
    singleProduct: {},
    productmodalInsert: true, // 当前modal是用来insert还是update
    productmodalEditable: true,
    key_length:0,
    key_arr:[],
    key_agencyarr:[],
    key_parameterarr:[],
    id:'',
    productprice:[],
    localproductid:''
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
          key_parameterarr:action.parameter_arr,
          productId:action.id
        })
        case ADD_PRODUCT:
        return Object.assign({}, state,{
          singleProduct: {},
          productmodalInsert: true,
          productmodalEditable: true,
          key_length:0,
          key_arr:[],
          key_agencyarr:[],
          key_parameterarr:[]
        })
        case CHANGE_PRICE:
        return Object.assign({},state,{
          productprice:action.alt,
          localproductid:action.id
        })


        default:
          return state
      }
}

export default ProductsList

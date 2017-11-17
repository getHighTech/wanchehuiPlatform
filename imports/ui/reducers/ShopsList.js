import {SHOW_SHOP, EDIT_SHOP, ADD_SHOP} from "../actions/shops.js";


const initialState = {
    singleShop: {},
    modalInsert: true, // 当前modal是用来insert还是update
    modalEditable: true
  };

  function ShopsList(state = initialState,action){
    console.log(action.type);
    switch (action.type) {
        case SHOW_SHOP:
          return Object.assign({}, state, {
            singleShop: action.shop,
            modalInsert: false,
            modalEditable: false
          })
        case EDIT_SHOP:
        return Object.assign({}, state, {
          singleShop: action.shop,
          modalInsert: false,
          modalEditable: true
        })
        case ADD_SHOP:
        return Object.assign({}, state,{
          singleShop: {},
          modalInsert: true,
          modalEditable: true
        })
        default:
          return state
      }
}

export default ShopsList
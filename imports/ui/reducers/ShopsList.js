import {SHOW_SHOP, EDIT_SHOP} from "../actions/shops.js";


const initialState = {
    shopsData:[],
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
            modalEditable: false
          })
        console.log(state);
        case EDIT_SHOP:
        return Object.assign({}, state, {
          singleShop: action.shop,
          modalInsert: false,
          modalEditable: true
        })
      console.log(state);
        default:
          return state
      }
}

export default ShopsList
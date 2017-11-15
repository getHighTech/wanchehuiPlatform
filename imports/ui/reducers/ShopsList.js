import {SHOW_SHOP} from "../actions/shops.js";


const initialState = {
    shopsData:[],
    singleShop: {},
    modalInsert: true,  // 当前modal是用来insert还是update
  };

  function ShopsList(state = initialState,action){
    console.log(action.type);
    switch (action.type) {
        case SHOW_SHOP:
          return Object.assign({}, state, {
            singleShop: action.shop
          })
        console.log(state);
        default:
          return state
      }
}

export default ShopsList
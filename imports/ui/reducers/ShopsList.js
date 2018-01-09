import { SHOW_SHOP, EDIT_SHOP, ADD_SHOP, GET_SHOP_ADDRESS, GET_SHOP_POINT } from "../actions/shops.js";


const initialState = {
    singleShop: {},
    modalInsert: true, // 当前modal是用来insert还是update
    modalEditable: true,
    shopAddress: "",
    shopPoint: []
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

        case GET_SHOP_ADDRESS:
        return Object.assign({}, state,{
          shopAddress: action.AddressName
        })
        case GET_SHOP_POINT:
        return Object.assign({}, state,{
          shopPoint: action.point
        })
        default:
          return state
      }
}

export default ShopsList

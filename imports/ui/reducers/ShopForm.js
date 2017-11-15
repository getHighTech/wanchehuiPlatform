import {SHOP_FORM_INPUT} from '../actions/shop_form.js'

function ShopForm(state={
  phone:'',
  name: '',
  shopDescrption:'',
  loading: true,
}, action){
  switch (action.type) {
    case SHOP_FORM_INPUT:
      return Object.assign({}, state, {
        phone: action.phone,
        name: action.name,
        shopDescrption:action.shopDescrption,
      });
    default:
      return state;

  }
}

export default ShopForm;

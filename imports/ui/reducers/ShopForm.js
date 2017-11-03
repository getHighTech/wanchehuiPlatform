import {SHOP_FORM_INPUT} from '../actions/shop_form.js'

function ShopForm(state={
  phone:'',
  name: '',
  loading: true,
}, action){
  switch (action.type) {
    case SHOP_FORM_INPUT:
      return Object.assign({}, state, {
        phone: action.phone,
        name: action.name,
      });
    default:
      return state;

  }
}

export default ShopForm;

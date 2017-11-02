export const SHOP_FORM_INPUT = "SHOP_FORM_INPUT";

export function shopFormInput(phone, name){
  return {
    type: SHOP_FORM_INPUT,
    phone, name
  }
}

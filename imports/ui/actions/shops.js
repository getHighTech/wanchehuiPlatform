export const ADD_SHOP = "ADD_SHOP";
export const SHOW_SHOP = "SHOW_SHOP";
export const EDIT_SHOP = "EDIT_SHOP";
export const GET_SHOP_ADDRESS = "GET_SHOP_ADDRESS";



export function showShop(shop){
    return{
        type:SHOW_SHOP,
        shop
    }
}

export function editShop(shop){
    return{
        type:EDIT_SHOP,
        shop
    }
}

export function addShop(state){
    return{
        type:ADD_SHOP,
        state
    }
}

export function getShopAddress(AddressName){
    return{
        type:GET_SHOP_ADDRESS,
        AddressName
    }
}

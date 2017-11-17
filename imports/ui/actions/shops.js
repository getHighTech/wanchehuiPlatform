export const ADD_SHOP = "ADD_SHOP";
export const SHOW_SHOP = "SHOW_SHOP";
export const EDIT_SHOP = "EDIT_SHOP";



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

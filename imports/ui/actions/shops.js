export const NEW_SHOP_BY_ADMIN = "NEW_SHOP_BY_ADMIN";
export const ADD_SHOP = "ADD_SHOP";
export const EDIT_SHOP = "EDIT_SHOP";
export const UPDATE_SHOP = "UPDATE_SHOP";
export const SHOW_SHOP = "SHOW_SHOP";
export const DETELE_SHOP = "DETELE_SHOP";



export const addShop = (params) => {
    return{
        type:"ADD_SHOP",
        params
    }
}
export const editShop = (id) => {
    return{
        type:"EDIT_SHOP",
        id
    }
}

export const updateShop = (id) => {
    return{
        type:"UPDATE_SHOP",
        id
    }
}

export const showShop = (id) => {
    return{
        type:"SHOW_SHOP",
        id
    }
}

export const deteleShop = (id) => {
    return{
        type:"DETELE_SHOP",
        id
    }
}
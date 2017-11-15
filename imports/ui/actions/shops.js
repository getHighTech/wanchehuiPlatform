export const SHOW_SHOP = "SHOW_SHOP";



export function getShopById(shop){
    return{
        type:SHOW_SHOP,
        shop
    }
}

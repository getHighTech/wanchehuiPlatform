export const ADVANCED_CARD = "ADVANCED_CARD";
export const COMMON_CARD = "COMMON_CARD";

export function setAdvancedCard(product) {
    return {
        type: ADVANCED_CARD,
        product
    }
}


export function setCommonCard(product) {
    return {
        type: COMMON_CARD,
        product
    }
}

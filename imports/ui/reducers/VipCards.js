import { COMMON_CARD, ADVANCED_CARD } from "../actions/vips.js";


const initialState = {
    advancedCard: {},
    commonCard: {},
};



function VipCards(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case ADVANCED_CARD:
            return Object.assign({}, state, {
                advancedCard: action.product,
            })
        case COMMON_CARD:
            return Object.assign({}, state, {
                commonCard: action.product,
            })

        default:
            return state
    }
}

export default VipCards
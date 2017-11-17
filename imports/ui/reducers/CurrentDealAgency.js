import {GET_AGENCY_ID, CLEAR_AGENCY_ID} from '../actions/current_deal_agency.js';


function CurrentDealAgency(state={_id: null, lowerAgencies: []}, action){
  switch (action.type) {
  case GET_AGENCY_ID:
    return Object.assign({}, state, {
      _id: action.agencyId,
      lowerAgencies: [1,2],
    });
  case CLEAR_AGENCY_ID:
    return state;

  default:

    return state;

  }
}


export default CurrentDealAgency;

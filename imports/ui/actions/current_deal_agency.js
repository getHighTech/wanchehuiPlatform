export const GET_AGENCY_ID = "GET_AGENCY_ID";
import {findLowerAgenciesById} from '../services/agencies';


export function getAgencyId(agencyId){
  return {
    type: GET_AGENCY_ID,
    agencyId,
  }
}

export function getLowerAgencies(superAgencyId){
  return findLowerAgenciesById(superAgencyId).then(
    error => {
      console.log(error);
    },
    result => {
      console.log(result);
    }
  );
}

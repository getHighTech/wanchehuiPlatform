export const GET_AGENCY_ID = "GET_AGENCY_ID";
export const CLEAR_AGENCY_ID = "CLEAR_AGENCY_ID";

export function getAgencyId(agencyId){
  return {
    type: GET_AGENCY_ID,
    agencyId,
  }
}

export function clearAgencyId(agencyId){
  return {
    type: GET_AGENCY_ID,
    agencyId,
  }
}

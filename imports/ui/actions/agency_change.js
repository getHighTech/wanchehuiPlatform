export const AGENCY_REFRESH = "AGENCY_REFRESH";
export const REFRESH_CLEAR = "REFRESH_CLEAR";

export function agencyRefresh(agencyId){
  console.log(agencyId);
  return {
    type: AGENCY_REFRESH, agencyId
  }
}

export function refreshClear(){
  return {
    type: REFRESH_CLEAR,
  }
}

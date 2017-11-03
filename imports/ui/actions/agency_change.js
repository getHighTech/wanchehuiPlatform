export const USERFINDER_SELECT_USER = "USERFINDER_SELECT_USER";
export const CHECK_USER_HAS_AGENCY = "CHECK_USER_HAS_AGENCY";
export const UPDATE_USER_AGENCY_NEEDED = "UPDATE_USER_AGENCY_NEEDED";

export function userFinderSelectUser(userId, extraData){
  return {
    type: USERFINDER_SELECT_USER,
    userId,
    extraData
  }
}

export function checkUserHasAgency(userId){
  return {
    type: CHECK_USER_HAS_AGENCY,
    userId,
  }
}

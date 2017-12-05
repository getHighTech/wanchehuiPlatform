export const GET_ONE_USER = "GET_ONE_USER";

export function getOneUser(userId, operaType){

  return {
    type: GET_ONE_USER,
    userId,
    operaType,
  }
}

export function getOnePageIncomes(userId, operaType){
  return dispatch => {
    dispatch(getOneUser(userId, operaType));
    
  }
}

export const GET_ONE_USER = "GET_ONE_USER";
export const GET_ONE_PAGE_INCOMES = "GET_ONE_PAGE_INCOMES";
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
    return  Meteor.callAsync('someMethod', "123", "123")
      .then(response => response.json())
      .then(json => {console.log(json)});
  }
}

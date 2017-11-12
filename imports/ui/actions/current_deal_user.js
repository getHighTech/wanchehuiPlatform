export const GET_ONE_USER = "GET_ONE_USER";

export function getOneUser(userId){
  return {
    type: GET_ONE_USER,
    userId,
  }
}

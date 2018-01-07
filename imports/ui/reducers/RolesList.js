import { ROLE_OBJ,ALL_ROLES } from "../actions/roles.js";


const initialState = {
  singleRole: {},
  allRoles:[]

};



function RolesList(state = initialState,action){
  console.log(action.type);
  switch (action.type) {
      case ROLE_OBJ:
        return Object.assign({}, state, {
          singleRole: action.role,
        })
      case ALL_ROLES:
        console.log("调用REDUX:"+ action.type)
        console.log(action.roles,)
        return Object.assign({}, state, {
          allRoles: action.roles,
        })
      default:
        return state
    }
}

export default RolesList
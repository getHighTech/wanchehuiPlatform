import { ROLE_OBJ } from "../actions/roles.js";


const initialState = {
  singleRole: {},

};



function RolesList(state = initialState,action){
  console.log(action.type);
  switch (action.type) {
      case ROLE_OBJ:
        return Object.assign({}, state, {
          singleRole: action.role,
        })
      default:
        return state
    }
}

export default RolesList
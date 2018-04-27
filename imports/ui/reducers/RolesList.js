import { ROLE_OBJ,ALL_ROLES,CURRENT_ROLES,CREATE_MEUN_LIST } from "../actions/roles.js";


const initialState = {
  singleRole: {},
  allRoles:[],
  currentRoles:[],
  LeftMenuList:[]
};



function RolesList(state = initialState,action){
  console.log(action.type);
  switch (action.type) {
      case ROLE_OBJ:
        return Object.assign({}, state, {
          singleRole: action.role,
        })
      case ALL_ROLES:
        return Object.assign({}, state, {
          allRoles: action.roles,
        })
        case CURRENT_ROLES:
        return Object.assign({}, state, {
          currentRoles: action.roles,
        })
        case CREATE_MEUN_LIST:
        return Object.assign({}, state, {
          LeftMenuList: action.meunList,
        })
      default:
        return state
    }
}

export default RolesList
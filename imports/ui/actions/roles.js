export const ROLE_OBJ = "ROLE_OBJ";
export const ALL_ROLES = "ALL_ROLES";
export const CURRENT_ROLES = "CURRENT_ROLES";
export const CREATE_MEUN_LIST = "CREATE_MEUN_LIST";


export function getRole(role){
    return{
        type:ROLE_OBJ,
        role
    }
}

export function getRoles(roles){
    return{
        type: ALL_ROLES,
        roles
    }
}
export function getCurrentRoles(roles){
    return{
        type: CURRENT_ROLES,
        roles
    }
}
export function createMeunList(meunList){
    return{
        type:CREATE_MEUN_LIST,
        meunList
    }
}
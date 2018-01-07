export const ROLE_OBJ = "ROLE_OBJ";
export const ALL_ROLES = "ALL_ROLES";


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

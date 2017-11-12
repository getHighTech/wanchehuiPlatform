const shops = (state,action) => {
    switch(action.type){
        case "ADD_SHOP":
        return{
            modalVisible: true,
            modalEditable:true,
            modalTitle: '新增店铺',
            modalInsert: true,
            modalReadonly: false,
        }
        case "EDIT_SHOP":
        return{
            modalVisible: true,
            modalEditable:true,
            modalTitle: '新增店铺',
            modalInsert: true,
            modalReadonly: false,
            
        }
        case "UPDATE_SHOP":
        return{
            modalVisible: true,
            modalEditable:true,
            modalTitle: '新增店铺',
            modalInsert: true,
            modalReadonly: false,
            
        }
        case "SHOW_SHOP":
        return{
            modalVisible: true,
            modalEditable:true,
            modalTitle: '新增店铺',
            modalInsert: true,
            modalReadonly: false,
            
        }
        case "DETELE_SHOP":
        return{
            modalVisible: true,
            modalEditable:true,
            modalTitle: '新增店铺',
            modalInsert: true,
            modalReadonly: false,
            
        }
        default:
        return state
    }
}
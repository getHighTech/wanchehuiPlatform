export const Edit_Order_Status = "Edit_Order_Status";



export function editOrderStatus(status){
  Meteor.call('get.OrderState.byStatus',status,function(err,alt){
    console.log(alt);
    let getStatus=[];
    for(var i=0;i<alt.length;i++){
      getStatus.push(alt[i].sTo)
    }
    console.log(getStatus);
  })

    return{
        type:Edit_Order_Status,
        getStatus
    }
}

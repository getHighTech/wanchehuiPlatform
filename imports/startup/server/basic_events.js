let basicEventsInfo = [
{
  eventName: "login",
  eventTrans: "登录",
}
];
let basicEvents = {
  "login": function(userId){
    console.log("login event");
  }
};

export {basicEvents, basicEventsInfo};

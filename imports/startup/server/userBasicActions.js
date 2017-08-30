import EventJob from './EventJob.js';
function userLogin(){
    console.log("用户登录");
}

function userRegister(){
    console.log("用户注册");
}

Meteor.startup(() => {
  let job = new EventJob({
    eventName: "user.login",
    userParams: {
    },
    beforeEventName: undefined,
    afterEventName: undefined,
    isBasic: true,
    basicAction: userLogin.toString()

  });
  console.log(job);
});

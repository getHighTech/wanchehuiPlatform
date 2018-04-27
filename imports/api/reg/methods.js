// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';


Meteor.methods({
  'get.phonesms'(mobile) {
  	let apikey = "11bd70b637fe474bcb617e691a5fba3d";
  	let num="";
		for(let i=0;i<4;i++)
		{
			num+=Math.floor(Math.random()*10);
		}
	// Session.set("mobile_valid", num);
  	let text = "【万车汇网】欢迎使用万车汇，您的手机验证码是"+num+"。本条信息无需回复";

  	let uri = "https://sms.yunpian.com/v2/sms/single_send.json";
    let res = HTTP.call(
    "POST",
    uri,
    {
    	params:{
    	apikey,
    	mobile,
    	text,

    	}
    }
    );

    return num;
	},
	'get.reg.phonesms'(mobile){
		let user = Meteor.users.findOne({username: mobile});
		if(user){
			return "MOBILE TAKEN";
		}
		user = Meteor.users.findOne({'profile.mobile': mobile});
		if(user){
			return "MOBILE TAKEN";
		}
		let apikey = "11bd70b637fe474bcb617e691a5fba3d";
  	let num="";
		for(let i=0;i<4;i++)
		{
			num+=Math.floor(Math.random()*10);
		}
  	let text = "【万车汇网】欢迎使用万车汇，您的手机验证码是"+num+"。本条信息无需回复";

  	let uri = "https://sms.yunpian.com/v2/sms/single_send.json";
    let res = HTTP.call(
    "POST",
    uri,
    {
    	params:{
    	apikey,
    	mobile,
    	text,

    	}
    }
    );

    return num;
	}
});

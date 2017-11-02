import { Meteor } from 'meteor/meteor';

import {
  createUserByUsernameAndMobile,
  giveCardAndCouponsToUser,
  updateUsernameByMobile
} from '../api/users/actions.js'


HTTP.methods({
   '/api/v1/users/create_by_order': {
     get: function() {
       let username =  this.query.username;
       let mobile = this.query.mobile;
       if (!username) {
         return "USERNAME NOT FOUND"
       }
       if (!mobile) {
         return "MOBILE NOT FOUND"
       }
       let user = createUserByUsernameAndMobile(username, mobile);
       return giveCardAndCouponsToUser(user._id);
     }
   },
   '/api/version1/users_update/username':{
     get: function(){
       let mobile = this.query.mobile;
       if (!mobile) {
         return "MOBILE CANT BE BLANK"
       }
       return updateUsernameByMobile(mobile);

     }
   }
 });

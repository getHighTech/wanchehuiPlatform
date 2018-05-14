import { Meteor } from 'meteor/meteor';

import { getIncomeRecords } from '../api/balances/balance_incomes_actions.js'


HTTP.methods({
   '/api/v1/balances/:id/:userId/incomes/:page/:pagesize': {
     get: function() {
          let balanceId = this.query.id;
          let userId = this.query.userId;
          let page = this.query.page;
          let pagesize = this.query.pagesize;
         return getIncomeRecords(page, pagesize, balanceId, userId);
     }
   },
   '/api/v1/balances/:id/charges':{
     get: function(){
       let mobile = this.query.mobile;
       if (!mobile) {
         return "MOBILE CANT BE BLANK"
       }
       return updateUsernameByMobile(mobile);

     }
   },
 });

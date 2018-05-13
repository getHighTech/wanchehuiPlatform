import { Meteor } from 'meteor/meteor';



HTTP.methods({
  
   '/api/v2/order/give': {
     get: function(){
       return "开始发货"
     },
     post: function(){
        return "开始发货"
     }
   },
 });

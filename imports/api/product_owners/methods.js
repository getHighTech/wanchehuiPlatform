import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import { ProductOwners } from './product_owners.js';
import { validLoginToken } from '../actions/validLoginToken.js';

Meteor.methods({

    "get.user.product"(userId, token){
        if(validLoginToken(token)){
            return ProductOwners.findOne({userId});
        }
    }

    

});
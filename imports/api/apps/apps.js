// Definition of the apps collection

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Orders} from "/imports/api/orders/orders.js";
import { Products } from '../products/products';

function validUserLogin(token, appName){
   
    let hashStampedToken = Accounts._hashStampedToken(token);
    let hashedToken = hashStampedToken.hashedToken;
    let validToken = Accounts._hashLoginToken(token.token);
    if(hashedToken===validToken){
        return true;
    }else{
        return false;
    }
}



export const Apps = new Mongo.Collection('apps');
export const AppCarts = new Mongo.Collection("app_carts");

export function findOneAppByName(name){
    if (name === "wanrenchehui") {
        if(Apps.find(name).count()===0){
            Apps.insert({
                name,
                name_zh: "万人车汇",
                domain: "10000cars.cn",
                testDomain: "test1.10000cars.cn",
                breif: "专注网约车创业"
            });
        }
    }
    return Apps.findOne({name});
}

export function appGetHomeIndex(appName, shopName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
}

export function appRegNewUser(userParams, appName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }

    if(Meteor.users.findOne({'profile.mobile': userParams.mobile})){
        return {
            type: "error",
            reason: "USER REG MOBILE EXISTS" 
        }
    }


    userId =  Accounts.createUser({username: userParams.username, password: userParams.password});
    if(userId){
      Meteor.users.update(user,{
        $set: {
          'profile.mobile': userParams.mobile,
          registerAddress: userParams.registerAddress,
        }
       })
       return {
           type: "user",
           msg: userId,
       }
    }else{
        return {
            type: "error",
            reason: "USER REG USERNAME EXISTS" 
        }
    }
}

export function appLoginUser(type, userParams, appName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    switch (type) {
        case 'mobileSMS':
        //短线验证码登陆
            let mobileUser = Meteor.users.findOne({username: loginParams.mobile});
            if(mobileUser === undefined){
            mobileUser = Meteor.users.findOne({'profile.mobile': loginParams.username});
            if(mobileUser===undefined){
                let newUserId =Accounts.createUser({
                username: loginParams.mobile,
                password: oginParams.mobile,
                })
                Meteor.update(mobileUser._id, {
                "profile.mobile": loginParams.mobile,
                });
                mobileUser = Meteor.users.findOne({_id: newUserId});
                return {type: 'user',msg: {stampedToken: stampedTokenMobile, userId: mobileUser._id, needToResetPassword: true}};
            }
            }
            if(mobileUser){
            let stampedTokenMobile = Accounts._generateStampedLoginToken();
            let hashStampedTokenMobile = Accounts._hashStampedToken(stampedTokenMobile);
            Meteor.users.update(mobileUser._id,
                {$push: {'services.resume.loginTokens': hashStampedTokenMobile}}
            );
            return {type: "user", msg: {stampedToken: stampedTokenMobile, userId: mobileUser._id, needToResetPassword: false}};
            }

        case 'password':
        //密码登陆
          let user = Meteor.users.findOne({username: loginParams.username});
          if(user === undefined){
            user = Meteor.users.findOne({'profile.mobile': loginParams.username});
            if(user===undefined){
              return {type: "error", reason:"USER NOT FOUND"};
            }
          }
          let rlt = Accounts._checkPassword(user, loginParams.password);
          if(rlt.userId === user._id && !rlt.error){
            let stampedToken = Accounts._generateStampedLoginToken();
            let hashStampedToken = Accounts._hashStampedToken(stampedToken);
            Meteor.users.update(user._id,
              {$push: {'services.resume.loginTokens': hashStampedToken}}
            );
            return {type: "user", msg: {stampedToken, userId: user._id}};
          }else{
            return {type: "error", reason: "LOGIN PASS WRONG"};
          }
          
        default:
          return {type: "error", reason: "INVALID LOGIN"};
      }
}



export function appNewCart(cartParams, appName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if (validUserLogin) {
        return {
            type: "error",
            reason: "NEED TO LOGIN"
        }
    }
}

export function updateCart(cartId, userId, appName, cartParams){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if (validUserLogin) {
        return {
            type: "error",
            reason: "NEED TO LOGIN"
        }
    }
}

export function appNewOrder(cartParams, appName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if (validUserLogin) {
        return {
            type: "error",
            reason: "NEED TO LOGIN"
        }
    }
}



export function getUserRoles(userId, token, appName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if (validUserLogin) {
        return {
            type: "error",
            reason: "NEED TO LOGIN"
        }
    }
}

export function getUserOrders(userId, token, appName, pagesize, page, condition){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if (validUserLogin) {
        return {
            type: "error",
            reason: "NEED TO LOGIN"
        }
    }
}


export function getUserBalace(userId, token, appName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if (validUserLogin) {
        return {
            type: "error",
            reason: "NEED TO LOGIN"
        }
    }
}

export function getUserIncomes(userId, token, appName, pagesize, page, condition){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if (validUserLogin) {
        return {
            type: "error",
            reason: "NEED TO LOGIN"
        }
    }
}

export function getUserCharges(userId, token, appName, pagesize, page, condition){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if (validUserLogin) {
        return {
            type: "error",
            reason: "NEED TO LOGIN"
        }
    }
}


export function getOneProduct(token, appName, condition){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    let product = Products.findOne(condition);
    if (!product) {
        return {
            type: "error",
            reason: "PRODUCT NOT FOUND"
        }
    }
    return {
        type: "products",
        msg: product
    }
}

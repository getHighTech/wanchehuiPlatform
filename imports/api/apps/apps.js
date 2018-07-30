// Definition of the apps collection

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {Orders} from "/imports/api/orders/orders.js";
import {UserRoles} from "/imports/api/user_roles/user_roles.js";
import { Products } from '../products/products.js';
import {Balances} from '../balances/balances.js';
import {Bankcards} from '../bankcards/bankcards.js';
import {BalanceIncomes} from '../balances/balance_incomes.js';
import {BalanceCharges} from '../balances/balance_charges.js';
import {Agencies} from '/imports/api/agencies/agencies.js';
import {Shops} from '/imports/api/shops/shops.js';
import { ProductOwners } from '/imports/api/product_owners/product_owners.js';
import { ShopOrders   } from '/imports/api/shop_orders/shop_orders.js';
import { AgencyRelation } from '/imports/api/agency_relation/agency_relation.js';
export const Apps = new Mongo.Collection('apps');
export const AppCarts = new Mongo.Collection("app_carts");
export const UserContacts = new Mongo.Collection("user_contacts");

//home page products
export function getHomePageProducts(appName) {
    let shop = getUserShop(appName)
    if(shop){
        let products = Products.find({$nor: [{productClass: "advanced_card"}],isSale: true, shopId: shop._id}).fetch();
        return {
            type: "products", 
            msg: products,
        }
    }
}

// get appName products
export function getAppNameProducts(appName) {
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    let shop = getUserShop(appName);
    let products = Products.find({$nor: [{productClass: "advanced_card"}],isSale: true, shopId: shop._id}).fetch();
    return {
        type: "products", 
        msg: products,
    }
}

//get member
function getMember(shopId) {
    let shop = Shops.findOne({_id: shopId})
      if (shop.isAdvanced===true){
          return true
      }else {
          return false
      }
      
}

//
function getUserShopById(shopId) {
    let shop = Shops.findOne({_id: shopId})
    return shop
}
//添加visited

function getUserShop(appName) {
   let shop = Shops.findOne({appName})
   return shop
}

//需要用的工具类函数，
function validUserLogin(token){

    let hashStampedToken = Accounts._hashStampedToken(token);
    let hashedToken = hashStampedToken.hashedToken;
    let validToken = Accounts._hashLoginToken(token.token);
    if(hashedToken===validToken){
        return true;
    }else{
        return false;
    }
}

function getUserInfo(loginToken, appName, collectionType, callBack){
    if(!loginToken){
        return {
            type: "error",
            reason: "Not Logined"
        }
    }
    //标准获取用户信息模板
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if(validUserLogin(loginToken)){
        return callBack();

    }else{
        return {
            type: "error",
            reason: "NOT LOGIN"
        }
    }
}

function generateRondom(n) {
    let str = "";
    let num ;
    for(var i = 0; i < n ; i ++) {
        num  = Math.ceil(Math.random()*10);
        str += num ;
    }
   return str;
}


export function syncUser(userId, stampedToken, appName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if(!stampedToken){
        return {
            type: "error",
            reason: "Not Logined"
        }
    }
    let hashStampedToken = Accounts._hashStampedToken(stampedToken);
    let hashedToken = hashStampedToken.hashedToken;
    let validToken = Accounts._hashLoginToken(stampedToken.token);
    if(hashedToken!==validToken){
        return {
            type: "fail",
            msg: "NOT LOGINED"
        };
    }
      let roles = [];
      UserRoles.find({userId}).forEach((item)=>{
        roles.push(item.roleName);
      });
      let user = Meteor.users.findOne({_id: userId});
      if(!user){
        return {
            type: "fail",
            msg: "NOT LOGINED"
        };
      }
      let userContact = UserContacts.findOne({userId, default: true})
      roles.push("login_user");
      let shop = getUserShopPerminssion(userId)
      let shopId = shop? shop._id : null
      let platfrom = getUserShop(appName)
      let product, role, senior;
      let platfromId = platfrom? platfrom._id: null
      if(platfromId){
         product = Products.findOne({shopId: platfromId, productClass: {
             "$in": ['common_card','advanced_card']
         }})
         console.log(`~~~`)
         console.log(product)
         console.log(`~~~`)
         if(product) {
             role = UserRoles.findOne({userId,roleName: `${product.name}_holder`,status: true})
         }
      }
      if(role!==undefined){
      }else{
          role = false
      }
      if(shop){
        senior = shop.hasOwnProperty("isAdvanced") === true ? true : false
      }
      console.log(`111`)
      console.log(senior)
      console.log(`111`)
      console.log(role)
      return {
          type: "users",
          msg: {roles, user, userId: user._id, userContact,shopId,appNameShopId: platfromId,agencyRole: role,senior  },
      }
}


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
    if (name === "xianzhi") {
        if (Apps.find(name).count() === 0) {
            Apps.insert({
                name,
                name_zh: "鲜至",
                domain: "xianzhi.10000cars.cn",
                // testDomain: "test1.10000cars.cn",
                breif: "专注卖农产品"
            });
        }
    }
    return Apps.findOne({name});
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
      Meteor.users.update(userId, {
        $set: {
          'profile.mobile': userParams.mobile,
          "regPosition": userParams.position,
          "regAddress": userParams.address,
          "regCity": userParams.city,
        }
       })
       return {
           type: "users",
           msg: userId,
       }
    }else{
        return {
            type: "error",
            reason: "USER REG USERNAME EXISTS"
        }
    }
}

export function appLoginUser(type, loginParams, appName){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    switch (type) {
        case 'mobileSMS':
        //短线验证码登陆
        console.log(loginParams)
            let mobileUser = Meteor.users.findOne({username: loginParams.mobile});
            if(mobileUser === undefined){
            mobileUser = Meteor.users.findOne({'profile.mobile': loginParams.username});
            if(mobileUser===undefined){
                let newUserId =Accounts.createUser({
                username: loginParams.mobile,
                password: loginParams.mobile
                })
                Meteor.update(mobileUser._id, {
                "profile.mobile": loginParams.mobile,
                "regPosition": loginParams.position,
                "regAddress": loginParams.address,
                "regCity": loginParams.city,
                });
                mobileUser = Meteor.users.findOne({_id: newUserId});
                return {
                        type: 'users',msg: 
                            {
                                stampedToken: stampedTokenMobile,
                                userId: mobileUser._id, 
                                needToResetPassword: true
                            }
                        };
            }
            }
            if(mobileUser){
            let stampedTokenMobile = Accounts._generateStampedLoginToken();
            let hashStampedTokenMobile = Accounts._hashStampedToken(stampedTokenMobile);
            Meteor.users.update(mobileUser._id,
                {$push: {
                    'services.resume.loginTokens': hashStampedTokenMobile,
                    "logPosition": loginParams.position,
                    "logAddress": loginParams.address,
                    "logCity": loginParams.city,
                }}
            );

            let shop = getUserShop(appName)
            let shopId;
            if(shop){
                shopId = shop._id
                Meteor.users.update(mobileUser._id,
                    {
                        $addToSet: {
                            'visited': shopId
                        }
                    }
                )
            }
          
            return {type: "users", msg: {stampedToken: stampedTokenMobile, userId: mobileUser._id, needToResetPassword: false,shopId}};
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
                    {
                        $push: {
                            'services.resume.loginTokens': hashStampedToken,
                            'services.resume.loginLocation': {
                                "logPosition": loginParams.position,
                                "logAddress": loginParams.address,
                                "logCity": loginParams.city,
                                "loginedAt": new Date(),
                            },
                        }
                    }
            );
            let roles = [];
                UserRoles.find({userId: user._id}).forEach((item)=>{
                roles.push(item.roleName);
                });
            roles.push("login_user");
            let userContact = UserContacts.findOne({userId: user._id, default: true})
            let shop = getUserShop(appName)
            let shopId = shop._id
            Meteor.users.update(user._id,
                {
                    $addToSet: {
                        'visited': shopId
                    }
                }
            )

            return {type: "users",
            msg:
            {stampedToken, userId: user._id, roles, user, userContact,shopId}};
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

export function getOneProduct(loginToken, appName, productId){
    console.log("productId")
    console.log(productId)
    console.log(productId)
        let product = Products.findOne({_id: productId});
        // console.log("product")
        // console.log(product)
        if(!product){
            product = Products.findOne({roleName: productId});
        }
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
export function updateShopOrders(orderId, orderParams){
    if(!orderId){
        return {
            type: "error",
            reason: "ORDER NOT FOUND"
        }
    }
    return ShopOrders.find({orderId}).forEach((shopOrder)=>{
        ShopOrders.update(shopOrder._id, {
            $set: {
                ...orderParams,
            }
        })
    });

}
export function updateOrder(loginToken, appName, orderParams, orderId){
    return getUserInfo(loginToken, appName, "orders", function(){
        let updateRlt = Orders.update(orderId, {
            $set: {
                ...orderParams,
                orderId
            }
        });
        updateShopOrders(orderId, orderParams);
        if(updateRlt){
            return {
                type: "orders",
                msg: orderId,
            }
        }else{
            return {
                type: "error",
                reason: "ORDERS UPDATE FAIL"
            }
        }
    })
}

export function createNewOrder(loginToken, appName, orderParams){
    let   relation;
    if(orderParams.cartId){
        AppCarts.update(orderParams.cartId, {
            $set: {
                orderStatus: "finish",
                version: 2,
            }
        })
    }
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if(validUserLogin(loginToken)){
        let  orderCode = new Date().getTime().toString()+generateRondom(10).toString();
        let order = Orders.findOne({orderCode});
        if(order){
            return {
                type: "error",
                reason: "ORDERCODE REPEAT"
            }
        }
        let shopProducts = orderParams.shopProducts;
        //判断代理
        for(let i = 0; i < orderParams.products.length;i++){
           if(orderParams.products[i].productClass==="common_card"){
              let shop = getUserShopById(orderParams.products[i].shopId)
              if(shop.isAdvanced===true){
                let  agencyRelation = AgencyRelation.findOne({userId: orderParams.userId})
                if(!agencyRelation){
                relation =  AgencyRelation.insert({
                        appName,
                        shopId: null,
                        SshopId: shop._id,
                        userId: orderParams.userId,
                        SuserId: shop.acl.own.users,
                        status: false,
                    })
                }else{
                    console.log(`过了过了`)
                    relation =  AgencyRelation.findOne({userId: orderParams.userId})
                }
              }
           }else{
               console.log(`进来这里了`)
              relation =  AgencyRelation.findOne({userId: orderParams.userId})
              break;
           }
        }
        
        //分店铺建立订单
        console.log('~~~~')
        console.log(relation)
        console.log(`~~~~`)
        let orderParamsDealed = {
            ...orderParams,
            type: "card",
            mobile: orderParams.contact.mobile, //兼容1.0
            carNumber: orderParams.contact.carNumber, //兼容1.0
            price: orderParams.totalAmount/100, //兼容1.0
            productId: orderParams.productIds[0], //兼容1.0
            realNote: {
                realName: orderParams.contact.name,
                mobile: orderParams.contact.mobile,
                carNumber: orderParams.contact.carNumber,
            }, //兼容1.0
            count: 1, //兼容1.0
            orderCode,
            status: "unconfirmed",
            createdAt: new Date(),
            appName,
            agencyRelationId:  relation===undefined? null : relation._id,
        }
        let orderId = Orders.insert(orderParamsDealed);
        for(const shopId in shopProducts){//把这个订单拆分给各个店铺
            if(shopProducts.hasOwnProperty(shopId)){
                let shopOrder = {};
                let products = [];
                let productIds = [];
                let totalAmount = 0;
                let productCounts = {};

                for (let index = 0; index < shopProducts[shopId].length; index++) {
                    const productIndex = shopProducts[shopId][index];
                    products.push(orderParams.products[productIndex]);
                    productIds.push(orderParams.productIds[productIndex]);
                    totalAmount += orderParams.products[productIndex].endPrice;
                    productCounts[productIds[productIndex]] =
                    orderParams.productCounts[productIds[productIndex]];

                }
                shopOrder = {
                    products,
                    productIds,
                    productCounts,
                    totalAmount,
                    shopProducts,
                    userId: orderParams.userId,
                    contact: orderParams.contact,
                    orderId,
                    shopId,
                    appName
                };
                ShopOrders.insert({
                    ...shopOrder,
                    createdAt: new Date(),
                    orderCode: new Date().getTime().toString()+generateRondom(10).toString(),
                    status: "unconfirmed"
                });

                
            }
        }
        return {
            type: "orders",
            msg: orderId
        }
    }else{
        return {
            type: "error",
            reason: "NOT LOGIN"
        }
    }
}

export function getOneOrderById(loginToken, appName, orderId){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    if(validUserLogin(loginToken)){
        let order = Orders.findOne({_id: orderId})
        if (!order) {
            return {
                type: "error",
                msg: "ORDER NOT FOUND"
            }
        }
        return {
            type: "orders",
            msg: order
        }
    }else{
        return {
            type: "error",
            reason: "NOT LOGIN"
        }
    }
}

export function loadOneOrderById(loginToken, appName, orderId){
    return getUserInfo(loginToken, appName, "orders", function(){
        let order = Orders.findOne({_id: orderId});
        if(!order){
            return {
                type: "error",
                reason: "ORDER NOT FOUND"
            }

        }else{
            return {
                type: "orders",
                msg: order,
            }
        }
    });
}

export function loadMoneyPage(loginToken, appName, userId){
    return getUserInfo(loginToken, appName, "balances", function(params){
        let balance = Balances.findOne({userId});
        if(!balance){
           let balanceId = Balances.insert({
                userId,
                amount: 0,
                createdAt: new Date()
           })

           balance = Balances.findOne({_id: balanceId});

        }
        let balance_incomes = BalanceIncomes.find({userId},
            {skip: 0, limit: 5, sort: {createdAt: -1}});
        let balance_charges = BalanceCharges.find({userId},
            {skip: 0, limit: 5, sort: {createdAt: -1}});
        //数据结构兼容，之后可以删除
        let incomeNeedToUpdate = false;
        let agencies = [];
        let users = [];
        balance_incomes.forEach(income=>{
            if(!income.balanceId){
                BalanceIncomes.update(income._id, {
                    $set: {
                        balanceId: balance._id
                    }
                })
                incomeNeedToUpdate = true;
            }

            if(income.userId){
                users.push(Meteor.users.findOne({_id: income.userId}));
            }
            if(income.agency){

                let agency = Agencies.findOne({_id: income.agency});
                agencies.push(agency);
                let buyer = null;
                if(!agency){
                    return
                }
                if(agency.userId){
                    buyer= Meteor.users.findOne({_id: agency.userId});
                    users.push(buyer);

                }else{
                    buyer = Meteor.users.fondOne({name: 'wanchehui'})
                }
                let product = null;
                if(agency.productId){
                    product = Products.findOne({name_zh: "万人车汇黑卡"});
                }
                BalanceIncomes.update(income._id, {
                    $set: {
                        buyer,
                        product
                    }
                })
            }
        })
        if(incomeNeedToUpdate){
            balance_incomes = BalanceIncomes.find({balanceId},
                {skip: 0, limit: 5, sort: {createdAt: -1}});
        }

        //======================收入更新完毕
        //支出数据结构兼容
        let chargeNeedToUpdate = false;
        balance_charges.forEach(charge=>{
            if(!charge.balanceId){
                BalanceCharges.update(charge._id, {
                    $set: {
                        balanceId: balance._id
                    }
                })
                chargeNeedToUpdate = true;
            }
        });
        if(chargeNeedToUpdate){
            balance_charges = BalanceCharges.find({userId},
                {skip: 0, limit: 5, sort: {createdAt: -1}});
        }
        //======================支出更新完毕

        return {
            type: "balances",
            msg: {
                balance,
                balance_incomes: balance_incomes.fetch(),
                balance_charges: balance_charges.fetch(),
                agencies,
                users,
            }
        }


    });
}


export function withdrawMoney(loginToken, appName, userId, amount, bank, bankId){
    return getUserInfo(loginToken, appName, "balances", function(){
        let balance  = Balances.findOne({userId});
        if(!balance){
            return {
                type: "error",
                reason: "BALANCE NOT FOUND"
            }
        }
        let chargeId = BalanceCharges.insert({
          userId,
          text: "提现金额",
          money: amount*100,
          bankId,
          bank,
          balanceId: balance._id,
          status: "revoke",
          reasonType: "withdrawals",
          createdAt: new Date()
         });

         newTotalAmount = balance.amount;
         newTotalAmount = newTotalAmount - amount*100;
         Balances.update(balance._id, {
             $set: {
                 amount: newTotalAmount
             }
         })

         if(chargeId){
            return {
                type: "balances",
                msg: chargeId
            }
         }else{
             return {
                 type: "error",
                 msg: "INSERT BALANCEINCOME SOMEHOW"
             }
         }
    });
}

export function getUserBankcards(loginToken, appName, userId){
    return getUserInfo(loginToken, appName, "bankcards", function(){
        let bankcards = Bankcards.find({userId},{sort: {createdAt: -1}});
        return {
            type: "bankcards",
            msg: bankcards.fetch()
        }
    });
}

export function createBankcard(
    loginToken,
    appName,
    userId,
    realName,
    accountNumber,
    bankAddress){
    return getUserInfo(loginToken, appName, "bankcards", function(){
        let bankId = Bankcards.insert({
            userId,
            realName,
            accountNumber,
            bankAddress,
            createdAt: new Date()
        });
        if(bankId){
            return {
                type: "bankcards",
                msg: bankId
            }
        }else{
            return {
                type: "error",
                reason: "CREATE BANKCARD ERROR"
            }
        }

    }); 
}
export function removeBankcard(loginToken,appName,userId,bankcardId){
    return getUserInfo(loginToken, appName, "bankcards", function(){
        let bankcard = Bankcards.remove({_id: bankcardId})
        if(bankcard){
            let bankcards = Bankcards.find({userId}).fetch()
            return {
                type: "bankcards",
                msg: bankcards
            }
        }else {
            return {
                type: "error",
                reason: "CREATE BANKCARD ERROR"
            }
        }
    });
}

export function syncRemoteCartToLocal(loginToken, appName, userId, cartId){
    return getUserInfo(loginToken, appName, "app_carts", function(){
        let cart = AppCarts.findOne({_id: cartId, userId, orderStatus: "notFinish"});
        if(!cart){
            cart = AppCarts.findOne({userId, orderStatus: "notFinish"});
        }
        if(cart){
            return {
                type: "app_carts",
                msg: cart
            }
        }
        return {
            type: "error",
            reason: "CART NOT FOUND"
        }
    })
}


export function getWithdrawals(loginToken, appName, userId,  page, pagesize){
    return getUserInfo(loginToken, appName, "withdrawals", function(){
        let withdrawals = BalanceCharges.find({userId}, {
            skip: (page-1)* pagesize,
            limit: pagesize,
            sort: {
                createdAt: -1
            }
        });
        return {
            type:  "withdrawals",
            msg:  withdrawals.fetch(),
        }
    });
    
}



export function syncLocalCartToRemote(loginToken, appName, cartId, cartParams){
    return getUserInfo(loginToken, appName, "app_carts", function(){
        let createNew = function(){

            let newCartId = AppCarts.insert({
                ...cartParams,
                createdAt: new Date()
            })
            if(!newCartId){
                return {
                    type: "error",
                    reason: "CREATE CART FAIL"
                }
            }else{
                return {
                   type: "app_carts",
                   msg: newCartId
                }
            }
        }
        let updateRlt = null;
        if(cartId){
            let cart = AppCarts.findOne({_id: cartId, orderStatus: "notFinish"});

            if(!cart){
                return createNew();
            }

            updateRlt = AppCarts.update(cartId, {
                $set: {
                    ...cartParams,
                }
            });
            if(!updateRlt){
                return {
                    type: "error",
                    reason: "UPDATE CART FAIL"
                }
            }
            return {
                type: "app_carts",
                msg: updateRlt,
            }
        }else{
          return createNew();
        }


    })
}

export function getUserDetailsById(loginToken, appName, userId){
    return getUserInfo(loginToken, appName, "users", function(){
        let user = Meteor.users.findOne({_id: userId});
        if(user){
            return {
                 type: "users",
                 msg: user
            }
        }else{
            return {
                type: "error",
                reason: "USER NOT FOUND"
            }
        }
    })
}

export function createUserContact(loginToken, appName, userId, contactParams){
    return getUserInfo(loginToken, appName, "user_contacts", function(){

        if(contactParams.default === true){
            //若是新的地址要社为默认，则用户其他地址就不是默认的
            let contacts = UserContacts.find({userId});
            contacts.forEach(contact=>{
                UserContacts.update(contact._id, {
                    $set: {
                        default: false,
                    }
                })
            })
        }
        let newContactId = UserContacts.insert({
            ...contactParams,
            userId,
            deleted: false,
            createdAt: new Date(),

        })
        return {
            type: "user_contact",
            msg: UserContacts.findOne({_id: newContactId})
        }
    });
}

export function getUserContacts(loginToken, appName, userId){
    return getUserInfo(loginToken, appName, "user_contacts", function(){
        let contacts = UserContacts.find({userId, deleted: false}, {sort: {
            createdAt: -1
        }}).fetch();
        return {
            type: "user_contact",
            msg: contacts
        }
    })
}

export function deleteUserContact(loginToken, appName, contactId){
    return getUserInfo(loginToken, appName, "user_contacts", function(){
        let delRlt = UserContacts.update(contactId, {
            $set: {
                deleted: true
            }
        })
        return {
            type: "user_contact",
            msg: delRlt
        }
    })
}

export function setUserContactDefatult(loginToken, appName, contactId){
    return getUserInfo(loginToken, appName, "user_contacts", function(){
        let contact = UserContacts.findOne({_id: contactId});
        if(contact.default){
            return {
                type: "user_contact",
                msg: contact._id,
            }
        }else{
            let contacts = UserContacts.find({userId});
            contacts.forEach(contact=>{
                UserContacts.update(contact._id, {
                    $set: {
                        default: false,
                    }
                })
            })
            let updateRlt = UserContacts.update(contactId, {
                $set: {
                    default: true
                }
            });
            return {
                type: "user_contact",
                msg: updateRlt
            }
        }
    })
}

export function getNewestOneUserOrderByStatus(loginToken, appName, status, userId){
    return getUserInfo(loginToken, appName, "orders", function(){
        let order = Orders.find({userId, status},{
            limit: 1,
            sort: {
                createdAt: -1
            }
        }).fetch()[0]
        if(!order){
            return {
                type: "error",
                reason: "ORDER NOT FOUND",
            }
        }
        return {
            type: "orders",
            msg: order
        }
    })
}

export function getNewestUserOrders(loginToken, appName, status, userId, page, pagesize){
    return getUserInfo(loginToken, appName, "orders", function(){
        let orders = Orders.find({userId, status},{
            skip: (page-1)*pagesize,
            limit: pageize,
            sort: {
                createdAt: -1
            }
        }).fetch()
        if(!orders || orders.lenght === 0){
            return {
                type: "error",
                reason: "ORDER NOT FOUND",
            }
        }
        return {
            type: "orders",
            msg: orders
        }
    })
}

export function getIncomeWithinTime(loginToken, appName, rangeLength, userId, unit){
    return getUserInfo(loginToken, appName, "balances", function(){
        let yestoday = moment().subtract(rangeLength, unit);
        yestoday = yestoday.toISOString();
        let yestodayInData = new Date(yestoday);
        let incomes = BalanceIncomes.find({createdAt: {'$gte':yestodayInData,'$lt':new Date()}, userId});
        let totalAmount = 0;
        incomes.forEach(income=>{
            totalAmount+=income.amount
        });
        return {
            type: "balances",
            msg: {
                incomes: incomes.fetch(),
                totalAmount,
                unit,
            }
        }
    })
}


export function getIncomes(loginToken, appName, userId, page, pagesize){
    return getUserInfo(loginToken, appName, "balances", function(){

        let incomes = BalanceIncomes.find({userId}, {
            skip: (page-1)*pagesize, limit: pagesize,
            sort: {createdAt: -1}});

        let users = [];
        incomes.forEach((income)=> {
            if(!income.user && income.userId){
                users.push(Meteor.users.findOne(income.userId));
            }
            if(income.user){
                users.push(user);
            }
        })
        if(incomes.count()===0){
            return {
                type: "balances",
                msg: {
                    incomes: incomes.fetch(),
                    count: incomes.count(),
                    users,
                }
            }
        }else{
            return {
                type: "balances",
                msg: {
                    incomes: incomes.fetch(),
                    count: incomes.count(),
                    users,
                }
            }

        }


    })
}


export function getOrders(loginToken, appName, userId, status, page, pagesize) {
    return getUserInfo(loginToken, appName, "orders", function(){
        let orders_confirmed = Orders.find({userId,status: "confirmed"}, {
            skip: (page-1)*pagesize, limit: pagesize, 
            sort: {createdAt: -1}}).fetch()
        let orders_cancel = Orders.find({userId,status: "cancel"}, {
            skip: (page-1)*pagesize, limit: pagesize, 
            sort: {createdAt: -1}}).fetch()
        let orders_paid = Orders.find({userId,status: "paid"}, {
            skip: (page-1)*pagesize, limit: pagesize, 
            sort: {createdAt: -1}}).fetch()
        let orders_recevied = Orders.find({userId,status: "recevied"}, {
            skip: (page-1)*pagesize, limit: pagesize, 
            sort: {createdAt: -1}}).fetch()
            return {
                type: "orders",
                msg: {
                    orders_confirmed,
                    orders_cancel,
                    orders_paid,
                    orders_recevied,
                }
            }
    })
}

export function cancelOrder(loginToken, appName, orderId,userId) {
    return  getUserInfo(loginToken, appName, "orders", function(){
        order = Orders.update(orderId,{
            $set:{
                status: 'cancel'
            }
        })
        if(!order || order.lenght === 0){
            return {
                type: "error",
                reason: "ORDER NOT FOUND",
            }
        }else{
            orders_confirmed = Orders.find({userId,status: "confirmed"}).fetch()
            return {
                type: "orders",
                msg: {
                    orders_confirmed
                }
            }
        }
        
       
    })
} 

export function receviedOrder(loginToken, appName, orderId) {
    return  getUserInfo(loginToken, appName, "orders", function(){
        order = Orders.update(orderId,{
            $set:{
                status: 'recevied'
            }
        })
        if(!order || order.lenght === 0){
            return {
                type: "error",
                reason: "ORDER NOT FOUND",
            }
        }
        return {
            type: "order",
            msg: order
        }
    })
}



export function getProductByShopId(appName, shopId, page, pagesize){

    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }
    let targetShopId = null;
    if(shopId === "000"){
        targetShopId = Shops.findOne({name: "万人车汇自营店"})._id;
    }

    let products = Products.find({shopId: targetShopId}, {
        skip: (page-1)*pagesize,
        limit: pagesize,
        sort: {
            createdAt: -1
        }
    });

    return {
        type: "products",
        msg: products.fetch()
    }
}

export function agencyOneProduct(loginToken, appName, product, userId, appNameShopId,shopId){
    return getUserInfo(loginToken, appName, "shops", function(){
        if(!product.shopId){
            return {
                type: "error",
                reason: "SERVICE ERROR"
            }
        }

        let shop = Shops.findOne({_id: product.shopId});
        if(!shop){
            return {
                type: "error",
                reason: "SERVICE ERROR"
            }
        }

        let user = Meteor.users.findOne(userId);

        if(!user){
            return {
                type: "error",
                reason: "USER NOT FOUND"
            }
        }


        let newShop = Shops.findOne({"acl.own.users": userId});
        let newShopId = null;
        if(!newShop){
            newShopId = Shops.insert({
                name: user.username+"的店铺",
                phone: user.profile.mobile,
                pictures: [],
                description: '欢迎光临'+user.username+"的店铺",
                tags: ["黑卡", "代理", "挣钱"],
                cover: user.headurl,
                address:'',
                lntAndLat:[],
                status: true,
                createdAt: new Date(),
                acl: {
                  own: {
                    roles: ["shop_owner"],
                    users: userId,
                  },
                  read: {
                    roles: ['nobody', 'login_user']
                  },
                  write: {
                    roles: ["shop_owner","shop_manager"],
                    users: [],
                  }
                }
              });
        }else{
            newShopId = newShop._id;
        }
        newShop = Shops.findOne(newShopId);

        let newProductParams = {};
        newProductParams = product;
        delete newProductParams._id;
        newProductParams.shopId = newShopId;
        newProductParams.createdAt = new Date();
        let newProductId
        let agencyProducts = Products.findOne({ name: newProductParams.name,shopId: newShopId})
        if(!agencyProducts){
            newProductId = Products.insert({
                ...newProductParams
            });
        }
        if(agencyProducts.isSale===false){
            newProductId = Products.update({"_id": agencyProducts._id},
                {
                    $set: {
                        "isSale": true
                    }
                }
            )
        }
        //标记被代理的商品
        let agencies = product.agencies;
        if(!agencies){
            agencies = [];
        }
        let agencyShops = product.agencyShops;
        if(!agencyShops){
            agencyShops = [];
        }
        if(!agencies.includes(userId)){
            agencies.push(userId);
        }
        if(!agencyShops.includes(newShop._id)){
            agencyShops.push(newShop._id);
        }

        let updateRlt = Products.update(product._id, {
            $set: {
                agencies,
                agencyShops,
            }
        })
        if(!newProductId){
            return {
                type: "error",
                reason: "product existed"
            }
        }

        return {
            type: "shops",
            msg: {
                newProductId,
                newShopId
            }
        }





    });
}


export function getProductOwners(loginToken, appName, userId){
    return getUserInfo(loginToken, appName, "product_owners", function(){
        let cursor = ProductOwners.find({userId});
        return {
            type: "product_owners",
            msg: cursor.fetch(),
        }

    });

}

export function agencyProducts(loginToken, appName, shopId) {
    return getUserInfo(loginToken, appName,shopId, function(){
        let products = Products.find({ shopId }).fetch()
        return {
            type: "products",
            msg: {
                products
            }
        }

    });
}



export function getShopProducts(loginToken,appName, shopId, page, pagesize){
    if(!findOneAppByName(appName)){
        return {
            type: "error",
            reason: "invalid app"
        }
    }

    let shop = Shops.findOne({_id: shopId})
    let products = Products.find({$nor: [{productClass: "advanced_card"}],shopId: shopId,isSale: true}, {
        skip: (page-1)*pagesize,
        limit: pagesize,
        sort: {
            createdAt: -1
        }
    }).fetch();

  

    return {
        type: "shops",
        msg: {
            shop,
            products,
            page
        }
    }
}

export function getUserShopPerminssion(userId) {
  
    let shop = Shops.findOne({"acl.own.users": userId})
    return shop
}

// export function cancelAgencyProduct(loginToken,appName, productId,shopId){
    
    
// }
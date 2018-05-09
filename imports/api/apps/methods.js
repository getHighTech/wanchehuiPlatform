import { Meteor } from 'meteor/meteor';

import {Products} from '../products/products';
import { findOneAppByName, getOneProduct, appLoginUser, syncUser, createNewOrder, loadOneOrderById, loadMoneyPage, withdrawMoney, getUserBankcards, createBankcard, syncRemoteCartToLocal, syncLocalCartToRemote, getUserDetailsById, updateOrder, createUserContact, getUserContacts, deleteUserContact, setUserContactDefatult, getNewestOneUserOrderByStatus } from './apps';

Meteor.methods({
    'wanrenchehui.temp.home'(loginToken, appName){
        //临时的万人车汇项目首页，以后此接口将会被废止

        if(!findOneAppByName(appName)){
            return {
                type: "error",
                reason: "invalid app"
            }
        }
        let products = Products.find({name_zh: {$in: ["万人车汇黑卡", "VIRIDI"]}}).fetch();
        return {
            type: "products", 
            msg: products,
            fromMethod: "wanrenchehui.temp.home",
        }
    },

    "app.syncRemote.user"(loginToken, appName, userId){
        //同步用户信息
        let stampedTokenObj = JSON.parse(loginToken);
        return Object.assign({}, syncUser(userId, stampedTokenObj, appName), {
            fromMethod: "app.syncRemote.user"
        })
    },

    "app.user.login"(loginToken, appName, type, loginParams){
        //用户登陆
        let rlt = appLoginUser(type, loginParams, appName);
        return Object.assign({}, rlt, {
            fromMethod: "app.user.login"
        })
    },

    'app.load.app.info'(loginToken, appName){
        //载入应用信息
        let app = findOneAppByName(appName);
        if(!app){
            return {
                type: "error",
                reason: "invalid app",
                fromMethod: "app.load.app.info"
            }
        }else{
            return {
                type: 'app',
                msg: app,
                fromMethod: "app.load.app.info"
            }
        }
    },

    "app.get.one.product.id"(loginToken, appName, productId){
        //载入商品信息
        let productMsg = getOneProduct(null, appName, {_id: productId});
        return Object.assign({}, productMsg, {
            fromMethod: "app.get.one.product.id"
        })
    },
    'app.get.one.product.rolename'(loginToken, appName, roleName){
        //载入道具类别商品
        let productMsg = getOneProduct(null, appName, {roleName});
        return Object.assign({}, productMsg, {
            fromMethod: 'app.get.one.product.rolename'
        })
    },
    'app.get.phonesms'(mobile, appName) {
        //验证码短信
        if(!findOneAppByName(appName)){
            return {
                type: "error",
                reason: "invalid app",
                fromMethod: 'app.get.phonesms'
            }
        }
        let apikey = "11bd70b637fe474bcb617e691a5fba3d";
        let num="";
          for(let i=0;i<4;i++)
          {
              num+=Math.floor(Math.random()*10);
          }
        let text = "【万车汇网】欢迎使用万车汇，您的手机验证码是"+num+"。本条信息无需回复";
        let uri = "https://sms.yunpian.com/v2/sms/single_send.json";
        let res = null
          try{
            res = HTTP.call(
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
          }catch(ex){
            console.log("返回的错误", ex.message);
          }
      
        if(res===null){
            return {
                type: "error",
                reason: "GET SMS TOO OFTEN",
                fromMethod: 'app.get.phonesms'
            };
        }
      
      return {
        type: "SMS",
        msg: num,
        fromMethod: 'app.get.phonesms'
      };
    },

    "app.create.order"(loginToken, appName, orderParams){
        //创建新的订单
        let stampedTokenObj = JSON.parse(loginToken);
        return Object.assign({}, createNewOrder(stampedTokenObj, appName, orderParams), {
            fromMethod:  "app.create.order"
        })
    },

    "app.load.one.order"(loginToken, appName, orderId){
        //获取一张订单
        let stampedTokenObj = JSON.parse(loginToken);
        let rltObj = loadOneOrderById(stampedTokenObj, appName, orderId);
        return Object.assign({}, rltObj, {
            fromMethod: "app.load.one.order"
        });
    },
    "app.load.money.page"(loginToken, appName, userId){
        let stampedTokenObj = JSON.parse(loginToken);
        let rltObj = loadMoneyPage(stampedTokenObj, appName, userId);
        return Object.assign({}, rltObj, {
            fromMethod: "app.load.money.page"
        });
    },
    "app.withdraw.money"(loginToken, appName, userId, amount, bankId){
        let stampedTokenObj = JSON.parse(loginToken);
        let rltObj = withdrawMoney(stampedTokenObj, appName, userId, amount, bankId);
        return Object.assign({}, state, {
            fromMethod: "app.withdraw.money"
        })
    },

    "app.get.user.bankcards"(loginToken, appName, userId){
        let stampedTokenObj = JSON.parse(loginToken);
        let rltObj = getUserBankcards(stampedTokenObj, appName, userId);
        return Object.assign({}, rltObj, {
            fromMethod: "app.get.user.bankcards"
        });
        
    },
    "app.user.create.bankcard"(
        loginToken, 
        appName,
        userId, 
        realName,
        accountNumber,
        bankAddress){
            let stampedTokenObj = JSON.parse(loginToken);
            
            let rltObj = createBankcard(
                stampedTokenObj, 
                appName,
                userId, 
                realName,
                accountNumber,
                bankAddress);
            return Object.assign({}, rltObj, {
                fromMethod: "app.user.create.bankcard"
            })
        },

        "app.sync.remote.cart.local"(loginToken, appName, cartId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = syncRemoteCartToLocal(stampedTokenObj, appName, cartId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.sync.remote.cart.local"
            });
        },
        "app.sync.local.cart.remote"(loginToken, appName, cartId, cartParams){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = syncLocalCartToRemote(stampedTokenObj, appName, cartId, cartParams);
            return Object.assign({}, rltObj, {
                fromMethod: "app.sync.local.cart.remote"
            })
        },
        "app.get.user.details"(loginToken, appName, userId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getUserDetailsById(stampedTokenObj, appName, userId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.user.details"
            })
        },
        "app.update.order"(loginToken, appName, orderParams, orderId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = updateOrder(stampedTokenObj, orderParams, orderId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.update.order"
            })
        },
        "app.create.user.contact"(loginToken, appName, userId, contactParams){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = createUserContact(stampedTokenObj, appName, userId, contactParams);
            return Object.assign({}, rltObj, {
                fromMethod: "app.create.user.contact"
            })
        },
        "app.get.user.contacts"(loginToken, appName, userId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getUserContacts(stampedTokenObj, appName, userId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.user.contacts"
            })
        },
        "app.delete.user.contact"(loginToken, appName, contactId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = deleteUserContact(stampedTokenObj,appName, contactId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.delete.user.contact"
            })
        },
        "app.set.user.contact,default"(loginToken, appName, contactId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = setUserContactDefatult(stampedTokenObj,appName, contactId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.set.user.contact,default"
            })
        },
        "app.get.newest.user.order.status"(loginToken, appName, status, userId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getNewestOneUserOrderByStatus(stampedTokenObj, status, userId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.newest.user.order.status"
            })
        }

});
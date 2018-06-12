import { Meteor } from 'meteor/meteor';

import {Products} from '../products/products';
import { 
    findOneAppByName,
     getOneProduct,
    appLoginUser, 
    syncUser, 
    createNewOrder, 
    loadOneOrderById,
    getIncomes, 
    loadMoneyPage, 
    withdrawMoney, 
    getUserBankcards, 
    createBankcard, 
    removeBankcard,
    syncRemoteCartToLocal, 
    syncLocalCartToRemote, 
    getUserDetailsById, updateOrder, 
    createUserContact, getUserContacts, 
    deleteUserContact, setUserContactDefatult, 
    getNewestOneUserOrderByStatus, getIncomeWithinTime, 
    getProductByShopId, agencyOneProduct, getProductOwners, getWithdrawals } from './apps';

Meteor.methods({
    'wanrenchehui.temp.home'(loginToken, appName){
        //临时的万人车汇项目首页，以后此接口将会被废止

        if(!findOneAppByName(appName)){
            return {
                type: "error",
                reason: "invalid app"
            }
        }
        let products = Products.find({isSale: true}).fetch();
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
        //创建新的订单
        console.log("loginToken", loginToken)
        let stampedTokenObj = JSON.parse(loginToken);
        return Object.assign({}, getOneProduct(stampedTokenObj, appName, productId), {
            fromMethod:  "app.get.one.product.id"
        })
       
    },
    'app.get.one.product.rolename'(loginToken, appName, roleName){
        //载入道具类别商品
        let stampedTokenObj = JSON.parse(loginToken);
        return Object.assign({}, getOneProduct(stampedTokenObj, appName, roleName), {
            fromMethod:  "app.get.one.product.rolename"
        })
    },
    'app.get.phonesms'(loginToken, appName, mobile) {
        
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
    "app.withdraw.money"(loginToken, appName, userId, amount, bank, bankId){
        let stampedTokenObj = JSON.parse(loginToken);
        let rltObj = withdrawMoney(stampedTokenObj, appName, userId, amount, bank, bankId);
        return Object.assign({}, rltObj, {
            fromMethod: "app.withdraw.money"
        })
    },
    //获取银行卡列表
    "app.get.user.bankcards"(loginToken, appName, userId){
        console.log(userId);
        
        let stampedTokenObj = JSON.parse(loginToken);
        let rltObj = getUserBankcards(stampedTokenObj, appName, userId);
        return Object.assign({}, rltObj, {
            fromMethod: "app.get.user.bankcards"
        });
        
    },
    //插入银行卡
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
    //删除银行卡
    'app.user.remove.bankcard'(loginToken,appName,bankcardId){
        let stampedTokenObj = JSON.parse(loginToken);
        let rltObj = removeBankcard(loginToken,appName,bankcardId)
        return Object.assign({},rltObj,{
            fromMethod:"app.user.remove.bankcard"
        })
    },

        "app.sync.remote.cart.local"(loginToken, appName,userId, cartId){
            
            let stampedTokenObj = JSON.parse(loginToken);
            
            let rltObj = syncRemoteCartToLocal(stampedTokenObj, appName, userId, cartId);
            
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
            let rltObj = updateOrder(stampedTokenObj,appName, orderParams, orderId);
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
            let rltObj = getNewestOneUserOrderByStatus(stampedTokenObj,appName, status, userId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.newest.user.order.status"
            })
        },
        'app.get.incomes.time.range'(loginToken, appName, rangeLength, userId, unit){
            
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getIncomeWithinTime(stampedTokenObj, appName, rangeLength, userId, unit);
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.incomes.time.range"
            })
        },
        'app.get.incomes.limit'(loginToken, appName,userId, page,pagesize){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getIncomes(stampedTokenObj, appName, userId, page, pagesize);
            
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.incomes.limit"
            })
        },
        //获取店铺商品
        'app.get.products.shop.limit'(loginToken, appName, shopId, page, pagesize){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getProductByShopId(appName, shopId, page, pagesize);
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.products.shop.limit"
            })

        },
        'app.agency.one.product'(loginToken, appName, product, userId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = agencyOneProduct(stampedTokenObj, appName, product, userId);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.agency.one.product'
            })
        }, 

        'app.get.product.owners'(loginToken, appName, userId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getProductOwners(stampedTokenObj, appName, userId);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.get.product.owners'
            })
        },
        "app.get.user.withdrawals.limit"(loginToken, appName, userId,  page,  pagesize){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getWithdrawals(stampedTokenObj, appName, userId, page, pagesize);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.get.user.withdrawals.limit',
            })
        }
});
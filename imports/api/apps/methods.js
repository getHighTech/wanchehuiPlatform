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
    getUserDetailsById,
    updateOrder,
    createUserContact, getUserContacts,
    deleteUserContact, setUserContactDefatult,
    getNewestOneUserOrderByStatus, getIncomeWithinTime,
    getProductByShopId, agencyOneProduct, getProductOwners, getWithdrawals,
    cancelOrder,
    collectOrder,
    getOrders,
    getShopProducts,
    getHomePageProducts,
    getAppNameProducts,
    agencyProducts,
    getMyTeam,
    cancelAgencyProduct,
    changePasswordAccount,
} from './apps';

Meteor.methods({



    'wanrenchehui.temp.home'(loginToken, appName){
        //临时的万人车汇项目首页，以后此接口将会被废止
        if(!findOneAppByName(appName)){
            return {
                type: "error",
                reason: "invalid app"
            }
        }
        let rltObj = getHomePageProducts(appName);
        return Object.assign({}, rltObj, {
            fromMethod: 'wanrenchehui.temp.home',
        })
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
        let stampedTokenObj = JSON.parse(loginToken);
        return Object.assign({}, getOneProduct(stampedTokenObj, appName, productId), {
            fromMethod:  "app.get.one.product.id"
        })

    },
    'app.get.one.product.rolename'(loginToken, appName, roleName,shopId){
        //载入道具类别商品
        let stampedTokenObj = JSON.parse(loginToken);
        return Object.assign({}, getOneProduct(stampedTokenObj, appName, roleName,shopId), {
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
        console.log(appName);
        
        let apikey = "11bd70b637fe474bcb617e691a5fba3d";
        if(appName == "xianzhi"){
            apikey = "05856ec439f15fa13b935f89988cf4d2";
        }
        let num="";
          for(let i=0;i<4;i++)
          {
              num+=Math.floor(Math.random()*10);
          }
        let text = "【万车汇网】欢迎使用万车汇，您的手机验证码是"+num+"。本条信息无需回复";
        if(appName === "xianzhi"){
            text = "【鲜至臻品】感谢使用鲜至臻品，您的验证码是"+num+"，让我们一起开启寻臻之旅。如非本人操作，请忽略本短信。"
        }
        
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
    'app.user.remove.bankcardpp.user.remove.bankcard'(loginToken,appName,userId,bankcardId){
        let stampedTokenObj = JSON.parse(loginToken);
        let rltObj = removeBankcard(stampedTokenObj,appName,userId,bankcardId)
        return Object.assign({},rltObj,{
            fromMethod:"app.user.remove.bankcardpp.user.remove.bankcard"
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
        'app.get.orders.limit'(loginToken,appName,userId,status, page, pagesize) {
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getOrders(stampedTokenObj, appName, userId,status, page, pagesize);
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.orders.limit"
            })
        },
        'app.cancel.one.order'(loginToken,appName,orderId,userId) {
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = cancelOrder(stampedTokenObj, appName,orderId,userId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.cancel.one.order"
            })
        },
        'app.collect.one.order'(loginToken,appName,orderId,userId) {
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = collectOrder(stampedTokenObj, appName,orderId,userId);
            return Object.assign({}, rltObj, {
                fromMethod: "app.collect.one.order"
            })
        },
        'get.agency_relation.my.teams'(loginToken,appName,userId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getMyTeam(stampedTokenObj, appName,userId);
            console.log(rltObj);
            Object.assign({}, rltObj, {
                fromMethod: "get.agency_relation.my.teams"
            })
        },
        'app.recevied.one.order'(loginToken,appName,orderId) {
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = receviedOrder(stampedTokenObj, appName,orderId);
            Object.assign({}, rltObj, {
                fromMethod: "app.recevied.one.order"
            })
        },
        //获取店铺商品
        'app.get.products.shop.limit'(loginToken, appName){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getAppNameProducts(appName);
            return Object.assign({}, rltObj, {
                fromMethod: "app.get.products.shop.limit"
            })

        },
        'app.agency.one.product'(loginToken, appName, product, userId,appNameShopId,shopId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = agencyOneProduct(stampedTokenObj, appName, product, userId,appNameShopId,shopId);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.agency.one.product'
            })
        },
        'app.agency.products'(loginToken, appName, shopId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = agencyProducts(stampedTokenObj, appName,shopId);
            console.log(rltObj);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.agency.products'
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
        },
        "app.get.shop.products.limit"(loginToken, appName, shopId,  page,  pagesize){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getShopProducts(stampedTokenObj, appName, shopId, page, pagesize);
            console.log(rltObj);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.get.shop.products.limit',
            })
        },
        "app.get.user.shop.perminssion"(loginToken, appName, userId){
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = getUserShopPerminssion(stampedTokenObj, appName, userId);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.get.user.shop.perminssion'
            })
        },

        "app.cancel.agency.product"(loginToken, appName, productId,shopId){
            console.log(`来取消了`)
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = cancelAgencyProduct(stampedTokenObj, appName, productId,shopId);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.cancel.agency.product'
            })
        },
        "app.change.password"(loginToken, appName, userId, password, newPassword){
            console.log(`userId: ${userId},password: ${password},newPassword: ${newPassword}`)
            let stampedTokenObj = JSON.parse(loginToken);
            let rltObj = changePasswordAccount(stampedTokenObj, appName, userId, password, newPassword);
            return Object.assign({}, rltObj, {
                fromMethod: 'app.change.password'
            })
        },
});

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import { ProductOwners } from './product_owners.js';
import { Products } from '../products/products.js';
import { AgencyRelation} from '../agency_relation/agency_relation.js'
import { ShopOrders} from '../shop_orders/shop_orders.js'
import {Shops} from '../shops/shops.js'
import { BalanceIncomes} from '../balances/balance_incomes.js'
import { BalanceCharges } from '../balances/balance_charges.js'
import { Balances } from '../balances/balances.js'


import { validLoginToken } from '../actions/validLoginToken.js';

Meteor.methods({

    "get.user.product.card"(userId, token){
        if(!token){
            return "ACCESS DENY";
        }
        if(validLoginToken(token)){
            let productIds = []
            ProductOwners.find({userId}).forEach(item=>{ 
                productIds.push(item.productId);
            });
            let product = Products.findOne({_id: {$in: productIds}, name_zh: "万人车汇黑卡"});
            return product;
        }else{
            return "ACCESS DENY";
        }
    },
    "get.advancedCard.product.users"(productId, page = 1, pageSize = 5){
        let userIds = []
        ProductOwners.find({ productId }).forEach(item => {
            userIds.push(item.userId);
        });
        let users = Meteor.users.find({ _id: { $in: userIds } }, {
            skip: (page - 1) * pageSize, limit: pageSize,
            sort: { "createdAt": -1 },
        }).fetch();
        return users;
    },
    "get.commonCard.product.users"(productId, page = 1, pageSize = 5) {
        let userIds = []
        ProductOwners.find({ productId }).forEach(item => {
            userIds.push(item.userId);
            console.log(item.userId)
        });
        let users = Meteor.users.find({ _id: { $in: userIds } }, {
            skip: (page - 1) * pageSize, limit: pageSize,
            sort: { "createdAt": -1 },
        }).fetch();
        let datas =[]
        users.forEach((item) => {
            let data = {}
            let superior = '没有上级'
            let orders_count = 0
            let all_income = 0
            let withdraw_count = 0
            let balance = 0
            //-------------查询上级--------------//
            let agency_relation = AgencyRelation.findOne({ userId: item._id, status: true })
            if (agency_relation) {
                let record = Meteor.users.findOne({ _id: agency_relation.SuserId })
                if (record) {
                    superior = record.username
                }
            }

            //-------------计算总订单数量--------------//
            let shop = Shops.findOne({ "acl.own.users": item._id });
            if(shop){
                orders_count = ShopOrders.find({ shopId: shop._id}).count()
            }
            //-------------计算总收入--------------//
            let income_records = BalanceIncomes.find({userId:item._id}).fetch()
            if (income_records.length > 0){
                income_records.forEach(item => {
                    all_income += item.amount
                })
            }
            //-------------计算总体现金额--------------//
            let charge_records = BalanceCharges.find({ userId: item._id }).fetch()
            if (charge_records.length > 0) {
                charge_records.forEach(item => {
                    withdraw_count += item.money
                })
            }
            //-------------计算账户余额金额--------------//
            let balance_records = Balances.find({ userId: item._id }).fetch()
            if (balance_records.length > 0) {
                balance_records.forEach(item => {
                    balance += item.amount
                })
            }
            for (var i in item) {
                data[i] = item[i]; //深拷贝并且加入新的参数
                data['superior'] = superior
                data['orders_count'] = orders_count
                data['all_income'] = all_income
                data['withdraw_count'] = withdraw_count
                data['balance'] = balance
            }
            datas.push(data)
        });
     
        return datas;
    },
    'get.procductOwner.record.byUserId'(userId,product){
        let record = ProductOwners.findOne({ 'userId': userId, 'productId': product._id})
        if (record){
            return record
        }
        else{
            throw new Meteor.Error("未知错误");
        }
    },
    "get.vips.count"(productId){
        return ProductOwners.find({ productId }).count()
    },
});
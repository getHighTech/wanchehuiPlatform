import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import { ProductOwners } from './product_owners.js';
import { Products } from '../products/products.js';
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
    "get.card.product.users"(productId, page = 1, pageSize = 5){
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
    'get.procductOwner.record.byUserId'(userId,product){
        let record = ProductOwners.findOne({ 'userId': userId, 'productId': product._id})
        if (record){
            return record
        }
        else{
            throw new Meteor.Error("未知错误");
        }
    }
});
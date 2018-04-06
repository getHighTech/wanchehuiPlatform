import { Meteor } from 'meteor/meteor';

import {Products} from '../products/products';
import { findOneAppByName, getOneProduct } from './apps';

Meteor.methods({
    'wanrenchehui.temp.home'(appName){
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

    'app.load.app.info'(appName){
        
        let app = findOneAppByName(appName);
        if(!app){
            return {
                type: "error",
                reason: "invalid app"
            }
        }else{
            return {
                type: 'app',
                msg: app,
                fromMethod: "app.load.app.info"
            }
        }
    },

    "app.get.one.product.id"(productId, appName){
        
        let productMsg = getOneProduct(null, appName, {_id: productId});
        return Object.assign({}, productMsg, {
            fromMethod: "app.get.one.product.id"
        })
    }
});
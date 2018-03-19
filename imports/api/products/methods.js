import { Meteor } from 'meteor/meteor';
import {Roles} from '../roles/roles.js'
import { Products } from './products.js';
import { Shops } from '../shops/shops.js';
import {getProductTypeById} from './actions.js';
import { validLoginToken } from '../actions/validLoginToken.js'


Meteor.methods({
  "products.insert"(product,shopId){
    if(product.isTool){

    }
    Products.insert({
      name: product.name,
      name_zh:product.name_zh,
      price: product.price,
      description: product.description,
      brief:product.brief,
      cover:product.cover,
      createdByUserId: product.createdByUserId,
      endPrice:product.endPrice,
      curency:product.curency,
      isTool:product.isTool,
      roleName:product.roleName,
      categoryld:product.categoryld,
      images: product.images,
      isSale: true,
      shopId:shopId,
      specifications:product.specifications,
      createdByUserId:"dadad",
      curency:'cny',
      recommend:product.recommend,
      agencyLevelCount: 2,//eg: 2
      agencyLevelPrices: [3880, 1280],
      createdAt : new Date(),
      acl: {
        own: {
          roles: ["shop_owner"],
          users: [],
        },
        read: {
          roles: ['nobody', 'login_user']
        },
        write: {
          roles: ["shop_owner","shop_manager"],
          users: [],
        }
      },
    },function (err,alt) {
      if(!err){
        if(product.isTool){
          console.log('yesyes');
          let roles_name_count =Roles.find({name:product.name+'_holder'}).count();
          if(roles_name_count===0){
            Roles.insert({
              name:product.name+'_holder',
              name_zh:product.name_zh,
              time_limit:-1,
              permissions:{},
              state:true,
              weight:0,
              createdAt : new Date(),
              isSuper: false,
              users:[]
            })
          }
        }
        else {
          console.log('nono');
        }

      }

    });
  },
  'product.isSale'(_id){
    let Product = Products.findOne({_id:_id})
    Products.update(_id, {
      $set: {
        isSale: !Product.isSale,
      }
    });
    return Product
  },
  'product.offline'(id){
    Products.update(id, {
      $set: {
        onLine: false,
      }
    });
  },
  'product.descount'(id, discount){
    Products.update(id, {
      $set: {
        onLine: discount,
      }
    });
  },
  'product.edit'(product){
    Products.update({
      $set: {
        name: product.name,
        price: product.price,
        discount: product.discount,
        descirption: product.descirption,
        image_des: product.image_des,
        images: product.images,
        onLine: product.onLine,
      }
    });
  },
  'get.product.id'(productId){
    return getProductTypeById(productId);
  },
  'get.product.byShopId'(id){
    return Products.find({shopId:id}).fetch();
  },
  'get.oneproduct.id'(id,token){
    console.log(`打印token`)
    console.log(token)
      let product =  Products.findOne({_id:id});
      console.log(`产品`)
      console.log(product)
      let shop = Shops.findOne({_id: product.shopId});
      console.log(shop.name)
      return {
        ...product,
        shop_name: shop.name,
        formMethod: 'get.oneproduct.id'
      }
   
    // Object.assign(product,{shop_name: shop.name})
  },
  'product.update'(old,product){
    Products.update(old,{
      $set:{
        name: product.name,
        name_zh:product.name_zh,
        price: product.price,
        description: product.description,
        brief:product.brief,
        image_des: product.image_des,
        images: product.images,
        isSale: product.isSale,
        cover:product.cover,
        endPrice:product.endPrice,
        isTool:product.isTool,
        recommend:product.recommend,
        status:product.status,
        specifications:product.specifications
      }
    })
  },
  'app.get.recommend.products'(page,pagesize){
    let products =  Products.find(
      {
        recommend: true,
        isSale: true
      },
      { 
        skip: (page-1)*pagesize, 
        limit: pagesize, 
        sort: {createdAt: -1},
        fields:
              {
                name: 1,
                name_zh: 1,
                price: 1,
                createdAt: 1,
                isTool: 1,
                endPrice: 1,
                images: 1,
                cover: 1
              }
      },

    ).fetch()
    return {
      list: [...products],
      formMethod: 'app.get.recommend.products'
    }

  },
  'app.get.shop.products'(shopId) {
    let products = Products.find(
      {
        shopId: shopId,
        isSale: true,
      }
      ).fetch()
    console.log(products);
    return {
      list: [...products],
      formMethod: 'app.get.shop.products'
    }
  },
  'home.top.products'(page, pagesize) {
   let  products = Products.find(
      {recommendLevel: {$lte: 0}},
      {skip: (page-1)*pagesize, limit: pagesize, sort: {createdAt: -1}}
    ).fetch()
    return {
        list: [...products],
        formMethod: 'home.top.products'
      }
  },
   

});

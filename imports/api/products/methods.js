import { Meteor } from 'meteor/meteor';
import {Roles} from '../roles/roles.js'
import { Products } from './products.js';
import { UserRoles } from '../user_roles/user_roles.js';
import { Shops } from '../shops/shops.js';
import {ProductOwners} from '../product_owners/product_owners';
import {getProductTypeById, getProductByZhName} from './actions.js';

Meteor.methods({
  "products.insert"(product,shopId,shopName,newSpec,newSpecGroups,userId){
    let copy_roles = []
    let advanced_card = Products.findOne({ shopId: shopId, productClass: 'advanced_card', isDelete: { $exists: false }})
    let common_card = Products.findOne({ shopId: shopId, productClass: 'common_card',isDelete: { $exists: false } })
    if (advanced_card){
      copy_roles.push(advanced_card.name + '_holder')
    }
    if (common_card) {
      copy_roles.push(common_card.name + '_holder')
    }
    if (product.productClass === 'common_card') {
      if (common_card) {
        throw new Meteor.Error('普通会员卡已经存在，不允许重复添加')
      } else {
        Products.insert({
          name: product.name,
          name_zh: product.name_zh,
          sales_volume: product.sales_volume,
          price: 0,
          description: product.description,
          brief: product.brief,
          cover: product.cover,
          detailsImage: product.detailsImage,
          createdByUserId: userId,
          endPrice: 0,
          curency: product.curency,
          isTool: product.isTool,
          isAppointment: product.isAppointment,
          roleName: product.roleName,
          categoryld: product.categoryld,
          images: product.images,
          isSale: false,
          shopId: shopId,
          productClass: product.productClass,
          shopName: shopName,
          parameterlist: product.parameterlist,
          specName: product.spec_name,
          specifications: newSpec,
          newSpecGroups: newSpecGroups,
          curency: 'cny',
          recommend: product.recommend,
          agencyLevelCount: 2,//eg: 2
          agencyLevelPrices: product.agencyPrice,
          createdAt: new Date(),
          acl: {
            own: {
              roles: ["shop_owner"],
              users: [],
            },
            read: {
              roles: ['nobody', 'login_user']
            },
            write: {
              roles: ["shop_owner", "shop_manager"],
              users: [],
            },
            copy: {
              roles: copy_roles,
              users: []
            },
            buy: {
              roles: ['login_user']
            }
          },
        }, function (err, alt) {
          if (!err) {
            if (product.isTool) {
              let roles_name_count = Roles.find({ name: product.name + '_holder' }).count();
              if (roles_name_count === 0) {
                Roles.insert({
                  name: product.name + '_holder',
                  name_zh: product.name_zh,
                  time_limit: -1,
                  permissions: {},
                  state: true,
                  weight: 0,
                  createdAt: new Date(),
                  isSuper: false,
                  users: []
                })
              }
            }
          }
        });
      }
    } else if (product.productClass === 'advanced_card') {
      if (advanced_card) {
        console.log(advanced_card)
        throw new Meteor.Error('高级会员卡已经存在，不允许重复添加')
      } else {
        Products.insert({
          name: product.name,
          name_zh: product.name_zh,
          sales_volume: product.sales_volume,
          price: 0,
          description: product.description,
          brief: product.brief,
          cover: product.cover,
          detailsImage: product.detailsImage,
          createdByUserId: userId,
          endPrice: 0,
          curency: product.curency,
          detailsImage: product.detailsImage,
          isTool: product.isTool,
          isAppointment: product.isAppointment,
          roleName: product.roleName,
          categoryld: product.categoryld,
          images: product.images,
          isSale: false,
          shopId: shopId,
          productClass: product.productClass,
          shopName: shopName,
          parameterlist: product.parameterlist,
          specName: product.spec_name,
          specifications: newSpec,
          newSpecGroups: newSpecGroups,
          curency: 'cny',
          recommend: product.recommend,
          agencyLevelCount: 2,//eg: 2
          agencyLevelPrices: product.agencyPrice,
          createdAt: new Date(),
          acl: {
            own: {
              roles: ["shop_owner"],
              users: [],
            },
            read: {
              roles: ['nobody', 'login_user']
            },
            write: {
              roles: ["shop_owner", "shop_manager"],
              users: [],
            },
            copy: {
              roles: copy_roles,
              users: []
            },
            buy: {
              roles: ['login_user']
            }
          },
        }, function (err, alt) {
          if (!err) {
            if (product.isTool) {
              let roles_name_count = Roles.find({ name: product.name + '_holder' }).count();
              if (roles_name_count === 0) {
                Roles.insert({
                  name: product.name + '_holder',
                  name_zh: product.name_zh,
                  time_limit: -1,
                  permissions: {},
                  state: true,
                  weight: 0,
                  createdAt: new Date(),
                  isSuper: false,
                  users: []
                })
              }
            }
          }
        });
      }
    } else {
      Products.insert({
        name: product.name,
        name_zh: product.name_zh,
        sales_volume: product.sales_volume,
        price: 0,
        description: product.description,
        brief: product.brief,
        cover: product.cover,
        detailsImage: product.detailsImage,
        createdByUserId: userId,
        endPrice: 0,
        curency: product.curency,
        detailsImage: product.detailsImage,
        isTool: product.isTool,
        isAppointment: product.isAppointment,
        roleName: product.roleName,
        categoryld: product.categoryld,
        images: product.images,
        isSale: false,
        shopId: shopId,
        productClass: product.productClass,
        shopName: shopName,
        parameterlist: product.parameterlist,
        specName: product.spec_name,
        specifications: newSpec,
        newSpecGroups: newSpecGroups,
        curency: 'cny',
        recommend: product.recommend,
        agencyLevelCount: 2,//eg: 2
        agencyLevelPrices: product.agencyPrice,
        createdAt: new Date(),
        acl: {
          own: {
            roles: ["shop_owner"],
            users: [],
          },
          read: {
            roles: ['nobody', 'login_user']
          },
          write: {
            roles: ["shop_owner", "shop_manager"],
            users: [],
          },
          copy: {
            roles: copy_roles,
            users: []
          },
          buy: {
            roles: ['login_user']
          }
        },
      }, function (err, alt) {
        if (!err) {
          if (product.isTool) {
            let roles_name_count = Roles.find({ name: product.name + '_holder' }).count();
            if (roles_name_count === 0) {
              Roles.insert({
                name: product.name + '_holder',
                name_zh: product.name_zh,
                time_limit: -1,
                permissions: {},
                state: true,
                weight: 0,
                createdAt: new Date(),
                isSuper: false,
                users: []
              })
            }
          }
          else {
          }

        }
      });
    }
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

  'product.isSaleFalse'(_id){
    let Product = Products.findOne({_id:_id})
    Products.update(_id, {
      $set: {
        isSale: false,
      }
    });
    return Product
  },

  'product.price'(_id){
    let price = Products.findOne({_id:_id}).price;
    return price
  },

  'product.updatePrice'(id,price,endPrice){
    Products.update(id,{
      $set:{
        price:price,
        endPrice:endPrice
      }
    })
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
        sales_volume: product.sales_volume,
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
    return Products.find({ shopId: id, isDelete: { $exists: false } }).fetch();
  },
  'product.delete'(id){
    Products.update(id,{
      $set: {
        isDelete:true
      }
    },function(err,rlt){
      if(!err){
        return
      }else{
        throw new Meteor.Error("删除失败，请联系管理员")
      }
    });
  },
  'get.product.byShopIdOr'(condition){
    let products =  Products.find(condition).fetch();
    return products
  },
  'get.product.vipcard.byShopId'(condition) {
    let card = Products.findOne(condition)
    return card
  },
  'get.oneproduct.id'(id,token){
      let product =  Products.findOne({_id:id});
      let shop = Shops.findOne({_id: product.shopId});
      return {
        ...product,
        shop_name: shop.name,
        shop_address: shop.address,
        shop_cover: shop.cover,
        formMethod: 'get.oneproduct.id'
      }

    // Object.assign(product,{shop_name: shop.name})
  },

  'product.update'(old,product){
        Products.update({ _id: old._id }, {
          $set: {
            name: product.name,
            name_zh: product.name_zh,
            price: product.price,
            sales_volume: product.sales_volume,
            description: product.description,
            brief: product.brief,
            image_des: product.image_des,
            images: product.images,
            detailsImage: product.detailsImage,
            cover: product.cover,
            detailsImage: product.detailsImage,
            endPrice: product.endPrice,
            isTool: product.isTool,
            recommend: product.recommend,
            status: product.status,
            specifications: product.specifications,
            agencyLevelPrices: product.agencyPrice,
            productClass: product.productClass,
            isAppointment: product.isAppointment
          }
        }, function (err, alt) {
          if (!err) {
            if (product.isTool) {
              let roles_name_count = Roles.find({ name: product.name + '_holder' }).count();
              if (roles_name_count === 0) {
                Roles.insert({
                  name: product.name + '_holder',
                  name_zh: product.name_zh,
                  time_limit: -1,
                  permissions: {},
                  state: true,
                  weight: 0,
                  createdAt: new Date(),
                  isSuper: false,
                  users: []
                })
              }
            }
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

  'app.product.search'(data) {
    let products = Products.aggregate([
        { $match: { name_zh: {$regex:data}}},
        {
          $lookup: {
            from: "Shops",
            localField: "shopId",
            foreignField: "_id"
          }
        }
      ])
    return {
      products,
      formMethod: 'app.product.search'
    }
  },

  'fancyshop.getProductByZhName'(zhName){
    let product = getProductByZhName(zhName);
    return {
      product,
      fromMethod: 'fancyshop.getProductByZhName',
    }
  },
  //授卡功能
  'product.cardBindToUser'(cardId,username){
    let user = Meteor.users.findOne({username:username})
    let product = Products.findOne({'_id': cardId})
    let roleName = product.name + '_holder'
    let role = Roles.findOne({ 'name': roleName })
    if (role === undefined) {
      throw new Meteor.Error("会员卡没有标记为道具类商品");
    }
    if(user){
      let productOwener = ProductOwners.findOne({ userId: user._id, productId: cardId })
      if (productOwener){
        throw new Meteor.Error("用户已经有该会员卡，请勿重复添加");
      }else{
        ProductOwners.insert({
          userId: user._id, 
          productId: cardId,
          createdAt: new Date(),
        },function(err,alt){
          //如果授卡成功，给该用户相应的角色
          if(!err){
            let user_role = UserRoles.findOne({ 'roleName': roleName, 'userId': user._id })
           
            if (user_role){
              UserRoles.update(user_role,{
                $set:{
                  status: true
                }
              })
              console.log('用户角色存在，开放角色')
            }else{
              UserRoles.insert({
                roleName: role.name,
                userId: user._id,
                roleId: role._id,
                createdAt: new Date(),
                status: true
              })
              console.log('给用户角色')
            }
          //如果授卡成功，给该用户相应的角色
          //如果授卡成功，给该高级会员用户生成相应的店铺
            let shop = Shops.findOne({ 'acl.own.users': user._id })
          
            //判断是授高级卡还是普通卡
            if(product.productClass === 'advanced_card'){
              console.log('-------授高级卡片-----------')
              if(!shop){
                console.log('-------高级店铺不存在-----------')
                Shops.insert({
                  name: user.username + "的店铺",
                  phone: user.profile ? (user.profile.mobile? user.profile.mobile: user.username) : user.username,
                  pictures: [],
                  description: '欢迎光临' + user.username + "的店铺",
                  tags: ["高级会员", "代理", "挣钱"],
                  cover: user.headurl,
                  address: '',
                  lntAndLat: [],
                  isAdvanced:true,
                  status: true,
                  createdAt: new Date(),
                  acl: {
                    own: {
                      roles: ["shop_owner"],
                      users: user._id,
                    },
                    read: {
                      roles: ['nobody', 'login_user']
                    },
                    write: {
                      roles: ["shop_owner", "shop_manager"],
                      users: [],
                    }
                  }
                });
              }else{
                console.log('-------高级店铺存在-----------')
                Shops.update(shop,{
                  $set:{
                    status: true,
                    isAdvanced:true,
                  }
                })
              }

            }else{
              console.log('-------授普通卡片卡片-----------')
              if(!shop){
                console.log('-------普通店铺不存在-----------')
                Shops.insert({
                  name: user.username + "的店铺",
                  phone: user.profile.mobile,
                  pictures: [],
                  description: '欢迎光临' + user.username + "的店铺",
                  tags: ["高级会员", "代理", "挣钱"],
                  cover: user.headurl,
                  address: '',
                  lntAndLat: [],
                  status: true,
                  createdAt: new Date(),
                  acl: {
                    own: {
                      roles: ["shop_owner"],
                      users: user._id,
                    },
                    read: {
                      roles: ['nobody', 'login_user']
                    },
                    write: {
                      roles: ["shop_owner", "shop_manager"],
                      users: [],
                    }
                  }
                });
              }else{
                console.log('-------普通店铺存在-----------')
                Shops.update(shop,{
                  $set:{
                    status: true,
                  }
                })
              }
            }
            }
        })
      }
    }else{
      throw new Meteor.Error("授卡失败,请检查用户名是否存在");
    }
  },
  'product.cardUnbindUser'(userId,product){
    console.log('解绑用户')
    let roleName = product.name + '_holder'
    let role = Roles.findOne({ 'name': roleName })

    ProductOwners.remove({ userId: userId,productId:product._id},function(err){
      if(!err){
        console.log('解绑成功')

        //关闭该用户的店铺
        //取消该用户的角色
        let user_role = UserRoles.findOne({ 'roleName': roleName, 'userId': userId })
        if (user_role) {
          UserRoles.update(user_role, {
            $set:{
              status: false
            }
          },function () {
            console.log('取消该用户角色成功')
          })
        }
       
        let shop = Shops.findOne({ 'acl.own.users': userId })
        if (shop) {
          Shops.update(shop, {
            $set:{
              status: false
            }
          }, function () {
            console.log('关闭该用户店铺成功')
          })
        }

      }
    })
  }
});

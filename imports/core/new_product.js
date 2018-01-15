import {Categories} from '../api/categories/categories.js';
import {Roles} from '../api/roles/roles.js';
import {Tags} from '../api/tags/tags.js';
import {Products} from '../api/products/products.js';

function createTag
(
  name,
  createdByUserId,
)
{

}

function createProductTag
(

)
{

}
function newProductRole(
  pruductId,
  roleName,
)
{

}
function generateNewToolRole(product){
  if (!product.isTool) {
    return "IT IS NOT TOOL";
  }
  return Roles.insert({
    name: product.roleName+"_holder",
  })
}

export function newProuct
(
  isTool,
  roleName,
  params,
  categoryName,
  tagNames,
)
{
  let category = Categories.findOne({name: categoryName})
  if (!category) {
    let categoryId = Categories.insert({
      superCategoryId: null,
      name: categoryName,
      createdAt: new Date()
    });
    category = Categories.findOne({_id: categoryId});
  }
  if (Products.find({name_zh: params.name_zh}).count()>0) {
    console.log(params.name_zh+"已经存在");
    return "name_zh exist";
  }
  if (Products.find({name: params.name}).count()>0) {
    console.log(params.name+"已经存在");
    return "name exist";
  }
  if (Products.find({name: roleName}).count()>0) {
    console.log(roleName+"已经存在");
    return "roleName exist";
  }
  let productId = Products.insert(Object.assign({}, params, {
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
      },
      buy: {
        roles: ['login_user',]
      }
    },
    createdAt: new Date(),
    isTool,//是否是工具类商品
    roleName,//当且仅仅当isTool为true的时候设置,会生成roleName+Holder的角色, roleName需要判重, //"shopName.owner""shopName.custService"
    categoryId: category._id,
  }));

  for (var i = 0; i < tagNames.length; i++) {
    if (Tags.find({name: tagNames[i]}).count() < 1) {
      Tags.insert({
       name: tagNames[i],
       shopId: params.shopId,
       productId,
       createdAt: new Date(),
     })
    }

  };
  if (isTool) {
    Roles.insert({
        name_zh: roleName,
        name: roleName+"_holder",
        permissions:{
          products: {
            read: true,
            buy: true,
          }
        },
        state: true,
        weight: 0,  //0权重权限最大
        createdAt : new Date(),
        isSuper: false,
        users:[]
      });
  }


return productId;

}

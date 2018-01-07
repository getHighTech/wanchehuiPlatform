import { Shops } from './shops.js';
export default function buildSelfShop(){
  let shopId = null
  console.log('============================');
  console.log("开始创建万人车汇自营店");
  if (Shops.find({name: "万人车汇自营店"}).count()>=1) {
    console.log("万人车汇自营店已经存在");
      shopId = Shops.findOne({name: "万人车汇自营店"})._id;
  }else{
    shopId = Shops.insert({
      name: "万人车汇自营店",
      phone: "18820965455",
      pictures: [],
      description: '这是万人车汇平台官方店',
      tags: [],
      cover: 'url',
      status: true,
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
          roles: ["shop_owner","shop_manager"],
          users: [],
        }
      }
    });
  }
  // let shop = Shops.findOne({_id: shopId});
  let wanchehui = Meteor.users.findOne({username: 'wanchehui'});

  let superAdmin = Meteor.users.findOne({username: 'superAdmin'});

  let yangzhiqiang = Meteor.users.findOne({username: '13128980333'});

  //根据userId, 找出他运营或者拥有的店
  // let shops = Shops.find({$or: [{'acl.own.users': userId}, {'acl.write.users': userId}]});
  console.log("开始给自营店插入ACL权限");

  let rlt = Shops.update(shopId, {
    $set: {
      acl: {
        own: {
          roles: ["shop_owner"],
          users: [wanchehui._id, yangzhiqiang._id],
        },
        read: {
          roles: ['no_body', "login_user", "superAdmin"]
        },
        write: {
          roles: [ "shop_owner","shop_employee", "shop_runner", "superAdmin"],
          users: [wanchehui._id, superAdmin._id],
        }
      }
    }
  })

  console.log("更新结果", rlt);
  return rlt;


}

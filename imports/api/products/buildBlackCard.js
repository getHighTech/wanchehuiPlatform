
import {newProuct} from '../../core/new_product';
import {Shops} from '../shops/shops.js';

import {buildSelfShop} from '../shops/buildSelfShop.js';
export function buildBlackCard(){
  //
  let selfShop = Shops.findOne({phone: '18820965455'});
  if (!selfShop) {
      selfShop = Shops.findOne({_id: buildSelfShop()});
  }
  let superAdmin = Meteor.users.findOne({username: 'superAdmin'});


  let params = {

    isSale: true,

    name_zh: "万人车汇黑卡",
    name: "wanchehui black card",
    price: 36500,
    description: '购买一年的优惠资格',
    brief: '购买一年的优惠资格',
    images:['http://wanchehui.oss-cn-qingdao.aliyuncs.com/cards/bbg2.png'],
    cover: 'http://wanchehui.oss-cn-qingdao.aliyuncs.com/cards/bbg2.png',
    shopId: selfShop._id,
    createdByUserId: superAdmin._id,
    properties: [],
    specifications: [],//eg:[{"red": 100000, "red & heavy": 1500000}]
    endPrice: 36500, //最终价格
    curency: 'cny', //cny
    agencyLevelCount: 2,//eg: 2
    agencyLevelPrices: [3880, 1280]
  }


  newProuct
  (
    true,
    'blackcard',
    params,
    '会员权益',
    ["会员", "优惠", "权益", "优惠", "自营"],
  );


}

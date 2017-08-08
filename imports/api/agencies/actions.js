import { Meteor } from 'meteor/meteor';
import { Agencies } from './agencies.js';
import { Session } from 'meteor/session';

export function becomeAgency(productId, count, superAgencyId, userId, isRoot, flag){
  return Agencies.insert({
    productId,
    count,
    superAgencyId,
    userId,
    isRoot,
    flag,
    createdAt: new Date()
  });
}


//以用户生成一个新的根代理

export function generateNewRoot(userId, productId){
  let wanchehui = Meteor.users.findOne({"username": "wanchehui"});
  let wanchehui_agency = Agencies.findOne({userId: wanchehui._id});
  //如果万车汇的节点没有建立则建立万车会的节点
  if (wanchehui_agency == undefined) {
    let wanchehui_agency_id = becomeAgency(null, null, null, wanchehui._id, false, -1);
    wanchehui_agency = Agencies.findOne({_id: wanchehui_agency_id});
  }

  let count = null;
  let superAgencyId = wanchehui_agency._id;
  let isRoot = true;
  let flag = 0;
  if (Agencies.find({isRoot: true, userId: userId}).count() > 0) {
      return '他已经是根代理人了';
  }
  return becomeAgency(productId, count, superAgencyId, userId, isRoot, flag);
}

//找到他的上级代理者

export function findSuperAgency(productId, fromId){
  //fromId为Session
  console.log('来自的节点',fromId);
  if (fromId) {
    //尝试获取上级代理的链接的内容，若是分享了同一款产品，则返回
    let from_session_agency = Agencies.findOne({_id: fromId, productId });
    if (from_session_agency != undefined) {
      return from_session_agency;
    }
  }
  //若是没有找到上级的链接的session则开始找到根代理人．
  let agency = Agencies.findOne({isRoot: true, flag: 1, productId});

  if (agency == undefined) {
    //如果没有根节点排队，即根节点处于初始化状态，或者根节点当前排队的被删除，那么重新更新队列, 给最新的代理建立下级权
    let head_agency = Agencies.findOne({isRoot: true}, {sort: {createdAt: -1}});
    //若是管理员并没有设置根代理，则生造一个
    if (head_agency == undefined) {

      let user = Meteor.users.findOne({username: "testuser17"});
      let headid = generateNewRoot(user._id, productId);

      head_agency = Agencies.findOne({_id: headid});
      Agencies.update(headid,{
        $set: {
          flag: 1
        }
      });
    }
    console.log("头部节点到底在哪里",head_agency);
    Agencies.update(head_agency._id, {
      $set: {
        flag: 1,
      }
    });
    return head_agency;
  }
  //清除这个代理点的flag，并且使得他的下一根代理的flag节点生效
  Agencies.update(agency._id, {
    $set: {
      flag: 0,
    }
  });
  let newhead = Agencies.findOne({isRoot: true, createdAt:{$lt: agency.createdAt }}, {sort: {createdAt: -1}})
  //若是没有下一个节点了，则回到第一时间逆序的代理
  if (newhead == undefined ) {
    newhead  = Agencies.findOne({isRoot: true}, {sort: {createdAt: -1}});
  }

  Agencies.update(newhead._id, {
    $set: {
      flag: 1,
    }
  });

  return agency;

}

//找到他的上级代理者
export function findAgency(id){
  return Agencies.findOne({_id: id});
}

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'
import {Orders} from "/imports/api/orders/orders.js"
import { rolesBindingUser } from "/imports/api/roles/actions.js"

import { allUsersMount,
        allCardUsersMount,
        getLimitUserIds,
        getBasicUserById,
        getUserByAgencyId,
        chengduCardUsersMount,
        beijingCardUsersMount,removeUserById
      } from './actions.js';

Meteor.methods({
  'user.role'() {
    if (!Meteor.user()) {

      return [];
    }
    return Meteor.user().roleId;
  },
  'users.count'(){
    return allUsersMount();
  },
  'users.cards.count'(){
    return allCardUsersMount();
  },
  'users.cards.chengducount'(){
    return chengduCardUsersMount();
  },
  'users.cards.beijingcount'(){
    return beijingCardUsersMount();
  },

  'get.userIds.limit'(condition, page, pageSize){
    return getLimitUserIds(condition, page, pageSize);
  },
  'get.users.limit'(condition={},page=1, pageSize=20){
    let users =  Meteor.users.find(condition, {
      skip: (page-1)*pageSize, limit: pageSize,
      sort: {"createdAt": -1},
      fields:
        {
          'roles': 1,
          'profile': 1,
          'username': 1,
          'createdAt': 1,
          'cards': 1,
          'carnumber': 1,
        }
      }
    );
    return users.fetch();
  },
  'get.users.accouts'(userId){
    return Meteor.users.find({_id: {$in: userId}}).fetch();
  },

  'get.users.addOnToady'(){
    let date = new Date();
    var currentDate = date.Format("yyyy/MM/dd");
    let nextdate = (new Date((date/1000+86400)*1000))
    var nextDate = nextdate.Format("yyyy/MM/dd");

    return Meteor.users.find({createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)}}).count();
  },



  'get.user.id'(userId){
    return getBasicUserById(userId);
  },
  "get.user.agencyId"(agencyId){
    return getUserByAgencyId(agencyId);
  },

  "get.user.byUserName"(username){
    return  Meteor.users.findOne({"username": username});
  },
  'users.cards.addOnToady'(){
    let date = new Date();
    let nextdate = (new Date((date/1000+86400)*1000))
    var currentDate = date.Format("yyyy/MM/dd");
    var nextDate = nextdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)}, status:'paid',type:'card'}).count();

  },


  'get.orders.addOnToadyInChengDu'(){
    let date = new Date();
    var currentDate = date.Format("yyyy/MM/dd");
    let nextdate = (new Date((date/1000+86400)*1000))
    var nextDate = nextdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)},"type":"card","area":"CHENGDU",status:'paid',}).count();
  },


  'get.orders.addOnToadyInBeiJing'(){
    let date = new Date();
    var currentDate = date.Format("yyyy/MM/dd");
    let nextdate = (new Date((date/1000+86400)*1000))
    var nextDate = nextdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)},"type":"card","area":"BEIJING",status:'paid',}).count();
  },


  'users.cards.addOnWeek'(){
    var day_of_week = new Date().getDay()
    if( day_of_week == 0){
       day_of_week = 7
    }
    let date = new Date();
    let exdate = (new Date((date/1000-day_of_week*86400)*1000))
    var currentDate =  (new Date((date/1000+86400)*1000)).Format("yyyy/MM/dd");
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card'}).count();
  },

  'get.orders.InThisWeekInBeiJing'(){
    var day_of_week = new Date().getDay()
    if( day_of_week == 0){
       day_of_week = 7
    }

    let date = new Date();
    let exdate = (new Date((date/1000-day_of_week*86400)*1000))

    var currentDate =  (new Date((date/1000+86400)*1000)).Format("yyyy/MM/dd");
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card',area:'BEIJING'}).count();
  },

  'get.orders.InThisMonthInBeiJing'(){
    let date =new Date();
    let currentDate = (new Date((date/1000+86400)*1000)).Format("yyyy/MM/dd");
    let day_of_month =new Date().getDate()-1;
    let exdate=(new Date((date/1000-day_of_month*86400)*1000));
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gte':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card',area:'BEIJING'}).count();
  },

  'get.orders.InThisWeekInChengDu'(){
    var day_of_week = new Date().getDay()
    if( day_of_week == 0){
       day_of_week = 7
    }
    let date = new Date();
    let exdate = (new Date((date/1000-day_of_week*86400)*1000))
    var currentDate =  (new Date((date/1000+86400)*1000)).Format("yyyy/MM/dd");
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card',area:'CHENGDU'}).count();
  },



  'get.orders.InThisMonthInChengDu'(){
    let date =new Date();
    let currentDate = date.Format("yyyy/MM/dd");
    let day_of_month =new Date().getDate();
    let exdate=(new Date((date/1000-day_of_month*86400)*1000));
    var exDate = exdate.Format("yyyy/MM/dd");
    return Orders.find({createdAt: {'$gte':new Date(exDate),'$lte':new Date(currentDate)}, status:'paid',type:'card',area:'CHENGDU'}).count();
  },

  'users.remove'(userId){
    return removeUserById(userId);
  },
  'user.findUsersbyUserIds'(userIds){
    return Meteor.users.find({_id: $in(userIds)})
  },
  'users.update'(id,phone,address){
   let user = Meteor.users.update(id,
      {
        $set: {
          profile: {mobile: phone},
          adderss: {location: address}
        }
      }
    );
     return user
  },
  'users.mobile.exist'(mobile){
    let phone = Meteor.users.findOne(
      {
        'profile.mobile': mobile
      }
    )
    if (!phone) {
      return true
    }else {
      return false
    }
  },
  'login.mobie'(mobile) {
     let user = Meteor.users.findOne({'profile.mobile': mobile})
     if(user == undefined){
         user =  Accounts.createUser({username: mobile})
         Meteor.users.update(user,{
          $set: {
            'profile.mobile': mobile
          }
         })
     }
     return user
  },
  'forgot.mobile'(mobile) {
     let user = Meteor.users.findOne({'profile.mobile': mobile})
     Meteor.users.findOne({'username': mobile})
     return  user._id
  },
  'set.password'(user,pwd) {
      Accounts.setPassword(user,pwd,[])
      return user
  },

  'get.current.user'(){
    let user = Meteor.user()
    if(user == undefined){
      return
    }else{
      return user
    }
  },
  'user.findUserById'(userId){
    var stampedToken = Accounts._generateStampedLoginToken();
    console.log(stampedToken);
    var hashStampedToken = Accounts._hashStampedToken(stampedToken);
    console.log(hashStampedToken);
    Meteor.users.update(userId,
      {$push: {'services.resume.loginTokens': hashStampedToken}}
    );
    //valid
    let token = Accounts._hashLoginToken(stampedToken.token);
    console.log(token);
    return Meteor.users.findOne({"_id": userId});
  },
  'user.findUserByName'(username){
    return Meteor.users.findOne({"username": username});
  },
  'user.login.from.fancyshop'(type, loginParams){
    switch (type) {
      case 'mobileSMS':
      let mobileUser = Meteor.users.findOne({username: loginParams.mobile});
      if(mobileUser === undefined){
        mobileUser = Meteor.users.findOne({'profile.mobile': loginParams.username});
        if(mobileUser===undefined){
          let newUserId =Accounts.createUser({
            username: loginParams.mobile,
            password: oginParams.mobile,
          })
          Meteor.update(mobileUser._id, {
            "profile.mobile": loginParams.mobile,
          });
          mobileUser = Meteor.users.findOne({_id: newUserId});
          return {stampedToken: stampedTokenMobile, userId: mobileUser._id, needToResetPassword: true};
        }
      }
      if(mobileUser){
        let stampedTokenMobile = Accounts._generateStampedLoginToken();
        let hashStampedTokenMobile = Accounts._hashStampedToken(stampedTokenMobile);
        Meteor.users.update(mobileUser._id,
          {$push: {'services.resume.loginTokens': hashStampedTokenMobile}}
        );
        return {stampedToken: stampedTokenMobile, userId: mobileUser._id, needToResetPassword: false};
      }else{
        return mobileUser;
      }
      case 'password':
        let user = Meteor.users.findOne({username: loginParams.username});
        if(user === undefined){
          user = Meteor.users.findOne({'profile.mobile': loginParams.username});
          if(user===undefined){
            return "USER NOT FOUND";
          }
        }
        let rlt = Accounts._checkPassword(user, loginParams.password);
        if(rlt.userId === user._id && !rlt.error){
          let stampedToken = Accounts._generateStampedLoginToken();
          let hashStampedToken = Accounts._hashStampedToken(stampedToken);
          Meteor.users.update(user._id,
            {$push: {'services.resume.loginTokens': hashStampedToken}}
          );
          return {stampedToken, userId: user._id};
        }else{
          return rlt;
        }
        
      default:
        return "error";
    }
  },

  'user.logined'(userId, stampedToken){
    let hashStampedToken = Accounts._hashStampedToken(stampedToken);
    let hashedToken = hashStampedToken.hashedToken;
    let validToken = Accounts._hashLoginToken(stampedToken.token);
    if(hashedToken===validToken){
      let user = Meteor.users.findOne({_id: userId});
      return user;
    }else{
      return null;
    }
  },
  
  'user.changeNickname'(userId,nickname){
    if(userId==undefined){
      return "未获取到当前用户"
    }else{
      Meteor.users.update(userId,{
        $set: {
          'nickname': nickname
        }
       })
       return  Meteor.users.findOne({_id:userId})
    }
  },
  'user.changeSex'(userId,sex){
    if(userId==undefined){
      return "未获取到当前用户"
    }else{
       Meteor.users.update(userId,{
        $set: {
          'sex': sex
        }
       })
       return Meteor.users.findOne({_id:userId})
    }

  },
  'user.changeDataAutograph'(userId,dataAutograph){
    if(userId==undefined){
      return "未获取到当前用户"
    }else{
      Meteor.users.update(userId,{
        $set: {
          'dataAutograph': dataAutograph
        }
       })
       return Meteor.users.findOne({_id:userId});
    }

  },
  'user.changeCarnumber'(user,carnumber){
    if(user==undefined){
      return "未获取到当前用户"
    }else{
      return Meteor.users.update(user,{
        $set: {
          'carnumber': carnumber
        }
       })
    }

  },
  'user.changeBirthday'(userId,birthday){
    if(userId==undefined){
      return "未获取到当前用户"
    }else{
       Meteor.users.update(userId,{
        $set: {
          'birthday': birthday
        }
       })
       return Meteor.users.findOne({_id:userId});
    }

  },
  'user.changeArea'(userId,area){
    if(userId==undefined){
      return "未获取到当前用户"
    }else{
      Meteor.users.update(userId,{
        $set: {
          'area': area
        }
       })
       return Meteor.users.findOne({_id:userId});
    }

  },
});

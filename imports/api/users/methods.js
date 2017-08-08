import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {ScoreRecords} from './score_records.js';
import {Activities} from '/imports/api/activities/activities.js';
import {LoginRecords} from './login_records.js';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'user.getroles'(id) {
    if (!Meteor.user()) {

      return [];
    }
    return Meteor.user().roles;
  },

  "user.count.all"(){
    return Meteor.users.find().count(); 
  },
  'user.update.fansCount'(count){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        fansCount: count
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).fansCount;
  },

  'user.update.area'(area){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        area
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).area;
  },
  'user.update.nickname'(nickname){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        nickname
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).nickname;
  },
  'user.update.dataAutograph'(dataAutograph){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        dataAutograph
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).dataAutograph;
  },
  'user.update.carmodel'(carmodel){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        carmodel
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).carmodel;
  },
  'user.update.carnumber'(carnumber){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        carnumber
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).carnumber;
  },
  'user.update.headurl'(headurl){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        headurl
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).headurl;
  },
  'user.update.carframe'(carframe){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        carframe
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).carframe;
  },
  'user.update.carengine'(carengine){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        carengine
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).carengine;
  },
  'user.update.changebirth'(changebirth){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        changebirth
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).changebirth;
  },
  'user.update.sex'(sex){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        sex
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).sex;
  },
  'user.update.caryear'(caryear){
    Meteor.users.update(Meteor.userId(), {
      $set: {
        caryear
      }
    });
    return  Meteor.users.findOne({_id: Meteor.userId()}).caryear;
  },

  'current.user.update.mobile'(mobile){
    Meteor.users.update(Meteor.userId(),{
     $set: {
        'profile.mobile': mobile
     }
    });return  Meteor.users.findOne({_id: Meteor.userId()}).profile.mobile;
  },


  'user.get.member_status'() {
    return Meteor.user().member_status;
  },
  'user.loginrecord'(){
      let lastlogin = LoginRecords.find({userId: Meteor.userId()}, {sort: {createdAt: -1}, limit: 1}).fetch().pop();
      //取出上次登录的记录
      let logintimes = 0;
      if (lastlogin == undefined) {
        Meteor.users.update(Meteor.userId(), {
          $set:{
            logintimes: 1,
            lastLoginTime: null
          }
        });
      }else{
        logintimes = Meteor.user().logintimes;
        Meteor.users.update(Meteor.userId(), {
          $set: {
            logintimes: logintimes+1,
            lastLoginTime: lastlogin.createdAt
          }
        })
      }
      return LoginRecords.insert({
        userId: Meteor.userId(),
        createdAt: new Date()
      });

  },
  'user.updatescore'(addscore, addorminus, cause){
    let score = Meteor.user().score;
    let new_add_score = addscore;
    if (addorminus) {
      //判断这个积分是增加还是减少
      new_add_score = addscore;
    }else{
      new_add_score = 0-addscore;
    }
    //建立积分的记录
    let new_score_record = {
      userId: Meteor.userId(),
      addscore,
      addorminus,
      cause,
      createdAt: new Date()
    }
    ScoreRecords.insert(new_score_record);
    //建立新的事件
    Activities.insert({
      userId: Meteor.userId(),
      type: "score",
      obj: new_score_record,
      createdAt: new Date(),
    });
    //判断用户是不是第一次积分
    if (score != undefined ) {
      return Meteor.users.update(Meteor.userId(), {
          $set: {
            score: score+new_add_score
          }
      });
    }else{
      return Meteor.users.update(Meteor.userId(), {
          $set: {
            score: new_add_score
          }
      });
    }

  },
  'user.update.realname'(id ,realname){
    return Meteor.users.update(id, {
      $set: {
        realname
      }
    })
  }
  ,
  'user.update.drive_card'(id ,drive_card){
    return Meteor.users.update(id, {
      $set: {
        drive_card
      }
    })
  }
  ,
  'user.update.readrive_card_numberlname'(id ,drive_card_number){
    return Meteor.users.update(id, {
      $set: {
        drive_card_number
      }
    })
  }
  ,
  'user.update.gov_id'(id ,gov_id){
    return Meteor.users.update(id, {
      $set: {
        gov_id
      }
    })
  }
  ,
  'user.update.gov_id_number'(id ,gov_id_number){
    return Meteor.users.update(id, {
      $set: {
        gov_id_number
      }
    })
  }
  ,
  'user.update.real_head_pic'(id ,real_head_pic){
    return Meteor.users.update(id, {
      $set: {
        real_head_pic
      }
    })
  }
  ,
  'user.update.birthday'(id ,birthday){
    return Meteor.users.update(id, {
      $set: {
        birthday
      }
    })
  }
  ,
  'user.update.gender'(id ,gender){
    return Meteor.users.update(id, {
      $set: {
        gender
      }
    })
  },
  'user.update.residence'(id ,residence){
    return Meteor.users.update(id, {
      $set: {
        residence
      }
    })
  },

  'user.update.screen_capture'(id ,screen_capture){
    return Meteor.users.update(id, {
      $set: {
        screen_capture
      }
    })
  },

  'user.update.assurance_bill'(id ,assurance_bill){
    return Meteor.users.update(id, {
      $set: {
        assurance_bill
      }
    })
  },

  'user.update.all'(id ,member_profiles){
    return Meteor.users.update(id, {
      $set: member_profiles
    })
  },

  'user.update.password'(password){
    let uid = Accounts.setPassword(Meteor.userId(), password, false);

    return uid;
  },

  'user.statics.reg'(timelong=86400000){
    let d = new Date();
    return Meteor.users.find({createdAt: {
      $gte: new Date(d.getTime()-timelong),
      $lte: new Date()
    }}).count();
  },
  'user.statics.reg.yestoday'(){
    let today = new Date();
    let d = new Date();
    today = today.getTime();
    //我们都在东８区，所以加８个小时
    today = (today%86400000)+(3600000*8);
    return Meteor.users.find({createdAt: {
      $gte: new Date(d.getTime()-today-86400000),
      $lte: new Date(d.getTime()-today)
    }}).count();
  },
  'user.statics.reg.place'(timelong=86400000, place="北京"){
    let d = new Date();
    return Meteor.users.find({'profile.regPlace': place, createdAt: {
      $gte: new Date(d.getTime()-timelong),
      $lte: new Date()
    }}).count();
  },
  "user.static.invite.all"(){

    return Meteor.users.find({'profile.inviteNumber': Meteor.user().profile.mobile}).count();
  },
  "user.static.invite"(timelong, beforewhen){
    return Meteor.users.find({'profile.inviteNumber': Meteor.user().profile.mobile, createdAt: {
      $gte: new Date(beforewhen-timelong),
      $lte: new Date(beforewhen)
    }}).count();
  }


});

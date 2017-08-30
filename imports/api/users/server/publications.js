import { Meteor } from 'meteor/meteor';
import { Follows } from '../../follows/follows.js';
import { Roles } from '../../roles/roles.js';

Meteor.publish('user.list.one', function(){

return Meteor.users.find(
  {_id: this.userId},
  {

    sort: {createdAt: -1},
    fields:
      {
        'roles': 1,
        'profile': 1,
        'username': 1,
        'createdAt': 1,
        'member_status': 1,
        'coupons': 1,
        'fansCount': 1,
        'cards': 1,
      }
    }
  );
});
//列出有发布服务和优惠券权限的用户
Meteor.publish('user.list.authusers', function(condition_string = ''){

  let roles = Roles.find({weight:{
    $lte: 50
  }});
  let str = condition_string;

  let authusers = Meteor.users.find(
    {
      $or: [{'profile.mobile': eval("/"+str+"/")},{username: eval("/"+str+"/")},{nickname:eval("/"+str+"/")}],
      roles: {
        $in: roles.fetch()
      }

    },
    {
      sort: {createdAt: -1},
      fields:
        {
          'roles': 1,
          'profile': 1,
          'username': 1,
          'createdAt': 1,
          'member_status': 1,
          'followCount': 1,
          'fansCount': 1,
          'area': 1,
          'dataAutograph':1,
          'coupons': 1,
          'nickname':1,
          'carmodel':1,
          'carnumber':1,
          'carframe':1,
          'auth_cards': 1,//这个字段是授权产生的新的字段
          'carengine':1,
          'changebirth':1,
          'sex':1,
          'caryear':1,
          'headurl':1,
        }
      }
  );
  return authusers;
});

//搜索所有用户
Meteor.publish('user.list.condition.users', function(condition_string = ''){


  let str = condition_string;
  console.log(str);

  let users = Meteor.users.find(
    {
      $or: [{'profile.mobile': eval("/"+str+"/")},{username: eval("/"+str+"/")},{nickname:eval("/"+str+"/")}],

    },
    {
      skip: 0, limit: 30,
      sort: {createdAt: -1},
      fields:
        {
          'roles': 1,
          'profile': 1,
          'username': 1,
          'createdAt': 1,
          'member_status': 1,
          'followCount': 1,
          'fansCount': 1,
          'area': 1,
          'dataAutograph':1,
          'coupons': 1,
          'nickname':1,
          'carmodel':1,
          'carnumber':1,
          'carframe':1,
          'auth_cards': 1,//这个字段是授权产生的新的字段
          'carengine':1,
          'changebirth':1,
          'sex':1,
          'caryear':1,
          'headurl':1,
        }
      }
  );
  return users;
});

Meteor.publish('user.list.oneid', function(id=this.userId){

  return Meteor.users.find(
    {_id: id},
    {
      sort: {createdAt: -1},
      fields:
        {
          'roles': 1,
          'profile': 1,
          'username': 1,
          'createdAt': 1,
          'member_status': 1,
          'followCount': 1,
          'fansCount': 1,
          'area': 1,
          'dataAutograph':1,
          'nickname':1,
          'carmodel':1,
          'coupons': 1,
          'carnumber':1,
          'carframe':1,
          'carengine':1,
          'changebirth':1,
          'sex':1,
          'caryear':1,
          'headurl':1,
          'cards': 1
        }
      }
    );
});

Meteor.publish('user.list.ids', function(ids=[]){

  return Meteor.users.find(
    {_id: {$in: ids}},
    {
      sort: {createdAt: -1},
      fields:
        {
          'roles': 1,
          'profile': 1,
          'username': 1,
          'createdAt': 1,
          'member_status': 1,
          'followCount': 1,
          'fansCount': 1,
          'area': 1,
          'dataAutograph':1,
          'nickname':1,
          'carmodel':1,
          'carnumber':1,
          'carframe':1,
          'carengine':1,
          'changebirth':1,
          'coupons': 1,
          'sex':1,
          'caryear':1,
          'headurl':1,
        }
      }
    );
});

Meteor.publish('user.username', function(username){
  return Meteor.users.find({username: username},{
    sort: {createdAt: -1},
    fields:
      {
        'roles': 1,
        'profile': 1,
        'username': 1,
        'createdAt': 1,
        'member_status': 1,
        'fansCount': 1,
        'followCount': 1,
        'score': 1
      }
  });
});
Meteor.publish("MobileUserName", function (mobile) {
    return Meteor.users.find({'profile.mobile': mobile});
});

Meteor.publish('get.users.observed', function(follows_contion){
  return Meteor.users.find({$or: follows_contion},{
    sort: {createdAt: -1},
    fields:
      {
        'roles': 1,
        'profile': 1,
        'username': 1,
        'createdAt': 1,
        'member_status': 1,
      }
  });
});

Meteor.publish('user.statics.reg', function(range="today"){

  let d = new Date();
  if (range == 'today') {
    let today = new Date();
    today = today.getHours();
    today = 3600000*today;
    return Meteor.users.find({createdAt: {
      $gte: new Date(d.getTime()-today),
      $lte: new Date()
      }},{sort: {createdAt: -1}}
    );
  }
  if (range == 'today_chengdu') {
    let today = new Date();
    today = today.getHours();
    today = 3600000*today;
    return Meteor.users.find({'profile.regPlace': '成都市', createdAt: {
      $gte: new Date(d.getTime()-today),
      $lte: new Date()
      }},{sort: {createdAt: -1}}
    );
  }
  if (range == 'today_beijing') {
    let today = new Date();
    today = today.getHours();
    today = 3600000*today;
    return Meteor.users.find({'profile.regPlace': '北京市', createdAt: {
      $gte: new Date(d.getTime()-today),
      $lte: new Date()
      }},{sort: {createdAt: -1}}
    );
  }
  if (range == 'oneday') {
    return Meteor.users.find({createdAt: {
      $gte: new Date(d.getTime()-86400000),
      $lte: new Date()
      }},{sort: {createdAt: -1}}
    );
  }
  if (range=='oneday_beijing') {
    return Meteor.users.find({'profile.regPlace': '北京市', createdAt: {
      $gte: new Date(d.getTime()-86400000),
      $lte: new Date()
      }},{sort: {createdAt: -1}}
    );
  }
  if (range=='oneday_chengdu') {
    return Meteor.users.find({'profile.regPlace': '成都市', createdAt: {
      $gte: new Date(d.getTime()-86400000),
      $lte: new Date()
      }},{sort: {createdAt: -1}}
    );
  }
  if (range=='yestoday') {
    let today = new Date();
    today = today.getHours();
    today = 3600000*today;
    return Meteor.users.find({createdAt: {
      $gte: new Date(d.getTime()-today-86400000),
      $lte: new Date(d.getTime()-today)
    }});
  }
  if (range=='oneweek') {
    return Meteor.users.find({createdAt: {
      $gte: new Date(d.getTime()-86400000*7),
      $lte: new Date(d.getTime())
    }});
  }

});

Meteor.publish('static.invited.users', function(range="all"){
  let user = Meteor.users.findOne({_id: this.userId});
  let d = new Date();
  let today = new Date();
  today = today.getHours();
  today = 3600000*today;
  if (range == "all") {
    return Meteor.users.find({'profile.inviteNumber': user.profile.mobile},{sort: {createdAt: -1}});
  }
  if (range == "today") {
    return Meteor.users.find({'profile.inviteNumber': user.profile.mobile,
    createdAt: {
      $gte: new Date(d.getTime()-today),
      $lte: new Date(d.getTime())
    }
    },{sort: {createdAt: -1}});
  }
  if (range == 'yestoday') {
    return Meteor.users.find({'profile.inviteNumber': user.profile.mobile,
    createdAt: {
      $gte: new Date(d.getTime()-today-86400000),
      $lte: new Date(d.getTime()-today)
    }
    },{sort: {createdAt: -1}});
  }
})

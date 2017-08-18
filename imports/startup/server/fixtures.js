// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';
import { MemberAbilities } from '../../api/member_abilities/member_abilities.js';
import { QaPosts } from '../../api/qa_posts/qa_posts.js';
import { Roles } from '../../api/services/roles/roles.js';
import { PageContents } from '../../api/pages/page_contents.js';
import { Pages } from '../../api/pages/pages.js';
import { Services } from '../../api/services/services.js';
import { Arrangements } from '../../api/arrangements/arrangements.js';

Meteor.startup(() => {

  // if the Links collection is empty
  console.log(Meteor.settings.sia_seed);
  for (var i = 0; i < 20; i++) {
    if (Meteor.users.find({username: "testuser"+i}).count() == 0) {
          Accounts.createUser({
              username: "testuser"+i,
              password: "testuser"+i+'2017best',
            });
    }
  }

  // console.log(Meteor.users.find().count());
  if (MemberAbilities.find({}).count() === 0) {
    const member_abilites = [
      {
        name: '礼品',
        shortIntro: '丰富的礼品',
        icon: 'gift',
        longIntro: '滴滴车主俱乐部（暂时只有成都沙湾店，未来将在全国推广），会不定期地在门店发布茶、烟、汽车内饰、矿泉水等礼品，等待会员来领取。',
      createdAt: new Date()

      },
      {
        name: '汽车、保养、清洗',
        shortIntro: '汽车保养维修清洗优惠',
        icon: 'car',
        longIntro: '暂定在成都布局，为会员争取最大优惠的汽车服务点的价格，进一步让会员的会员费远远物超所值。',
      createdAt: new Date()
      },
      {
        name: '免到店服务',
        shortIntro: '免到店服务',
        icon: 'phone',
        longIntro: '当会员需要办理网约车相关服务时（暂时只有滴滴业务），可以根据其会员资料在线咨询，预约，甚至在业务允许的范围内可以在线解决问题。',
      createdAt: new Date()
      },
      {
        name: '柜台预约',
        shortIntro: '滴滴柜台业务预约',
        icon: 'hand peace',
        longIntro: '当会员需要到门店（暂时是滴滴车主俱乐部成都沙湾店）取号排队，进行柜台业务的时候，会员可以在网上预约时间，走VIP通道，既可以节约办理时间，又可以避免没有排到队而白跑一趟。',
      createdAt: new Date()
      },
      {
        name: '车险',
        shortIntro: '车险折扣',
        icon: 'payment',
        longIntro: '当会员需要购买新的汽车保险，或者要更换和续约新的汽车保险的时候，可以凭借会员身份，咨询我们保险相关的工作人员，得到一条龙式的服务，以及非常好的优惠价格',
      createdAt: new Date()

      },
      {
        name: "商品",
        shortIntro: "优质商品的廉价购买",
        icon: "cart",
        longIntro: "滴滴车主俱乐部（暂时只有成都沙湾店，未来将在全国推广），会不定期地在门店以及线上发布爆款商品，只有会员才能购买，并享有低廉的价格。",
        createdAt: new Date()
      },
      {
        name: "培训",
        shortIntro: "网约车个性化培训",
        icon: "student",
        longIntro: "滴滴车主俱乐部（暂时只有成都沙湾店，未来将在全国推广），会将第一手网约车政策的资料给到会员，并对其进行指导和培训，也会对开网约车的新手会员给予不定期的线下线上培训",
        createdAt: new Date()
      },
      {
        name: "团购",
        shortIntro: "汽车享有团购价优惠",
        icon: 'tags',
        longIntro: "我们利用互联网的优势，将买新车的需求集中整合，为会员们提供一个集体买车团控优惠价格。",
        createdAt: new Date()
      }

    ];
    member_abilites.forEach(member_ability => MemberAbilities.insert(member_ability));

  }
  if (QaPosts.find({}).count() === 0) {
    const qa_posts = [{
      problem: "什么是滴滴服务分？",
      answer: "服务分是滴滴出行平台通过科学评估方法建立对车主服务的综合评价系统服务分的计算方法：服务分是通过大数据机器学习逐步完善的建模结果，分数计算也会因不断的迭代而优化。服务分计算并不是简单的加减，它是根据司机所在城市所有司机的分数分布，而动态决定每一个加分减分项的计算权重，因此并没有固定的计算公式，也无法针对任一个取消或者投诉知道具体的分数变动.影响服务分高低的主要三个指标：近300单的取消率（乘客+司机）、投诉率、低星（1-3星）差评率新注册司机服务分起始值为80分，专车司机无服务分",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: true,
      createdAt: new Date()

    },
    {
      problem: "滴滴服务分如何计算？",
      answer: "服务分是滴滴出行平台通过科学评估方法建立对车主服务的综合评价系统服务分的计算方法：服务分是通过大数据机器学习逐步完善的建模结果，分数计算也会因不断的迭代而优化。服务分计算并不是简单的加减，它是根据司机所在城市所有司机的分数分布，而动态决定每一个加分减分项的计算权重，因此并没有固定的计算公式，也无法针对任一个取消或者投诉知道具体的分数变动.影响服务分高低的主要三个指标：近300单的取消率（乘客+司机）、投诉率、低星（1-3星）差评率新注册司机服务分起始值为80分，专车司机无服务分",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: false,
      createdAt: new Date()

    },
    {
      problem: "什么会影响滴滴的服务分？",
      answer: "服务分是滴滴出行平台通过科学评估方法建立对车主服务的综合评价系统服务分的计算方法：服务分是通过大数据机器学习逐步完善的建模结果，分数计算也会因不断的迭代而优化。服务分计算并不是简单的加减，它是根据司机所在城市所有司机的分数分布，而动态决定每一个加分减分项的计算权重，因此并没有固定的计算公式，也无法针对任一个取消或者投诉知道具体的分数变动.影响服务分高低的主要三个指标：近300单的取消率（乘客+司机）、投诉率、低星（1-3星）差评率新注册司机服务分起始值为80分，专车司机无服务分",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: true,
      createdAt: new Date()

    },
    {
      problem: "如何联系保险？",
      answer: "保险电话：4008250966",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: false,
      createdAt: new Date()
    },
    {
      problem: "如何联系快车客服？",
      answer: "快车司机客服电话：4000000666转1转9再转0",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: true,
      createdAt: new Date()
    },
    ,
    {
      problem: "如何联系专车客服？",
      answer: "专车司机客服电话：4000000666转2转9再转0",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: true,
      createdAt: new Date()
    },
    {
      problem: "如何联系顺风车客服？",
      answer: "顺风车司机客服电话：4000000666转5",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: false,
      createdAt: new Date()
    },
    {
      problem: "乘客如何联系客服？",
      answer: "乘客端客服电话：4000000999",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: false,
      createdAt: new Date()
    },
    {
      problem: "一台车能不能绑定两个司机的滴滴账号？",
      answer: "普通加盟模式下，1台车可以绑定三个快车司机账号，但司机与车辆需在同一租赁公司方可绑定，且同一时间只能一个账号出车接单",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: false,
      createdAt: new Date()
    },
    {
      problem: "一个滴滴账号能不能绑定多台车？",
      answer: "普通加盟模式下，1个快车司机账号可绑定3台车",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: false,
      createdAt: new Date()
    },
     {
      problem: "联系不上乘客怎么办?",
      answer: "接单后如果出现联系不上乘客的情况，您可直接在司机端上点击按钮反馈，无需您反复和乘客联系，系统将在5分钟内自动给您的乘客拨打多次电话。如仍未联系上，您可无责关闭订单，不影响您的指派成交率。",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: true,
      createdAt: new Date()
    },
    {
      problem: "滴滴系统异常无法结束计费怎么办？",
      answer: " 建议您尝试退出司机端系统后重新登录一下，若仍不能正常结束计费，请致电客服。",
      author: "万车汇",
      raiser: "万车汇",
      is_hot: true,
      createdAt: new Date()
    },

    ];
    qa_posts.forEach(qa_post => QaPosts.insert(qa_post));

  }
  if (Roles.find({name: '超级管理员'}).count() == 0) {
        Roles.insert({
          name: "超级管理员",
          weight: 0,
        });
  }
  let newFun = function(){
    console.log("很好");
  }
  if (Roles.find({name: '超管员4'}).count() == 0) {
        Roles.insert({
          name: "超管员4",
          weight: 0,
          newFun: newFun.toString()
        });
  }
  let super_role  = Roles.findOne({name: '超级管理员'});
  let super_role_test  = Roles.findOne({name: '超管员4'});
  const util = require('util');
  const vm = require('vm');

  const sandbox = {
    animal: 'cat',
    count: 2
  };

  const script = new vm.Script('count += 1; name = "kitty";');

  const context = new vm.createContext(sandbox);
  for (let i = 0; i < 10; ++i) {
    script.runInContext(context);
  }
  // const newComeSanbox = {
  //
  // }
  // const newFunScript = new vm.Script('newCome=12;');
  // newFunScript.runInContext(newComeSanbox);
  // newComeSanbox;

  console.log(util.inspect(sandbox.animal));

  if (Meteor.users.find({username: "superadmin"}).count()==0) {
    let admin_id = Accounts.createUser({
            username: 'superadmin',
            password: 'wanchehui2017best',
          });

          Meteor.users.update(admin_id, {
          $set: {
            roles: [super_role]
          }
        });
  }
    if (Roles.find({name: '法律文件管理员'}).count() == 0) {
        Roles.insert({
          name: "法律文件管理员",
          weight: 0,
        });
  }
  let law_role  = Roles.findOne({name: '法律文件管理员'});

  if (Meteor.users.find({username: "lawadmin"}).count()==0) {
    let lawadmin_id = Accounts.createUser({
            username: 'lawadmin',
            password: 'lawadmin2017best',
          });

          Meteor.users.update(lawadmin_id, {
          $set: {
            roles: [law_role]
          }
        });
  }


  if (Roles.find({name: '司机社区管理员'}).count() == 0) {
        Roles.insert({
          name: "司机社区管理员",
          weight: 10,
        });
  }
  let com_role  = Roles.findOne({name: '司机社区管理员'});

  if (Meteor.users.find({username: "wanchehui"}).count()==0) {
    let com_id = Accounts.createUser({
            username: 'wanchehui',
            password: 'wanchehui2017best',
          });

          Meteor.users.update(com_id, {
          $set: {
            roles: [com_role]
          }
        });
  }
  if (Roles.find({name: '数据运营员'}).count() == 0) {
        Roles.insert({
          name: "数据运营员",
          weight: 33,
        });
  }
  let number_role  = Roles.findOne({name: '数据运营员'});

  if (Meteor.users.find({username: "numberstatic_beijing"}).count()==0) {
    let number_id = Accounts.createUser({
            username: 'numberstatic_beijing',
            password: 'numberstatic_beijing2017best',
          });

          Meteor.users.update(number_id, {
          $set: {
            roles: [number_role]
          }
        });
  }
  if (Meteor.users.find({username: "numberstatic_chengdu"}).count()==0) {
    let number_id = Accounts.createUser({
            username: 'numberstatic_chengdu',
            password: 'numberstatic_chengdu2017best',
          });

          Meteor.users.update(number_id, {
          $set: {
            roles: [number_role]
          }
        });
  }


  if (Roles.find({name: '会员资料审批员'}).count() == 0) {
        Roles.insert({
          name: "会员资料审批员",
          weight: 50,
        });
  }
  let member_deny_role  = Roles.findOne({name: '会员资料审批员'});


    for (var i = 0; i < 10; i++) {
        if (Meteor.users.find({username: "memberprofileadmin"+i}).count()==0) {
            let member_deny_id = Accounts.createUser({
                    username: 'memberprofileadmin'+i,
                    password: 'memberprofileadmin'+i+'2017best',
                  });

                  Meteor.users.update(member_deny_id, {
                  $set: {
                    roles: [member_deny_role]
                  }
                });
          }

      }

    if (Roles.find({name: '会费认证员'}).count() == 0) {
          Roles.insert({
            name: "会费认证员",
            weight: 50,
          });
    }
    let member_fee_role  = Roles.findOne({name: '会费认证员'});


      for (var i = 0; i < 10; i++) {
          if (Meteor.users.find({username: "memberfeeadmin"+i}).count()==0) {
        let member_fee_id = Accounts.createUser({
                username: 'memberfeeadmin'+i,
                password: 'memberfeeadmin'+i+'2017best',
              });

              Meteor.users.update(member_fee_id, {
              $set: {
                roles: [member_fee_role]
              }
            });
            }

        }
        if (Roles.find({name: '会员认证员'}).count() == 0) {
              Roles.insert({
                name: "会员认证员",
                weight: 50,
              });
        }

        let member_prove_role  = Roles.findOne({name: '会员认证员'});


          for (var i = 0; i < 10; i++) {
              if (Meteor.users.find({username: "memberapproveadmin"+i}).count()==0) {
            let member_prove_id = Accounts.createUser({
                    username: 'memberapproveadmin'+i,
                    password: 'memberapproveadmin'+i+'2017best',
                  });

                  Meteor.users.update(member_prove_id, {
                  $set: {
                    roles: [member_prove_role]
                  }
                });
                }

            }



            if (Roles.find({name: '汽车服务商'}).count() == 0) {
                  Roles.insert({
                    name: "汽车服务商",
                    weight: 50,
                  });
            }

            let car_service_role  = Roles.findOne({name: '汽车服务商'});


              for (var i = 0; i < 120; i++) {
                  if (Meteor.users.find({username: "carserviceadmin"+i}).count()==0) {
                let carserviceadmin_id = Accounts.createUser({
                        username: 'carserviceadmin'+i,
                        password: 'carserviceadmin'+i+'2017best',
                      });

                      Meteor.users.update(carserviceadmin_id, {
                      $set: {
                        roles: [car_service_role]
                      }
                    });
                    }

                }
                if (Roles.find({name: '车险服务商'}).count() == 0) {
                      Roles.insert({
                        name: "车险服务商",
                        weight: 50,
                      });
                }

                let car_insurance_role  = Roles.findOne({name: '车险服务商'});


                  for (var i = 0; i < 8; i++) {
                      if (Meteor.users.find({username: "carinsuranceadmin"+i}).count()==0) {
                    let carinsuranceadmin_id = Accounts.createUser({
                            username: 'carinsuranceadmin'+i,
                            password: 'carinsuranceadmin'+i+'2017best',
                          });

                          Meteor.users.update(carinsuranceadmin_id, {
                          $set: {
                            roles: [car_insurance_role]
                          }
                        });
                        }

                    }
                    if (Roles.find({name: '门店预约管理员'}).count() == 0) {
                          Roles.insert({
                            name: "门店预约管理员",
                            weight: 50,
                          });
                    }

                    let shop_appointment_role  = Roles.findOne({name: '门店预约管理员'});


                      for (var i = 0; i < 8; i++) {
                          if (Meteor.users.find({username: "shopappointmentadmin"+i}).count()==0) {
                        let shopappointmentadmin_id = Accounts.createUser({
                                username: 'shopappointmentadmin'+i,
                                password: 'shopappointmentadmin'+i+'2017best',
                              });

                              Meteor.users.update(shopappointmentadmin_id, {
                              $set: {
                                roles: [shop_appointment_role]
                              }
                            });
                            }

                        }

                        if (Roles.find({name: '自营商品管理员'}).count() == 0) {
                              Roles.insert({
                                name: "自营商品管理员",
                                weight: 50,
                              });
                        }

                        let selfshop_role  = Roles.findOne({name: '自营商品管理员'});


                          for (var i = 0; i < 8; i++) {
                              if (Meteor.users.find({username: "selfshopadmin"+i}).count()==0) {
                            let selfshopadmin_id = Accounts.createUser({
                                    username: 'selfshopadmin'+i,
                                    password: 'selfshopadmin'+i+'2017best',
                                  });

                                  Meteor.users.update(selfshopadmin_id, {
                                  $set: {
                                    roles: [selfshop_role]
                                  }
                                });
                                }

                            }





      if (Roles.find({name: '网页编辑员'}).count() == 0) {
        Roles.insert({
          name: "网页编辑员",
          weight: 0,
        });
      }
      let pages_admin_role  = Roles.findOne({name: '网页编辑员'});

      if (Meteor.users.find({username: "pagesadmin"}).count()==0) {
        let pagesadmin_id = Accounts.createUser({
                username: 'pagesadmin',
                password: 'pagesadmin2017best',
              });

              Meteor.users.update(pagesadmin_id, {
              $set: {
                roles: [pages_admin_role]
              }
            });
      }

      let pagesadmin_id = Meteor.users.findOne({username: "pagesadmin"})._id;


      if (Pages.find({indexName: "homepage" }).count() == 0) {
        let page_id = Pages.insert({
          title: '万车汇——你在乘客左边，我们在你身边！',
          indexName: "homepage",
          author: pagesadmin_id,
          createdAt: new Date(),
          updatedAt: new Date()

        });
      }

      let page = Pages.findOne({indexName: "homepage"});

      page_id = page._id;
      if (PageContents.find({contentIndexName: "homepage_carousel"}).count() == 0) {
        PageContents.insert({
          type: "carousel",
          contentIndexName: "homepage_carousel",
          images: [{
            url: "/img/banner1.jpeg",
            buttonText: "立即体验",
            linkTo: '/member_abilites'
          },{
            url: "/img/banner2.jpeg",
            buttonText: '火爆预约',
            linkTo: '/member_abilites'
          },{
            url: "/img/banner3.jpeg",
            buttonText: '加入大家庭',
            linkTo: '/member_abilites'},
            ],
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 0,
        });
      }
      if (PageContents.find({contentIndexName: "homepage_slogan"}).count() == 0) {
        PageContents.insert({
          type: "slogan",
          contentIndexName: "homepage_slogan",
          imageLeft: {
            url: '/img/logo.png',
            link: '/',
            alt:"— 你在乘客左边，我们在你身边"
          },
          contentRight: "— 你在乘客左边，我们在你身边",
          link: '/',
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 1,
        });
      }
      if (PageContents.find({contentIndexName: "homepage_icon_list"}).count() == 0) {
        PageContents.insert({
          type: "icon_list",
          contentIndexName: "homepage_icon_list",
          list: [{
            icon: "phone",
            title: "免到店咨询服务"
          },{
            icon: "hand peace",
            title: "柜台预约在线咨询"
          },{
            icon: "payment",
            title: "车险折扣"
          }, {
            icon: "cart",
            title: "优质商品的廉价购买"
          },{
            icon: "student",
            title: "网约车个性化培训"
          }, {
            icon: "tags",
            title: "购车享有团购优惠"
          }],
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 2,
        });
      }
      if (PageContents.find({contentIndexName: "homepage_underline_title"}).count() == 0) {
        PageContents.insert({
          type: "underline_title",
          contentIndexName: "homepage_underline_title",
          content: "滴滴司机的福音",
          underlinewidth: "213",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 3,
        });
      }
      if (PageContents.find({contentIndexName: "homepage_right_image_content"}).count() == 0) {
        PageContents.insert({
          type: "right_image_content",
          contentIndexName: "homepage_right_image_content",
          title: "网约车必备的方式",
          content: "车主俱乐部取号一票难求？排队时间太长耽误挣钱？店内优惠活动不够？别着急，成为“万车汇”会员，享受在线预约柜台，优先预约培训，享有所有商品最低折扣！",
          image: {
            url: '/img/timg.jpeg',
            link: '/member_abilites',
            alt: "简单快乐地驾驶"
          },
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 4,
        });
      }
      if (PageContents.find({contentIndexName: "homepage_big_button_title"}).count() == 0) {
        PageContents.insert({
          type: "big_button_title",
          contentIndexName: "homepage_big_button_title",
          content: "立即预约",
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 5,
        });
      }
      if (PageContents.find({contentIndexName: "homepage_normal_content_with_bottom_button"}).count() == 0) {
        PageContents.insert({
          type: "normal_content_with_bottom_button",
          contentIndexName: "homepage_normal_content_with_bottom_button",
          title: "温度",
          content: "你说你淋过成都5点的雨，他说他知道夜里12点九眼桥上别人的温暖。每个人都把奋斗和坚持放在冰山之间， 光芒耀眼，却把痛苦、疲倦深藏海底，讳莫如深。赚钱是半辈子的功课，爱自己是一生的议题。有温暖的生活，有温度的驾驶。",
          buttonContent: "立刻预约",
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 6,
        });
      }
      if (PageContents.find({contentIndexName: "homepage_normal_content_with_bottom_button_two"}).count() == 0) {
        PageContents.insert({
          type: "normal_content_with_bottom_button",
          contentIndexName: "homepage_normal_content_with_bottom_button_two",
          title: "负责",
          content: "她说，你搬起砖就无法拥抱她。而你放下砖就无法养活她。那么，放下和搬起间，谁来拥抱你自己？万车汇会员给您温暖，给您有温度的驾驶。",
          buttonContent: "立刻预约",
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 7,
        });
      }

      //示例页面
      if (Pages.find({indexName: "samplepage" }).count() == 0) {
        let page_id = Pages.insert({
          title: '这是一个示例的页面！',
          indexName: "samplepage",
          author: pagesadmin_id,
          createdAt: new Date(),
          updatedAt: new Date()

        });
      }

      let samplepage = Pages.findOne({indexName: "samplepage"});

      page_id = samplepage._id;
      if (PageContents.find({contentIndexName: "sample_carousel"}).count() == 0) {
        PageContents.insert({
          type: "carousel",
          contentIndexName: "sample_carousel",
          images: [{
            url: "/img/banner1.jpeg",
            buttonText: "按钮文本",
            linkTo: '/member_abilites'
          },{
            url: "/img/banner2.jpeg",
            buttonText: '按钮文本',
            linkTo: '/member_abilites'
          },{
            url: "/img/banner3.jpeg",
            buttonText: '按钮文本',
            linkTo: '/member_abilites'},
            ],
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 0,
        });
      }
      if (PageContents.find({contentIndexName: "sample_slogan"}).count() == 0) {
        PageContents.insert({
          type: "slogan",
          contentIndexName: "sample_slogan",
          imageLeft: {
            url: '/img/logo.png',
            link: '/',
            alt:"— 你在乘客左边，我们在你身边"
          },
          contentRight: "— 在这里喊口号",
          link: '/',
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 1,
        });
      }
      if (PageContents.find({contentIndexName: "sample_icon_list"}).count() == 0) {
        PageContents.insert({
          type: "icon_list",
          contentIndexName: "sample_icon_list",
          list: [{
            icon: "phone",
            title: "图标下面的文本"
          },{
            icon: "hand peace",
            title: "图标下面的文本"
          },{
            icon: "payment",
            title: "图标下面的文本"
          }, {
            icon: "cart",
            title: "图标下面的文本"
          },{
            icon: "student",
            title: "图标下面的文本"
          }, {
            icon: "tags",
            title: "图标下面的文本"
          }],
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 2,
        });
      }
      if (PageContents.find({contentIndexName: "sample_underline_title"}).count() == 0) {
        PageContents.insert({
          type: "underline_title",
          contentIndexName: "sample_underline_title",
          content: "示例的下划线标题",
          underlinewidth: "213",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 3,
        });
      }
      if (PageContents.find({contentIndexName: "sample_right_image_content"}).count() == 0) {
        PageContents.insert({
          type: "right_image_content",
          contentIndexName: "sample_right_image_content",
          title: "标题文本",
          content: "示例内容请用markdown写",
          image: {
            url: '/img/timg.jpeg',
            link: '/member_abilites',
            alt: "简单快乐地驾驶"
          },
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 4,
        });
      }
      if (PageContents.find({contentIndexName: "sample_big_button_title"}).count() == 0) {
        PageContents.insert({
          type: "big_button_title",
          contentIndexName: "sample_big_button_title",
          content: "示例文本",
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 5,
        });
      }
      if (PageContents.find({contentIndexName: "sample_normal_content_with_bottom_button"}).count() == 0) {
        PageContents.insert({
          type: "normal_content_with_bottom_button",
          contentIndexName: "sample_normal_content_with_bottom_button",
          title: "标题文本",
          content: "示例内容（markdown）",
          buttonContent: "按钮示例内容",
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 6,
        });
      }
      if (PageContents.find({contentIndexName: "sample_icon_item_with_right_button"}).count() == 0) {
        PageContents.insert({
          type: "icon_item_with_right_button",
          icon: "hand",
          title: "大标题",
          subtitle: "副标题",
          content: "示例内容（markdown）",
          contentIndexName: "sample_icon_item_with_right_button",
          buttonText: "立刻预约",
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 7,
        });
      }
      if (PageContents.find({contentIndexName: "sample_simple_title"}).count() == 0) {
        PageContents.insert({
          type: "simple_title",
          title: "简单的大标题",
          link: "/member_abilites",
          createdAt: new Date(),
          updatedAt: new Date(),
          contentIndexName: "sample_simple_title",
          pageId: page_id,
          locationIndex: 8,
        });
      }
      if (PageContents.find({contentIndexName: "sample_simple_title_with_big_button"}).count() == 0) {
        PageContents.insert({
          type: "simple_title",
          title: "简单的大标题",
          buttonText: "按钮的示例文本",
          link: "/member_abilites",
          contentIndexName: "sample_simple_title_width_big_button",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageId: page_id,
          locationIndex: 9,
        });
      }


      //示例页面结束

      //开始构建账号wanchehui提供的的服务
      let wanchehui =  Meteor.users.findOne({username: "wanchehui"});

      let serviceId = null;

      if (Services.find({$and:[{name: "柜台业务"}, {title: "查询问题"}]}).count() == 0) {
        serviceId = Services.insert(
          {
            type: "预约",
            title: "查询问题",
            name: "柜台业务",
            userId: wanchehui._id,
            createdAt: new Date()
          }
        )
      }
      if (Arrangements.find({$and:
        [
          {serviceName: "柜台业务"},
          {serviceId: serviceId}
        ]
        }).count() == 0 ) {
        Arrangements.insert({
          serviceName: "柜台业务",
          type: "预约",
          title: "查询问题",
          serviceId: serviceId,
          availableTime: [
            {
              dayTime: '9:00-10:00',
              timeOff: '10:00',
              limit: 4,
            },
            {
              dayTime: '10:00-11:00',
              timeOff: '11:00',
              limit: 4,
            },
            {
              dayTime: '11:00-12:00',
              timeOff: '12:00',
              limit: 4,
            },
            {
              dayTime: '13:00-14:00',
              timeOff: '14:00',
              limit: 4,
            },
            {
              dayTime: '14:00-15:00',
              timeOff: '15:00',
              limit: 4,
            },
            {
              dayTime: '15:00-16:00',
              timeOff: '16:00',
              limit: 4,
            },
            {
              dayTime: '16:00-17:00',
              timeOff: '17:00',
              limit: 4,
            },
            {
              dayTime: '17:00-18:00',
              timeOff: '18:00',
              limit: 4,
            }
          ]
        });
      }
      if (Services.find({$and:[{name: "柜台业务"}, {title: "变更信息"}]}).count() == 0) {
        serviceId = Services.insert(
          {
            type: "预约",
            title: "变更信息",
            name: "柜台业务",
            userId: wanchehui._id,
            createdAt: new Date()
          }
        )
      }
      if (Arrangements.find({$and:
        [
          {serviceName: "柜台业务"},
          {serviceId: serviceId}
        ]
        }).count() == 0 ) {
        Arrangements.insert({
          serviceName: "柜台业务",
          type: "预约",
          title: "变更信息",
          serviceId: serviceId,
          availableTime: [
            {
              dayTime: '9:00-10:00',
              timeOff: '10:00',
              limit: 4,
            },
            {
              dayTime: '10:00-11:00',
              timeOff: '11:00',
              limit: 4,
            },
            {
              dayTime: '11:00-12:00',
              timeOff: '12:00',
              limit: 4,
            },
            {
              dayTime: '13:00-14:00',
              timeOff: '14:00',
              limit: 4,
            },
            {
              dayTime: '14:00-15:00',
              timeOff: '15:00',
              limit: 4,
            },
            {
              dayTime: '15:00-16:00',
              timeOff: '16:00',
              limit: 4,
            },
            {
              dayTime: '16:00-17:00',
              timeOff: '17:00',
              limit: 4,
            },
            {
              dayTime: '17:00-18:00',
              timeOff: '18:00',
              limit: 4,
            }
          ]
        });
      }

      if (Services.find({$and:[{name: "柜台业务"}, {title: "补齐资料"}]}).count() == 0) {
        serviceId = Services.insert(
          {
            type: "预约",
            title: "补齐资料",
            name: "柜台业务",
            userId: wanchehui._id,
            createdAt: new Date()
          }
        )
      }
      if (Arrangements.find({$and:
        [
          {serviceName: "柜台业务"},
          {serviceId: serviceId}
        ]
        }).count() == 0 ) {
        Arrangements.insert({
          serviceName: "柜台业务",
          type: "预约",
          title: "补齐资料",
          serviceId: serviceId,
          availableTime: [
            {
              dayTime: '9:00-10:00',
              timeOff: '10:00',
              limit: 4,
            },
            {
              dayTime: '10:00-11:00',
              timeOff: '11:00',
              limit: 4,
            },
            {
              dayTime: '11:00-12:00',
              timeOff: '12:00',
              limit: 4,
            },
            {
              dayTime: '13:00-14:00',
              timeOff: '14:00',
              limit: 4,
            },
            {
              dayTime: '14:00-15:00',
              timeOff: '15:00',
              limit: 4,
            },
            {
              dayTime: '15:00-16:00',
              timeOff: '16:00',
              limit: 4,
            },
            {
              dayTime: '16:00-17:00',
              timeOff: '17:00',
              limit: 4,
            },
            {
              dayTime: '17:00-18:00',
              timeOff: '18:00',
              limit: 4,
            }
          ]
        });
      }
      if (Services.find({$and:[{name: "柜台业务"}, {title: "解禁"}]}).count() == 0) {
        serviceId = Services.insert(
          {
            type: "预约",
            title: "解禁",
            name: "柜台业务",
            userId: wanchehui._id,
            createdAt: new Date()
          }
        )
      }
      if (Arrangements.find({$and:
        [
          {serviceName: "柜台业务"},
          {serviceId: serviceId}
        ]
        }).count() == 0 ) {
        Arrangements.insert({
          serviceName: "柜台业务",
          type: "预约",
          title: "解禁",
          serviceId: serviceId,
          availableTime: [
            {
              dayTime: '9:00-10:00',
              timeOff: '10:00',
              limit: 4,
            },
            {
              dayTime: '10:00-11:00',
              timeOff: '11:00',
              limit: 4,
            },
            {
              dayTime: '11:00-12:00',
              timeOff: '12:00',
              limit: 4,
            },
            {
              dayTime: '13:00-14:00',
              timeOff: '14:00',
              limit: 4,
            },
            {
              dayTime: '14:00-15:00',
              timeOff: '15:00',
              limit: 4,
            },
            {
              dayTime: '15:00-16:00',
              timeOff: '16:00',
              limit: 4,
            },
            {
              dayTime: '16:00-17:00',
              timeOff: '17:00',
              limit: 4,
            },
            {
              dayTime: '17:00-18:00',
              timeOff: '18:00',
              limit: 4,
            }
          ]
        });
      }
      if (Services.find({$and:[{name: "柜台业务"}, {title: "申诉"}]}).count() == 0) {
        serviceId = Services.insert(
          {
            type: "预约",
            title: "申诉",
            name: "柜台业务",
            userId: wanchehui._id,
            createdAt: new Date()
          }
        )
      }
      if (Arrangements.find({$and:
        [
          {serviceName: "柜台业务"},
          {serviceId: serviceId}
        ]
        }).count() == 0 ) {
        Arrangements.insert({
          serviceName: "柜台业务",
          type: "预约",
          title: "申诉",
          serviceId: serviceId,
          availableTime: [
            {
              dayTime: '9:00-10:00',
              timeOff: '10:00',
              limit: 4,
            },
            {
              dayTime: '10:00-11:00',
              timeOff: '11:00',
              limit: 4,
            },
            {
              dayTime: '11:00-12:00',
              timeOff: '12:00',
              limit: 4,
            },
            {
              dayTime: '13:00-14:00',
              timeOff: '14:00',
              limit: 4,
            },
            {
              dayTime: '14:00-15:00',
              timeOff: '15:00',
              limit: 4,
            },
            {
              dayTime: '15:00-16:00',
              timeOff: '16:00',
              limit: 4,
            },
            {
              dayTime: '16:00-17:00',
              timeOff: '17:00',
              limit: 4,
            },
            {
              dayTime: '17:00-18:00',
              timeOff: '18:00',
              limit: 4,
            }
          ]
        });
      }



  });

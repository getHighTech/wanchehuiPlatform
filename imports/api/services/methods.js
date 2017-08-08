import { Services } from './services.js';

Meteor.methods({
  'user.services'() {
    return Services.find({userId: Meteor.userId()});
  },
  'services.remove'(id){
    return Services.remove({_id: id});
  },
  //由万车汇或者其他第三方建立的服务项目
  'services.insert.from.user'(name, title, serviceType, serviceCards,serviceCoupons, description, serviceNotice, serviceIntro, userRequire,address){

    return Services.insert({
      name,
      title,
      serviceType,
      serviceCards,
      serviceCoupons,
      description,
      serviceNotice,
      serviceIntro,
      userRequire,
      address,
      createdAt: new Date(),
      publishedUserId: Meteor.userId()

    });

  },
  'services.update.from.user'(id, name, title, serviceType,
  serviceCards,serviceCoupons, description, serviceNotice,
  serviceIntro, userRequire,address){
      return Services.update(id,{
        $set:{
          name, title, serviceType,
          serviceCards,serviceCoupons, description, serviceNotice,
          serviceIntro, userRequire,address,
        }
      })
  },


  'services.insert'(service){
    if (Services.find({indexName: service.indexName}).count() > 0) {
      return "INDEXNAME_EXISTS";
    }
    let min_weight = 500;
    let roles = Meteor.user().roles;
    if (roles == undefined) {
      return "USER_DENY"
    }
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].weight < min_weight) {
        min_weight = roles[i].weight;
      }
    }
    if (min_weight > 50) {
      return "USER_DENY";
    }

    return Services.insert({
      address: service.address,
      type: service.type,
      name: service.name,
      title: service.title,
      userId: Meteor.userId(),
      indexName: service.indexName,
      requireName: service.requireName,
      requireMobile: service.requireMobile,
      requireGovNumber: service.requireGovNumber,
      requireCarNumber: service.arrequireCarNumberNumber,
      successNoticeText: service.successNoticeText
    });
  }
});

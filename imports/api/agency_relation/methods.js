import { Meteor } from 'meteor/meteor';
import { AgencyRelation } from './agency_relation.js';

Meteor.methods({
    'get.agency_relation.my.team'(userId){
        let record = AgencyRelation.find({'SuserId': userId,state:true}).fetch()
        if(record){
            record.forEach((item)=>{
                let user = Meteor.users.findOne({_id:item.userId})
                if(user){
                    item.username = user.username
                    if(user.profile){
                        item.mobile = user.profile.mobile
                    }else{
                        item.mobile = user.username
                    }
                }
            })
            return record
        }else{
            throw new Meteor.Error("该高级会员没有任何下级");
        }
    },
    'get.my.team.member.count'(userId){
        let count = AgencyRelation.find({ 'SuserId': userId,state:true}).count()
        return count
    }
})
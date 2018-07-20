import { Meteor } from 'meteor/meteor';
import { AgencyRelation } from './agency_relation.js';

Meteor.methods({
    'get.agency_relation.my.team'(userId){
        let record = AgencyRelation.find({SuserId:userId}).fetch()
        if(record){
            return record
        }else{
            throw new Meteor.Error("该高级会员没有任何下级");
        }
    },
    'get.my.team.member.count'(userId){
        let count = AgencyRelation.find({ 'SuserId': userId }).count()
        return count
    }
})
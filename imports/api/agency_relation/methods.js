import { Meteor } from 'meteor/meteor';
import { AgencyRelation } from './agency_relation.js';
import { Orders} from '../orders/orders'

Meteor.methods({
    'get.agency_relation.my.team'(userId){
        let record = AgencyRelation.find({'SuserId': userId,status:true}).fetch()
        if(record){
            record.forEach((item)=>{
                let user = Meteor.users.findOne({_id:item.userId})
                if(user){
                    item.username = user.username
                    let orders = Orders.find({userId:item.userId,status:true,appName:item.appName?item.appName:'wanrenchehui'})
                    let orders_count = orders.count()
                    let sales_value = 0
                    orders.forEach((item)=>{
                        sales_value += item.totalAmount
                    })
                    console.log(sales_value)
                    console.log(orders_count)
                    item.sales_value = sales_value
                    item.sales_volume = orders_count
                }
            })
            return record
        }else{
            throw new Meteor.Error("该高级会员没有任何下级");
        }
    },
    'get.my.team.member.count'(userId){
        let count = AgencyRelation.find({ 'SuserId': userId,status:true}).count()
        return count
    }
})
import React, { Component } from 'react';

import { Table, Icon, Divider, Tooltip,Button } from 'antd';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cards:[]
         }
    }
    componentWillMount(){
        let self = this
        let userId = Meteor.userId()
        console.log(userId)
        let shopId = ''
        Meteor.call('shops.getByCurrentUser', userId,function(err,rlt){
            if(!err){
                console.log(rlt)
                shopId = rlt[0]._id
                console.log(shopId)
                let condition = { shopId: shopId, $or: [{ productClass: 'advanced_card' }, { productClass: 'common_card' }] }
                Meteor.call('get.product.byShopIdOr', condition, function (err, rlt) {
                    if (!err) {
                        console.log(rlt)
                        self.setState({
                            cards: rlt
                        })
                    }
                })
            }
        })
    }
    giveItToUser(){

    }
    render() { 
        const columns = [{
            title: '会员卡名字',
            dataIndex: 'name_zh',
            key: 'name_zh',
        }, {
            title: '会员卡价格',
            dataIndex: 'endPrice',
            key: 'endPrice',
            render: (text, record) => {
                return (record.endPrice / 100 + '元')
            }
        }, {
            title: '会员卡分类',
            dataIndex: 'productClass',
            key: 'productClass',
        }, {
            title: '会员卡描述',
            dataIndex: 'description',
            key: 'description',
        }, {
        title: '授卡',
        key: 'action',
        render: (text, record) => (
            <span>
                <Tooltip placement="topLeft" title="授卡" arrowPointAtCenter>
                    <Button shape="circle" onClick={() => this.giveItToUser(record._id)} icon="user-add"/>
                </Tooltip>
            </span>
        ),
        }];

        const data = this.state.cards
        return (
        <div>
                <Table columns={columns} dataSource={data} rowKey='_id' />
        </div> )
    }
}
 
export default Cards;




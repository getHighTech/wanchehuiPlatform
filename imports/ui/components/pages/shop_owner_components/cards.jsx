import React, { Component } from 'react';

import { Table, Select, Tooltip,Button,Modal } from 'antd';
import { getMeteorUsersLimit } from '../../../services/users';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cards:[],
            visible:false,
            data:[],
            cardId:''
         }
    }
    componentDidMount(){
        let self = this
        let userId = Meteor.userId()
        console.log(userId)
        let shopId = ''
        Meteor.call('shops.getByCurrentUser', userId,function(err,rlt){
            if(!err){
                shopId = rlt._id
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
    giveItToUser = (cardId) => {
        console.log(cardId)
        this.setState({
            visible:true,
            cardId: cardId
        })
    }

    getPageUsers(page, pageSize, condition) {
        let self = this;
        getMeteorUsersLimit(condition, page, pageSize, function (err, rlt) {
            if (!err) {
                console.log(rlt)
                self.setState({ data: rlt, fetching: false });

            }
        })
    }
    handleUserChange = (value) => {
        this.setState({ data: [], fetching: true, confirmLoading: false });
        let condition = {
            $or: [
                { username: eval("/" + value + "/") }
            ]
        };
        this.getPageUsers(1, 20, condition);
        this.setState({ value: value })
        console.log(`selected ${value}`);
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    handleModalOk = () => {
        console.log(this.state.value)
        console.log(this.state.cardId)
        let cardId = this.state.cardId
        let username = this.state.value
        Meteor.call('product.cardBindToUser',cardId,username,function(err,alt){
            if(!err){
                console.log('授卡成功')
            }else{
                console.log(err.error)
            }
        })
        this.setState({
            visible: false,
        });
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
            dataIndex: 'brief',
            key: 'brief',
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

        const cards = this.state.cards
        const data = this.state.data

        return (
        <div>
                <Table columns={columns} dataSource={cards} rowKey='_id' />
            <Modal
                title="选择用户"
                visible={this.state.visible}
                onOk={this.handleModalOk.bind(this)}
                onCancel={this.hideModal}
                confirmLoading={this.state.hideModal}
            >
                <Select
                    mode="combobox"
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    style={this.props.style}
                    defaultActiveFirstOption={false}
                    dropdownStyle={{ zIndex: '99999' }}
                    style={{ width: '100%' }}
                    showArrow={false}
                    filterOption={false}
                    onChange={this.handleUserChange}
                >
                        {data.map(d => <Select.Option key={d.username}>{d.username}</Select.Option>)}
                </Select>
            </Modal>

        </div> )
    }
}
 
export default Cards;




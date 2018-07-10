import React, { Component } from 'react';
import { Table, Tooltip, Button, } from 'antd';
class Vips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advanced_vips: [],
            common_vips: [],
            visible: false,
            data: [],
            advance_card_id: '',
            common_card_id: '',
            advanced_card_name: '',
            common_card_name: '',
            AtotalCount:1000,
            CtotalCount: 1000,
            AcurrentPage:1,
            CcurrentPage:1.
        }
    }
    componentDidMount() {
        let self = this
        let userId = Meteor.userId()
        console.log(userId)
        let shopId = ''
        Meteor.call('shops.getByCurrentUser', userId, function (err, rlt) {
            if (!err) {
                shopId = rlt._id
                console.log(shopId)
                let condition1 = { shopId: shopId, productClass: 'advanced_card' }
                let condition2 = { shopId: shopId, productClass: 'common_card' }
                Meteor.call('get.product.vipcard.byShopId', condition1, function (err, rlt) {
                    if (!err) {
                        console.log(rlt)
                        self.setState({
                            advanced_card_name: rlt.name_zh,
                            advance_card_id: rlt._id
                        })
                    //找到高级会员卡
                    //查找高级会员卡用户
                        self.getPageAdvancedVips(rlt._id, 1, 5)
                    }
                })
                Meteor.call('get.product.vipcard.byShopId', condition2, function (err, rlt) {
                    if (!err) {
                        self.setState({
                            common_card_name: rlt.name_zh,
                            common_card_id: rlt._id
                        })
                        self.getPageCommonVips(rlt._id, 1, 5)
                    }
                })
            }
        })
    }

    getPageAdvancedVips(productId,page, pageSize) {
        let self = this;
        Meteor.call("get.card.product.users", productId, page, pageSize, function (error, result) {
            if (!error) {
                console.log(result)
                self.setState({
                    advanced_vips: result,
                    AcurrentPage: page,
                })
            }
        })
    }
    getPageCommonVips(productId, page, pageSize) {
        let self = this;
        Meteor.call("get.card.product.users", productId, page, pageSize, function (error, result) {
            if (!error) {
                console.log(result)
                self.setState({
                    common_vips: result,
                    CcurrentPage: page,
                })
            }
        })
    }
    handlePageChangeAdvancedVips(page, pageSize) {

        $(document).scrollTop(0);
        this.getPageAdvancedVips(this.state.advance_card_id,page, pageSize);
    }
    handlePageChangeCommonVips(page, pageSize) {
        $(document).scrollTop(0);
        this.getPageCommonVips(this.state.common_card_id, page, pageSize);
    }
    render() {
        const advanced_columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '手机号码',
            dataIndex: 'profile.mobile',
            key: 'profile.mobile',
        }, {
            title: '加入时间',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: '团队人数',
            dataIndex: 'members',
                key: 'members',
        }, {
            title: '查看团队',
            key: 'show',
            render: (text, record) => (
                <span>
                    <Tooltip placement="topLeft" title="授卡" arrowPointAtCenter>
                        <Button shape="circle" onClick={() => this.giveItToUser(record._id)} icon="user-add" />
                    </Tooltip>
                </span>
            ),
        }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Tooltip placement="topLeft" title="授卡" arrowPointAtCenter>
                    <Button shape="circle" onClick={() => this.giveItToUser(record._id)} icon="user-add" />
                </Tooltip>
            </span>
        ),
        }];
        const common_columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '手机号码',
            dataIndex: 'profile.mobile',
            key: 'profile.mobile',
        }, {
            title: '上级',
            dataIndex: 'productClass',
            key: 'productClass',
        }, {
            title: '总销售金额',
            dataIndex: 'brief',
            key: 'brief',
        }, {
            title: '总收入',
            dataIndex: 'aaa',
            key: 'aaa',
        }, {
            title: '总订单数量',
            dataIndex: 'bbb',
            key: 'bbbb',
        }, {
            title: '提现金额',
            dataIndex: 'ccc',
            key: 'ccc',
        }, {
            title: '操作',
            key: 'show',
            render: (text, record) => (
                <span>
                    <Tooltip placement="topLeft" title="授卡" arrowPointAtCenter>
                        <Button shape="circle" onClick={() => this.giveItToUser(record._id)} icon="user-add" />
                    </Tooltip>
                </span>
            ),
        }];
        const common_vips = this.state.common_vips
        const advanced_vips = this.state.advanced_vips
        return (
            <div>
                <h2>{this.state.advanced_card_name}会员</h2>
                <Table 
                columns={advanced_columns} 
                dataSource={advanced_vips} 
                rowKey='_id' 
                pagination={{
                    defaultPageSize: 5, total: this.state.AtotalCount,
                    onChange: (page, pageSize) => this.handlePageChangeAdvancedVips(page, pageSize),
                    showQuickJumper: true, current: this.state.AcurrentPage
                }}/>
                <h2>{this.state.common_card_name}会员</h2>
                <Table 
                columns={common_columns} 
                dataSource={common_vips} 
                rowKey='_id' 
                    pagination={{
                        defaultPageSize: 5, total: this.state.CtotalCount,
                        onChange: (page, pageSize) => this.handlePageChangeCommonVips(page, pageSize),
                        showQuickJumper: true, current: this.state.CcurrentPage
                    }} />
            </div>)
    }
} 
export default Vips;
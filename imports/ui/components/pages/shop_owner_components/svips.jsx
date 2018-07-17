import React, { Component } from 'react';
import { Table, Tooltip, Button, message, Modal, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { setAdvancedCard, setCommonCard } from '../../../actions/vips';

class Svips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advanced_vips: [],
            visible: false,
            data: [],
            advance_card_id: '',
            advanced_card_name: '',
            totalCount: 1000,
            currentPage: 1,
            members: [],
            showModal: false,
            memberCount: 0,
            joinTime: ''
        }
    }
    componentDidMount() {
        let self = this
        const { dispatch } = this.props;
        let userId = Meteor.userId()
        console.log(userId)
        let shopId = ''
        Meteor.call('shops.getByCurrentUser', userId, function (err, rlt) {
            if (!err) {
                shopId = rlt._id
                console.log(shopId)
                let condition1 = { shopId: shopId, productClass: 'advanced_card' }
                Meteor.call('get.product.vipcard.byShopId', condition1, function (err, rlt) {
                    if (!err) {
                        dispatch(setAdvancedCard(rlt))
                        self.setState({
                            advanced_card_name: rlt.name_zh,
                            advance_card_id: rlt._id
                        })
                        Meteor.call('get.vips.count',rlt._id,function(err,rlt){
                            if(!err){
                                self.setState({
                                    totalCount:rlt
                                })
                            }
                        })
                        //找到高级会员卡
                        //查找高级会员卡用户
                        self.getPageAdvancedVips(rlt._id, 1, 5)
                    }
                })
            }
        })
    }

    getPageAdvancedVips(productId, page, pageSize) {
        let self = this;
        Meteor.call("get.advancedCard.product.users", productId, page, pageSize, function (error, result) {
            if (!error) {
                console.log(result)
                self.setState({
                    advanced_vips: result,
                    currentPage: page,
                })
            }
        })
    }

    handlePageChangeAdvancedVips(page, pageSize) {

        $(document).scrollTop(0);
        this.getPageAdvancedVips(this.state.advance_card_id, page, pageSize);
    }

    showMyTeam(userId) {
        let self = this
        self.showMyTeamMemberCount(userId)
        self.showJoinTime(userId)
        self.showMyTeamDetails(userId)
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    }
    showMyTeamMemberCount(userId) {
        let self = this
        console.log('统计人数')
        Meteor.call('get.my.team.member.count', userId, function (err, alt) {
            if (!err) {
                console.log(alt)
                self.setState({
                    memberCount: alt,
                    showModal: true
                })
            }
        })
    }
    showJoinTime(userId) {
        let self = this
        Meteor.call('get.procductOwner.record.byUserId', userId, self.props.advancedCard, function (err, alt) {
            console.log(alt)
            if (!err) {
                self.setState({
                    joinTime: moment(alt.createdAt).format("YYYY-MM-DD HH:mm:ss")
                })
            }
        })
    }
    showMyTeamDetails(userId) {
        let self = this
        Meteor.call('get.agency_relation.my.team', userId, function (err, alt) {
            if (!err) {
                self.setState({
                    members: alt,
                })
            } else {
                message.error(err.error)
            }
        })
    }



    cancel(e) {
        console.log(e);
        message.error('操作取消');
    }
    banUserCard(userId) {
        let self = this
        console.log(self.props.advancedCard)
        console.log(userId)
        Meteor.call('product.cardUnbindUser', userId, self.props.advancedCard, function (err, alt) {
            if (!err) {
                message.success('解除绑定成功')
                self.getPageAdvancedVips(self.state.advance_card_id, 1, 5)
            } else {
                message.error(err.error)
            }
        })
    }
    render() {
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '手机号码',
                dataIndex: 'profile.mobile',
                key: 'profile.mobile',
            }
        ]
        const advanced_columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '手机号码',
            dataIndex: 'profile.mobile',
            key: 'profile.mobile',
        }, {
            title: '查看详情',
            key: 'show',
            render: (text, record) => (
                <span>
                    <Tooltip placement="topLeft" title="授卡" arrowPointAtCenter>
                        <Button shape="circle" onClick={() => this.showMyTeam(record._id)} icon="eye" />
                    </Tooltip>
                </span>
            ),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm title="确定要取消该用户的高级代理资格，请谨慎操作!" onConfirm={() => this.banUserCard(record._id)} onCancel={this.cancel} okText="Yes" cancelText="No">
                        <Button>
                            <span>禁卡</span>
                        </Button>
                    </Popconfirm>
                </span>
            ),
        }];
        const advanced_vips = this.state.advanced_vips
        return (
            <div>
                <h2>{this.state.advanced_card_name}会员</h2>
                <Table
                    columns={advanced_columns}
                    dataSource={advanced_vips}
                    rowKey='_id'
                    pagination={{
                        defaultPageSize: 5, total: this.state.totalCount,
                        onChange: (page, pageSize) => this.handlePageChangeAdvancedVips(page, pageSize),
                        showQuickJumper: true, current: this.state.currentPage
                    }} />
                <Modal
                    title="我的团队"
                    visible={this.state.showModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>加入时间：{this.state.joinTime}</div>
                    <p>团队人数：{this.state.memberCount}</p>
                    <Table
                        columns={columns}
                        dataSource={this.state.members}
                        rowKey='_id' />
                </Modal>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        advancedCard: state.VipCards.advancedCard,
        CurrentDealUser: state.CurrentDealUser
    };
}

export default connect(mapStateToProps)(Svips);
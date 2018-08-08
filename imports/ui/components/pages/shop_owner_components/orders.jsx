'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import 'antd/lib/card/style';
import { Table ,Divider} from 'antd';
import "antd/lib/icon/style";
import { Select } from 'antd';
import { Modal } from 'antd';
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import { Roles } from '/imports/api/roles/roles.js';
const Option = Select.Option;
import { Radio } from 'antd';
import { editOrderStatus } from '/imports/ui/actions/order_status.js';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import { Spin } from 'antd';
import { push } from 'react-router-redux';
import { fromValues } from "gl-matrix/src/gl-matrix/mat2d";
const RadioGroup = Radio.Group;

class OrdersForShop extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(this.props.getStatus);
    }
    state = {
        shopData: [],
        shopId: '',
        orderData: [],
        defaultShopName: '暂无商铺',
        shopkey: '',
        visible: false,
        changeStatus: [],
        localStatus: '',
        loading: false,
        totalCount:1,
        currentPage:1,
        detailsVisible:false
    }

    showModal = (status, _id) => {
        let currentUserId = Meteor.userId();
        let self = this;
        Meteor.call('rolesAcl.find_by_user_id', currentUserId, function (error, rlt) {
            console.log(rlt);
            if (!error) {
                if (!rlt) {
                    console.log('不能进行状态修改');
                    message.error('该用户不能进行状态修改');
                }
                else {

                    self.setState({
                        loading: true,
                        visible: true,
                        localStatus: status
                    });
                    const { dispatch } = self.props;
                    Meteor.call('get.OrderState.byStatus', status, function (err, alt) {
                        console.log(status)
                        let getStatus = [];
                        for (var i = 0; i < alt.length; i++) {
                            getStatus.push(alt[i].sTo)
                        }
                        self.setState({
                            changeStatus: getStatus
                        })
                        dispatch(editOrderStatus(getStatus, _id))

                    })
                }


            }
        })
    }
    handleOk = (e) => {
        let self = this;
        this.setState({
            visible: false,
        });
        console.log(self.props.id);
        console.log(self.state.localStatus);
        Meteor.call('shopOrder.findOne', self.props.id, function (error, result) {
            if (!error) {
                let id = result.orderId;
                Meteor.call('Orders.updateStatus', id, self.state.localStatus)
                self.setState({
                    loading: false
                });
            }
        })
        Meteor.call('shopOrders.updateStatus', self.props.id, self.state.localStatus, function (err, alt) {
            if (!err) {
                self.getProName();
            }
        })

    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
            loading: false
        });
    }


    handleChange(value) {
        let self = this;
        console.log(value);
        self.changeState(value);
    }
    changeState(value) {
        console.log(this.state.shopData);
    }

    componentDidMount() {
        let currentUserId = Meteor.userId();
        let self = this;
        self.setState({
            loading: true
        })
        let shopId = '';
        let condition = {};
        Meteor.call('shops.getByCurrentUser', currentUserId, function (err, rlt) {
            if (!err) {
                shopId = rlt._id;
                self.setState({
                    shopId: shopId,
                    shopData: rlt,
                    defaultShopName: rlt.name
                })
                Meteor.call('get.orders.count',shopId,function(error,result){
                  if (!error) {
                    console.log(result);
                    self.setState({
                      totalCount:result
                    })
                  }
                })
                console.log('拉取数据');
                self.getProName(1,20);

            }
        })


    }
    onChangeOrderStatus = (e) => {
        console.log(e.target.value);
        let localStatus = e.target.value;
        this.setState({
            localStatus: localStatus
        })
    }
    changeDetails = (_id) => {
        const { dispatch } = this.props;
        let self = this;
        console.log(_id);
        dispatch(push(`/orders/order_details/${_id}`));
    }
    handlePageChange(page,pageSize){
        console.log(page),
        console.log(pageSize),
            this.getProName( page, pageSize)
    }

    getProName(page,pageSize) {
        let shopId = this.state.shopId;
        console.log(shopId);
        let self = this;
        Meteor.call('get.byShopId', shopId, page,pageSize,function (err, alt) {
            if (!err) {
                // for (let i = 0; i < alt.length; i++) {
                //     let uI = i
                //     Meteor.call('get.order_status.name_zh.by_name',alt[i].status,function(err,rlt){
                //         alt[uI].status_zh = rlt
                //     })
                //     let productName = [];
                //     let OneOrderPro = alt[i].products;
                //     for (var j = 0; j < OneOrderPro.length; j++) {
                //         if (OneOrderPro[j].shopId == shopId) {
                //             productName.push(OneOrderPro[j].name_zh, <br key={j} />);
                //         }
                //     }
                    
                //     alt[i].ProCount = productName.length / 2;
                //     alt[i].ProName = productName;
                //     if (typeof (alt[i].contact) != 'undefined') {
                //         alt[i].name = alt[i].contact.name;
                //     }
                //     else {
                //         alt[i].name = alt[i].userId;
                //     }
                //     alt[i].ProPrice = alt[i].totalAmount / 100;
                // }
                console.log('最终数据结构')
                console.log(alt)
                self.setState({
                    orderData: alt,
                    currentPage: page,
                    loading: false
                })
            }
        })
    }
    hideDetailsModal(){
        this.setState({
            detailsVisible: false,
        });
    }
    showDetails(){
        this.setState({
            detailsVisible: true,
        });
    }

    render() {
        const { getStatus } = this.props
        const columns = [
            { title: '下单账号', width: 100, dataIndex: 'username', key: 'username' },
            { title: '订单号', width: 200, dataIndex: 'orderCode', key: 'orderCode' },
            // { title: '用户名', width: 100, dataIndex: 'name', key: 'name' },
            // { title: '商品名', width: 200, dataIndex: 'ProName', key: 'ProName' },
            // { title: '数量', dataIndex: 'ProCount', key: 'ProCount' },
            { title: '付款金额',width: 100, dataIndex: 'ProPrice', key: 'totalAmount',
            render: (text, record) => {
                return (<span>{record.totalAmount}元</span>);
            } 
            },
            {
                title: '下单时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
                width: 150,
                render: (text, record) => {
                    return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm")}</span>);
                }
            },
            { title: '状态', dataIndex: 'status_zh', key: 'status_zh',
            width: 100,
            render: (text, record) => {
                return (<span>{record.status_zh}</span>);
            }  },
            {
                title: '操作',
                key: 'operation',
                // fixed: 'right',
                width: 200,
                render: (text, record) => {
                    return (
                        // <Button type="primary" onClick={() => this.showModal(record.status, record._id)}>修改</Button>
                        <span>
                        <a href="javascript:;">修改状态</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={()=>this.showDetails(record)}>查看详情</a>
                        <Divider type="vertical" />
                      </span>
                        
                    )
                },
            },
            {
                title: '快递单号',
                key: 'action',
                // fixed: 'right',
                width: 200,
                render: (text, record) => {
                    const sended = record.tracking_number
                    return (
                        <div>   
                            {sended?(
                            <span>
                                <span>1202029039230238109212</span>
                                <Divider type="vertical" />
                                <a href="javascript:;">修改</a>
                                <Divider type="vertical" />
                              </span>
                            ):(
                            <span>
                                <a href="javascript:;">发货</a>
                            </span>     
                            )}
                        </div>
                        
                        // <Button type="primary" onClick={() => this.showModal(record.status, record._id)}>修改</Button>

                        
                    )
                },
            },
            // {
            //     title: '订单详情', key: 'details', render: (text, record) => {
            //         return (
            //             <Button type="primary" onClick={() => this.changeDetails(record._id)}>核销订单</Button>
            //         )
            //     }
            // }


        ];


        return (
            <div>
                <Spin spinning={this.state.loading}>
                    <Table columns={columns} dataSource={this.state.orderData} scroll={{ x: 1300 }}  pagination={{
                        defaultPageSize: 20, total: this.state.totalCount,
                        onChange: (page, pageSize) => this.handlePageChange(page, pageSize),
                        showQuickJumper: true, current: this.state.currentPage
                    }}  />
                </Spin>
                <Modal title="修改订单状态" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} okText="确认"
                    cancelText="取消">
                    <RadioGroup options={this.props.getStatus} onChange={this.onChangeOrderStatus} value={this.state.localStatus} />
                </Modal>
                <Modal
                    title="Modal"
                    visible={this.state.detailsVisible}
                    onOk={this.hideDetailsModal}
                    onCancel={this.hideDetailsModal}
                    okText="确认"
                    cancelText="取消"
                    >
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        getStatus: state.OrderStatus.OrderStatus,
        id: state.OrderStatus.Id,
    };
}

export default createContainer(() => {
    if (Meteor.userId()) {
        Meteor.subscribe('roles.current');
    }
    return {
        current_role: Roles.findOne({ users: { $all: [Meteor.userId()] } })
    };
}, connect(mapStateToProps)(OrdersForShop));

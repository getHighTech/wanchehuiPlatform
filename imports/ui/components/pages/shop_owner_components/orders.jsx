'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import 'antd/lib/card/style';
import {Table ,Divider,Input} from 'antd';
import "antd/lib/icon/style";
import { Select } from 'antd';
import { Modal } from 'antd';
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import { Roles } from '/imports/api/roles/roles.js';

import { Radio } from 'antd';
import { editOrderStatus } from '/imports/ui/actions/order_status.js';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import { Spin } from 'antd';
import { push } from 'react-router-redux';

const Option = Select.Option;

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
        detailsVisible:false,
        products:[],
        contact:'',
        productCounts:'',
        totalAmount:'',
        children:[],
        trackingNumber:'',
        shopOrderId:''
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
        Meteor.call('shopOrder.updateTrackingnumber',self.state.shopOrderId,self.state.trackingNumber,function(err,alt){
            console.log(self.state.shopOrderId)
            console.log(self.state.trackingNumber)
            if(!err){
                self.setState({
                    visible: false,
                    trackingNumber: ''
                });
                self.getProName(1, 20);
            }
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
            loading: false,
            trackingNumber: ''

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
    onFocus(arr){
        console.log('获取焦点')
        let self = this
        let newStatus = []
        for (var i = 0; i < arr.length; i++) {
            newStatus.push(<Option key={arr[i].name}>{arr[i].name_zh}</Option>)
          }
        self.setState({
            children: newStatus
        })
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
        Meteor.call('get.orders.byShopId', shopId, page,pageSize,function (err, alt) {
            if (!err) {
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
    showDetails(record){
        console.log(record)
        this.setState({
            detailsVisible: true,
            products:record.products,
            contact:record.contact,
            productCounts:record.productCounts,
            totalAmount:record.totalAmount
        });
    }
    handleStatusChange(value,record) {
        console.log(value.key)
        console.log(record._id)
        console.log(record.orderId)
        let currentUserId = Meteor.userId();
        let self = this;
        Meteor.call('rolesAcl.find_by_user_id', currentUserId, function (error, rlt) {
            console.log(rlt);
            if (!error) {
                if (!rlt) {
                    console.log('不能进行状态修改');
                    message.error('该用户不能进行状态修改');
                }
                else{
                    Meteor.call('shopOrders.updateStatus',record._id,record.orderId,value.key,function(err,alt){
                        if(!err){
                            message.success('状态修改成功！')
                        }else{
                            message.error(err.error);
                        }
                    })

                }


            }
        })

      }
    sendGood(id){
        console.log(id)
        this.setState({
            visible:true,
            shopOrderId:id
        })
    }
    updateTrackingNumber(id,number) {
        console.log(id)
        this.setState({
            visible: true,
            shopOrderId: id,
            trackingNumber: number
        })
    }
    onChangeTrackingNumber(e){
        console.log(e.target.value)
        this.setState({
            trackingNumber: e.target.value
        })
    }
    getDefaultValue(record){
        console.log(record)
        console.log('获取初始订单状态')
        return {
            label:record.status_zh,
            value:record.status
        }
    }
    
    render() {
        const { getStatus } = this.props
        const {products,contact,productCounts,totalAmount,children} = this.state
        console.log(products)
        console.log(contact)
        console.log(productCounts)
        console.log(totalAmount)
        let productsDom = []
        let concactDom =  []
        if(products.length>0){
            for (let i = 0; i < products.length; i++) {
                productsDom.push(
                <div>
                    <p>商品名称：{products[i].name_zh}</p>
                    <p>商品数量：{productCounts[products[i]._id]}</p>
                    <Divider/>
                </div>
                ) 
            }
        }
        if(contact){
                productsDom.push(
                <div>
                    <h4>收货地址</h4>
                    <p>收货人：{contact.name}</p>
                    <p>电话：{contact.mobile}</p>
                    <p>地址：{contact.address}</p>
                </div>
                ) 
        }
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
            { title: '状态', dataIndex: 'allStatus', key: 'allStatus',
            width: 100,
            render: (text, record) => {

                // return (<span>{record.status_zh}</span>);
                return (
                    <Select labelInValue value={this.getDefaultValue(record)} style={{ width: 120 }} onChange={(value)=>this.handleStatusChange(value,record)} onFocus={()=>this.onFocus(record.allStatus)} notFoundContent="没有转移状态">
                        {children}
                    </Select>

                )
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
                        <a href="javascript:;" onClick={()=>this.showDetails(record)}>查看详情</a>
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
                                <span>{record.tracking_number}</span>
                                <Divider type="vertical" />
                                    <a href="javascript:;" onClick={() => this.updateTrackingNumber(record._id, record.tracking_number)}>修改</a>
                                <Divider type="vertical" />
                              </span>
                            ):(
                            <span>
                                <a href="javascript:;" onClick={()=>this.sendGood(record._id)}>发货</a>
                            </span>     
                            )}
                        </div>
                        
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
                <Modal
                    title="订单详情"
                    visible={this.state.detailsVisible}
                    onOk={this.hideDetailsModal.bind(this)}
                    onCancel={this.hideDetailsModal.bind(this)}
                    okText="确认"
                    cancelText="取消"
                    >
                    {productsDom}
                    {concactDom}
                    <Divider/>
                    总金额：{totalAmount}元
                </Modal>
                <Modal
                    title="填写快递单号"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    
                >
                    <Input placeholder="请输入快递单号" value={this.state.trackingNumber} onChange={this.onChangeTrackingNumber.bind(this)}/>
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

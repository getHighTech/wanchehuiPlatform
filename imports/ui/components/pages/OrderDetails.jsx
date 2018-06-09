'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import "antd/lib/table/style";
import { Card, Col, Row } from 'antd';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import { Popconfirm, message, Button } from 'antd';
import { Table } from 'antd';
import { Roles } from '/imports/api/roles/roles.js';


import CommonModal from './shops_components/CommonModal.jsx';
import CommonForm from './shops_components/CommonForm.jsx'
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  }


class OrderDetails extends React.Component{
  constructor(props) {
    super(props);

  }
  state={
    order:[],
    orderProducts:[],
    buttonStatus:false
  }
  changeStatus=(status,orderCode)=>{
    let self = this;
    let id = self.props.params._id;
    Meteor.call('order.updateByOrderCode',orderCode,function(err,alt){
      if (!err) {
        self.getData(id);
      }
    })
  }
  changeStatusNo=()=>{

  }


  componentDidMount(){
    //如果存在ID，说明是编辑
    let self = this;
    let id = self.props.params._id;
    let ref ='http://localhost:3000/orders/order_details/'+id;
    console.log(ref);
    Meteor.call('get.shoporder',id,function(err,alt){
      if (!err) {
        console.log(alt);
        self.setState({
          buttonStatus:alt
        })
      }
      else {
        console.log(err);
      }
    })
  }
  getData(id){
    let self =this ;
    Meteor.call('shopOrder.getById',id,function(err,alt){
      if (!err) {
        console.log(alt);
        let order =alt;
        console.log(order);
        order.name=order.contact.name;
        console.log(order.contact);
        // order.products[0].price=order.products[0].price/100
        // order.products[0].status=order.status;
        // order.products[0].orderCode=order.orderCode;
        for (var i = 0; i < order.products.length; i++) {
          order.products[i].status=order.status;
          order.products[i].price=order.products[i].price/100
        }
        self.setState({
          order:order,
          orderProducts:order.products
        })
      }
    })
  }

  render() {
    console.log(this.state.order);
    console.log('---------------------');
    console.log(this.state.orderProducts);
    const columns=[
      {title:'商品名',width:100,dataIndex:'name_zh',key:'name'},
      {title:'商品价格',width:100,dataIndex:'price',key:'price'},
      {title:'商品简介',width:100,dataIndex:'brief',key:'brief'},
      {
        title: '交易时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
        render: (text, record) => {
          return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
        }
      },
      {title:'状态',width:100,dataIndex:'status',key:'status'},
      {title:'操作',width:100,key:'operation',render:(text,record)=>{
      //   return(
      //   // <Button type="primary" onClick={ () => this.changeStatus(record.status,record.orderCode)} >核销</Button>
      //
      //   <Popconfirm placement="bottom" title="请确定是否核销" onConfirm={() => this.changeStatus(record.status,record.orderCode)} okText="确定" onCancel={() => this.changeStatusNo()} cancelText="取消">
      //   <Button>核销</Button>
      // </Popconfirm>
      //
      //   )
          if (this.state.buttonStatus) {
            return(<Popconfirm placement="bottom" title="请确定是否核销" onConfirm={() => this.changeStatus(record.status,record.orderCode)} okText="确定" onCancel={() => this.changeStatusNo()} cancelText="取消">
              <Button>核销</Button>
             </Popconfirm>)
          }
          else {
            return(<span>非预约类商品不能进行核销</span>)
          }



      }}
    ]

    return (

      <div>

      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={8}>
          <Col span={4}>
            <Card title="用户" bordered={false}>{this.state.order.name}</Card>
          </Col>
          <Col span={4}>
            <Card title="订单号" bordered={false}>{this.state.order.orderCode}</Card>
          </Col>

        </Row>
      </div>

      <Table columns={columns} dataSource={this.state.orderProducts}  />


      </div>



    )
  }
}
function mapStateToProps(state) {
  return {
      ShopForm: state.ShopForm,
   };
}

export default  connect(mapStateToProps)(OrderDetails);

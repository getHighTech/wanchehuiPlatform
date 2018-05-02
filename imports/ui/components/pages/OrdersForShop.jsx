'use strict';

import React from "react";

import { connect } from 'react-redux';
import Card from 'antd/lib/card/';
import 'antd/lib/card/style';
import { Table } from 'antd';
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import { Select } from 'antd';

import Button from 'antd/lib/button';
import "antd/lib/button/style";

import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
const Option = Select.Option;
class OrdersForShop extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);

  }
  state={
    shopData:[],
    shopId:'',
    orderData:[],
    defaultShopName:'暂无商铺',
    shopkey:''
  }
   handleChange(value) {
     let self =this;
      console.log(value);
      self.changeState(value);
  }
  changeState(value){
    console.log(this.state.shopData);
  }

  componentDidMount(){
    let currentUserId = Meteor.userId();
    let self =this;
    let shopId='';
    Meteor.call('shops.getByCurrentUser', currentUserId,function(err,rlt){
      if(!err){
         shopId=rlt[0]._id;
        self.setState({
          shopId:shopId,
          shopData:rlt,
          defaultShopName:rlt[0].name
        })

        self.getProName();

      }
    })

  }
  getProName(){
    let shopId=this.state.shopId;
    let self =this;

    Meteor.call('orders.getShopId',shopId,function(erroy,result){
      console.log(result[0]);
      // let a =result[0]
      // Meteor.call('role_order_status.insert',a,function(err,alt){
      //   console.log(err);
      // })
      if(!erroy){
        for(var i = 0;i<result.length;i++){
          let productName=[];
          let productPrice=0;
          console.log(result[i].products);
          let OneOrderPro = result[i].products;
          for(var j = 0; j < OneOrderPro.length; j++){
            if(OneOrderPro[j].shopId==shopId){
              console.log(OneOrderPro[j].price);
              productPrice=productPrice+OneOrderPro[j].price;
              console.log(productPrice);
              productName.push(OneOrderPro[j].name,' ');
            }
          }
          console.log(productName.length);
          result[i].ProCount=productName.length/2;
          result[i].ProName=productName;
          result[i].ProPrice=productPrice/100
          console.log(result[i]);
        }
        self.setState({
          orderData:result
        })
      }
    })
  }


  render() {
          const columns = [
        { title: '订单号', width: 200, dataIndex: 'orderCode', key: 'orderCode', fixed: 'left' },
        { title: '用户名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: '商品名', width: 200, dataIndex: 'ProName', key: 'ProName' },
        { title: '数量', dataIndex: 'ProCount', key: 'ProCount' },
        { title: '价格', dataIndex: 'ProPrice', key: 'ProPrice' },
        {
          title: '交易时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 150,
          render: (text, record) => {
            return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
          }
        },
        // { title: '订单地址', dataIndex: 'address', key: 'address' },
        { title: '订单状态', dataIndex: 'status', key: 'status' },
        {
          title: '订单状态操作',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: (text,record) => {
            return(
              <Select defaultValue={record.status} onChange={this.handleChange.bind(this)}>
                <Option key='1'>未确认</Option>
                <Option key='2'>已确认</Option>
                <Option key='3'>未支付</Option>
                <Option key='4'>已支付</Option>
                <Option key='5'>已撤销</Option>
                <Option key='6'>已出货</Option>
                <Option key='7'>已退款</Option>
              </Select>
            )
          },
        },
      ];

      const shopOption=[];
      const shop=this.state.shopData;
      console.log(shop);
      for(let i=0;i<shop.length;i++){
        shopOption.push(<Option key ={i}>{shop[i].name}</Option>)
      }

    return (
      <div>
      <Select value={this.state.defaultShopName} style={{ width: 160 }} onChange={this.handleChange.bind(this)}>
           {shopOption}
      </Select>
        <Table columns={columns} dataSource={this.state.orderData} scroll={{ x: 1300 }} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(OrdersForShop);

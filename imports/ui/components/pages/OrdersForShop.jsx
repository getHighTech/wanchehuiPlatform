'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Card from 'antd/lib/card/';
import 'antd/lib/card/style';
import { Table } from 'antd';
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import { Select } from 'antd';
import { Modal} from 'antd';
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import { Roles } from '/imports/api/roles/roles.js';
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
const Option = Select.Option;
import { Radio } from 'antd';
import { editOrderStatus } from '/imports/ui/actions/order_status.js';
import message from 'antd/lib/message';
import 'antd/lib/message/style';

const RadioGroup = Radio.Group;

class OrdersForShop extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
    console.log(this.props.getStatus);
  }
  state={
    shopData:[],
    shopId:'',
    orderData:[],
    defaultShopName:'暂无商铺',
    shopkey:'',
    visible: false,
    changeStatus:[],
    localStatus:'',
  }

  showModal = (status,_id) => {
    let currentUserId = Meteor.userId();
    console.log(currentUserId);
    let self =this;
    Meteor.call('rolesAcl.find_by_user_id',currentUserId,function(error,rlt){
      console.log(rlt);
      if(!error){
              if(rlt.indexOf('true') == -1){
                console.log('不能进行状态修改');
                message.error('该用户不能进行状态修改');
              }
              else {
                let id = _id;
                self.setState({
                  visible: true,
                  localStatus:status
                });
                const {dispatch } = self.props;
                Meteor.call('get.OrderState.byStatus',status,function(err,alt){
                  let getStatus=[];
                  for(var i=0;i<alt.length;i++){
                    getStatus.push(alt[i].sTo)
                  }
                  self.setState({
                    changeStatus:getStatus
                  })
                  dispatch(editOrderStatus(getStatus,id))

                })
              }


      }
    })




  }
  handleOk = (e) => {
    let self =this;
    this.setState({
      visible: false,
    });
    Meteor.call('shopOrders.updateStatus',self.props.id,self.state.localStatus,function(err,alt){
      if(!err){
        self.getProName();
      }
    })

  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
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
    console.log(currentUserId);
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
  onChangeOrderStatus=(e)=>{
    console.log( e.target.value);
    let localStatus = e.target.value;
    this.setState({
      localStatus:localStatus
    })
  }


  getProName(){
    let shopId=this.state.shopId;
    let self =this;

    Meteor.call('orders.getShopId',shopId,function(erroy,result){
      if(!erroy){
        for(var i = 0;i<result.length;i++){
          let productName=[];
          let productPrice=0;
          let OneOrderPro = result[i].products;
          for(var j = 0; j < OneOrderPro.length; j++){
            if(OneOrderPro[j].shopId==shopId){
              productPrice=productPrice+OneOrderPro[j].price;
              productName.push(OneOrderPro[j].name,' ');
            }
          }
          result[i].ProCount=productName.length/2;
          result[i].ProName=productName;
          result[i].ProPrice=productPrice/100
        }
        self.setState({
          orderData:result
        })
      }
    })
  }


  render() {
    const {getStatus} = this.props
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
              <Button type="primary" onClick={ () => this.showModal(record.status,record._id)}>修改</Button>

            )
          },
        },


      ];

      const shopOption=[];
      const shop=this.state.shopData;
      for(let i=0;i<shop.length;i++){
        shopOption.push(<Option key ={i}>{shop[i].name}</Option>)
      }

    return (
      <div>
      <Select value={this.state.defaultShopName} style={{ width: 160 }} onChange={this.handleChange.bind(this)}>
           {shopOption}
      </Select>
        <Table columns={columns} dataSource={this.state.orderData} scroll={{ x: 1300 }} />
        <Modal  title="修改订单状态"  visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
          <RadioGroup options={this.props.getStatus}  onChange={this.onChangeOrderStatus}  value={this.state.localStatus}/>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    getStatus: state.OrderStatus.OrderStatus,
    id:state.OrderStatus.Id,
   };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(OrdersForShop));

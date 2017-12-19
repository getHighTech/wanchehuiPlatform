'use strict';

import React from "react";

import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import {getMeteorOrders,countOrders} from '../../services/orders.js';

import { Input } from 'antd';
import "antd/lib/input/style";
import { DatePicker } from 'antd';
import "antd/lib/date-picker/style";
import { Button } from 'antd';
import "antd/lib/button/style";
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import {Tooltip} from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
// import Button from 'antd/lib/button';
// import "antd/lib/button/style";
// import Modal from 'antd/lib/modal';

const Search = Input.Search;
const { RangePicker } = DatePicker;
import moment from 'moment';


const dateFormat = 'YYYY/MM/DD';

class Orders extends React.Component{
  constructor(props) {
    super(props);

  }
  state= {
    ordersData:[],
    loadingTip:"加载中...",
    condition: {},
    currentPage:1,
    totalCount:500,
    value:'全国',
  }

  componentDidMount(){
    let self = this;
    this.getOrders(1,20,this.state.condition);
    countOrders(this.state.condition,function(err,rlt){
        if(!err){
          self.setState({
            totalCount:rlt,
          })
          console.log(rlt);
        }
    })
  }

  handlePageChange(page, pageSize){
    $(document).scrollTop(0);
    this.getOrders(page, pageSize, this.state.condition);
  }



  toggleOrders(key) {
    let self = this;
    if(key=="paid"){
      let condition = {status:'paid'};
        self.getOrders(1,20,this.state.conditionPaid);
        countOrders(self.state.condition,function(err,rlt){
            if(!err){
              self.setState({
                totalCount:rlt,
              })
            }
        })
    }
    if(key=="unpaid"){
      let condition = {status:'unpaid'};
        self.getOrders(1,20,self.state.conditionUnpaid);
        countOrders(self.state.condition,function(err,rlt){
            if(!err){
              self.setState({
                totalCount:rlt,
              })
            }
        })
    }

  }


  getOrders(page,pageSize,condition){
    let self =this;
    getMeteorOrders(condition,page,pageSize,function(err,rlt){
      console.log(err);
      if(!err){
        console.log(rlt)
        self.setState({
          ordersData:rlt,
          currentPage:page,
        })
      //  console.log(rlt);
      }
    //  console.log(self.state.ordersData)
    })
  }



  onPayMoney = (_id) =>{
    let self = this
    confirm({
      title: '是否打款？！',
      content: '请确认打款金额，银行卡号，姓名！',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        Meteor.call("orders.status.updatePaid",_id,function(error,result){
          if(!error){
            console.log(result);
            self.getOrdersUnpaid(1,20,self.state.conditionUnpaid);

          }
          else {
            console.log(error);
          }
        })
        console.log('OK');
        message.success('已确认打款');
      },
      onCancel() {
        console.log('Cancel');
        message.error('已取消打款');
      },
    });

  }

  handleonChange(date, dateString) {
    console.log(date, dateString);
  }

  QuanguoLocation(){
    this.setState({
      value:'全国',
    })
  }

  BeijingLocation(){
    this.setState({
      value:'北京',
    })
  }

  ChengduLocation(){
    this.setState({
      value:'成都',
    })
  }





  render() {
    const actionStyle = {
      fontSize: 16, color: '#08c'
   };
    const OrdersColumns = [
      {
        title: '订单号',
        dataIndex: '_id',
        key: '_id',
        width: 150,
      },
    //   {
    //   title: '内部交易单号',
    //   dataIndex: '',
    //   key: '',
    //   width: 150,
    // },
     {
    //   title: '渠道交易单号',
    //   dataIndex: '',
    //   key: '',
    //   width: 150,
    // }, {
      title: '支付方式',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      render:(text,record) => {
        if(record.type=='card'){
          return(<span>微信支付</span>)
        }
      }
    },
    {
      title: '交易时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (text, record) => {
        return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
      }
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },{
      title: '姓名',
      dataIndex:'realNote.realName',
      key:'realNote.realName',
      width:150,
    },{
      title: '手机号',
      dataIndex:'mobile',
      key:'mobile',
      width:150,
    },{
      title:'车牌号',
      dataIndex:'realNote.carNumber',
      //key:'realNote.carNubmer',
      key:'realNote.carNumber',
      width:150
    },{
      title:'地区',
      dataIndex:'location',
      key:'location',
      width:150
    },{
      title:'订单金额',
      dataIndex:'price',
      key:'price',
      width:150
    },{
      title:'状态',
      dataIndex:'status',
      key:'status',
      width:150,
      render:(text,record) => {
        if(record.status=='paid'){
          return(<span>已支付</span>)
        }
      }
    },
    {
      title:'操作',
      dataIndex:'edit',
      key:'edit',
      width:150,
      // render: (text, record) => {
      //   return(
      //     <span>
      //     <Tooltip placement="topLeft" title="申请退款" arrowPointAtCenter>
      //       <Button  onClick={ () => this.onPayMoney(record._id)} style={actionStyle} ><span>申请退款</span></Button>
      //     </Tooltip>
      //      <span className="ant-divider" />
      //     // <Tooltip placement="topLeft" title="撤销此次提现" arrowPointAtCenter>
      //     //   <Button  onClick={ () => this.onReturnMoney(record._id)} style={actionStyle} ><span>撤销</span></Button>
      //     // </Tooltip>
      //     // <span className="ant-divider" />
      //   </span>)
      // }
    },
  ];
  const UnpaidOrdersColumns = [
    {
      title: '订单号',
      dataIndex:'_id',
      key:'_id',
      width:150,
    },
    {
      title: '交易时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (text, record) => {
        return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
      }
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },{
      title: '姓名',
      dataIndex:'realNote.realName',
      key:'realNote.realName',
      width:150,
    },{
      title: '手机号',
      dataIndex:'mobile',
      key:'mobile',
      width:150,
    },{
      title:'车牌号',
      dataIndex:'realNote.carNumber',
      key:'realNote.carNumber',
      width:150,
    },{
      title:'订单金额',
      dataIndex:'price',
      key:'price',
      width:150
    },
  ];
    return (<div>

    <Tabs defaultActiveKey="unpaid" onChange={this.toggleOrders.bind(this)}>
      <TabPane tab="已支付"　key="paid">
        <Table  dataSource={this.state.ordersData}  rowKey='_id'
          pagination={{defaultPageSize: 20, total: this.state.totalCount,
            onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
            showQuickJumper: true, current: this.state.currentPage}}
            columns={OrdersColumns}
        />
      </TabPane>
      <TabPane tab="未支付" key="unpaid">
        <Table  dataSource={this.state.ordersData}  rowKey='_id'
          pagination={{defaultPageSize: 20, total: this.state.totalCount,
          onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
          showQuickJumper: true, current: this.state.currentPage}}
          columns={UnpaidOrdersColumns}
        />
      </TabPane>

    </Tabs>
    </div>

    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Orders);

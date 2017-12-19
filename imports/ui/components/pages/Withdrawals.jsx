'use strict';

import React from "react";
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { showbalancedata } from '/imports/ui/actions/withdrawals.js';

import {getMeteorBalanceCharge,countBalanceCharge} from '../../services/balancecharges.js'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import message from 'antd/lib/message';
import 'antd/lib/message/style';

import DateRange from './withdrawals/DateRange.jsx';

const confirm = Modal.confirm;

class Withdrawals extends React.Component{
  constructor(props) {
    super(props);

  }


state= {
  balanceChargesData:[],
  loadingTip:"加载中...",
  condition:{},
  currentPage:1,
  totalCount:500,
}


getDateSearchData(rlt){
  this.setState({
    balanceChargesData:rlt
  })
  console.log(this.state.condition);
}

getChangeCondition(newcondition){
  this.setState({
    condition:newcondition
  })
    console.log(this.state.condition);
}


getDateSearchtotalCount(newtotalCount){
  this.setState({
    totalCount:newtotalCount
  })
}

componentDidMount(){
  let self = this;
  console.log(self.state.condition);
  let condition = {status:'unpaid'};
  self.getBalanceCharge(1,20,condition);
  countBalanceCharge(condition,function(err,rlt){
      if(!err){
        self.setState({
          totalCount:rlt,
        })
      }
  })
  console.log(self.state.condition);
  self.setState({
    condition
  })
  console.log(self.state.condition);
}

handlePageChange(page, pageSize){
  $(document).scrollTop(0);
  this.getBalanceCharge(page, pageSize, this.state.condition);
  console.log(this.state.condition);
}


toggleBalanceCharges(key) {
  let self = this;
  if(key=="unpaid"){
    let condition = {status:'unpaid'};
      self.getBalanceCharge(1,20,condition);
      countBalanceCharge(condition,function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
      })
      self.setState({
        condition
      })
  }
  if(key=="paid"){
    let condition = {status:'paid'};
      self.getBalanceCharge(1,20,condition);
      countBalanceCharge(condition,function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
      })
      self.setState({
        condition
      })
  }
  if(key=="revoke"){
    let condition = {status:'revoke'}
      self.getBalanceCharge(1,20,condition);
      countBalanceCharge(condition,function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
      })
      self.setState({
        condition
      })
  }

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
      Meteor.call("balancecharge.status.updatePaid",_id,function(error,result){
        if(!error){
          console.log(result);
          self.getBalanceCharge(1,20,self.state.condition);

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

onReturnMoney = (_id) =>{
  let self = this
  confirm({
    title: '是否撤销？！',
    content: '请确认是否撤销此次提现！',
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk() {
  let userId='';
  let money=null;
  let amount=null;
  Meteor.call('balance.chargesOne',_id,function(err,alt){
  userId=alt.userId;
  money=alt.money
    Meteor.call('balance.userId',userId,function(error,result){
      amount=result.amount
      console.log(userId,money,amount);
      Meteor.call('balances.updaterevoke.amount',userId,money,amount,function(wrong,rlt){

      })
    })
  })
  Meteor.call("balancecharge.status.updateRevoke",_id,function(error,result){
    if(!error){
      console.log(result);
      self.getBalanceCharge(1,20,self.state.condition);

    }
    else {
      console.log(error);
    }
      })
      console.log('OK');
      message.success('已撤销');
    },
  onCancel() {
    console.log('Cancel');
    message.error('已取消撤销');
  },
  });
}




getBalanceCharge(page,pageSize,condition){
  let self = this;

  getMeteorBalanceCharge(condition,page,pageSize,function(err,rlt){
    if(!err){
      self.setState({
        balanceChargesData:rlt,
        currentPage:page,
      })
    }
    console.log(rlt);
  })
}

handleonChange(date, dateString) {
  console.log(date, dateString);
}



  render() {
    const actionStyle = {
      fontSize: 16, color: '#08c'
   };
    const BalanceColumns = [
      {
        title: '提现记录id',
        dataIndex: '_id',
        key: '_id',
        width: 150,
      },{
        title: '银行卡号',
        dataIndex: 'bankId',
        key: 'bankId',
        width: 150,
      },{
        title: '开户行',
        dataIndex: 'address',
        key: 'address',
        width: 150,
      },
      {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      width: 100,
    },  {
      title: '姓名',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (text, record) => {
        return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render:(text,record) => {
        if(record.status=='unpaid'){
          return(<span>未打款</span>)
        }
        if(record.status=='paid'){
          return(<span>已打款</span>)
        }
        if(record.status=='revoke'){
          return(<span>已撤销</span>)
        }
      }
    },{
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text, record) => {
        if(record.status=='unpaid'){
        return(
          <span>
          <Tooltip placement="topLeft" title="为用户打款" arrowPointAtCenter>
            <Button  onClick={ () => this.onPayMoney(record._id)} style={actionStyle} ><span>打款</span></Button>
          </Tooltip>
          <span className="ant-divider" />
          <Tooltip placement="topLeft" title="撤销此提现" arrowPointAtCenter>
            <Button  onClick={ () => this.onReturnMoney(record._id)} style={actionStyle} ><span>撤销</span></Button>
          </Tooltip>
          <span className="ant-divider" />

        </span>)
      }
    },
    }
  ];

    return (
      <div>

      <Tabs defaultActiveKey="unpaid" onChange={this.toggleBalanceCharges.bind(this)} style={{marginLeft:"0"}}>
    <TabPane tab="未打款" key="unpaid">
    <DateRange
    getDateSearchData={this.getDateSearchData.bind(this)}
    getChangeCondition={this.getChangeCondition.bind(this)}
    getDateSearchtotalCount ={this.getDateSearchtotalCount.bind(this)}
    SearchCondition = {this.state.condition}
    />
    <Table  dataSource={this.state.balanceChargesData}
            rowKey='_id'
            pagination={{defaultPageSize: 20,
                         total: this.state.totalCount,
                         onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
                         showQuickJumper: true,
                         current: this.state.currentPage
     }}
     columns={BalanceColumns} />
     </TabPane>
    <TabPane tab="已打款" key="paid">
    <DateRange
    getDateSearchData={this.getDateSearchData.bind(this)}
    getChangeCondition={this.getChangeCondition.bind(this)}
    getDateSearchtotalCount ={this.getDateSearchtotalCount.bind(this)}
    SearchCondition = {this.state.condition}
    />
    <Table  dataSource={this.state.balanceChargesData}
            rowKey='_id'
            pagination={{defaultPageSize: 20,
                         total: this.state.totalCount,
                         onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
                         showQuickJumper: true,
                         current: this.state.currentPage
     }}
     columns={BalanceColumns} />
    </TabPane>
    <TabPane tab="已撤销" key="revoke">
    <DateRange
    getDateSearchData={this.getDateSearchData.bind(this)}
    getChangeCondition={this.getChangeCondition.bind(this)}
    getDateSearchtotalCount ={this.getDateSearchtotalCount.bind(this)}
    SearchCondition = {this.state.condition}
    />
    <Table  dataSource={this.state.balanceChargesData}
            rowKey='_id'
            pagination={{defaultPageSize: 20,
                         total: this.state.totalCount,
                         onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
                         showQuickJumper: true,
                         current: this.state.currentPage
     }}
     columns={BalanceColumns} />
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

export default connect(mapStateToProps)(Withdrawals);

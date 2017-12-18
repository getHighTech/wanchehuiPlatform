'use strict';

import React from "react";
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { showbalancedata } from '/imports/ui/actions/withdrawals.js';

import {getMeteorBalanceChargeUnpaid,getMeteorBalanceChargePaid,getMeteorBalanceChargeRevoke,countBalanceCharge} from '../../services/balancecharges.js'
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

const confirm = Modal.confirm;

class Withdrawals extends React.Component{
  constructor(props) {
    super(props);

  }


state= {
  balanceChargesData:[],
  loadingTip:"加载中...",
  conditionUnpaid: {status:'unpaid'},
  conditionPaid: {status:'paid'},
  conditionRevoke: {status:'revoke'},
  currentPage:1,
  totalCount:500,
}

//获取数据
componentDidMount(){
  let self = this;
  self.getBalanceChargeUnpaid(1,20,this.state.conditionUnpaid);
  countBalanceCharge(this.state.conditionUnpaid,function(err,rlt){
      if(!err){
        self.setState({
          totalCount:rlt,
        })
      }
  })
}

handlePageChangeUnpaid(page, pageSize){
  $(document).scrollTop(0);
  this.getBalanceChargeUnpaid(page, pageSize, this.state.conditionUnpaid);
}

handlePageChangePaid(page, pageSize){
  $(document).scrollTop(0);
  this.getBalanceChargePaid(page, pageSize, this.state.conditionPaid);
}

handlePageChangeRevoke(page, pageSize){

  $(document).scrollTop(0);
  this.getBalanceChargeRevoke(page, pageSize, this.state.conditionRevoke);
}

toggleBalanceCharges(key) {
  let self = this;
  if(key=="unpaid"){
      self.getBalanceChargeUnpaid(1,20,self.state.conditionUnpaid);
      countBalanceCharge(self.state.conditionUnpaid,function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
      })
  }
  if(key=="paid"){
      self.getBalanceChargePaid(1,20,this.state.conditionPaid);
      countBalanceCharge(self.state.conditionPaid,function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
      })
  }
  if(key=="revoke"){
      self.getBalanceChargeRevoke(1,20,this.state.conditionRevoke);
      countBalanceCharge(self.state.conditionRevoke,function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
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
          self.getBalanceChargeUnpaid(1,20,self.state.conditionUnpaid);

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


getBalanceChargeUnpaid(page,pageSize,conditionUnpaid){
  let self = this;
  getMeteorBalanceChargeUnpaid(conditionUnpaid,page,pageSize,function(err,rlt){
    if(!err){
      self.setState({
        balanceChargesData:rlt,
        currentPage:page,
      })
    }
      console.log(self.state.balanceChargesData)
  })
}

getBalanceChargePaid(page,pageSize,conditionPaid){
  let self = this;
  getMeteorBalanceChargePaid(conditionPaid,page,pageSize,function(err,rlt){
    if(!err){
      self.setState({
        balanceChargesData:rlt,
        currentPage:page,
      })
    }
  })
}

getBalanceChargeRevoke(page,pageSize,conditionRevoke){
  let self = this;
  getMeteorBalanceChargeRevoke(conditionRevoke,page,pageSize,function(err,rlt){

    if(!err){
      self.setState({
        balanceChargesData:rlt,
        currentPage:page,
      })
    }
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
          <Tooltip placement="topLeft" title="撤销此次提现" arrowPointAtCenter>
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
    <Table  dataSource={this.state.balanceChargesData}
            rowKey='_id'
            pagination={{defaultPageSize: 20,
                         total: this.state.totalCount,
                         onChange: (page, pageSize)=> this.handlePageChangeUnpaid(page, pageSize),
                         showQuickJumper: true,
                         current: this.state.currentPage
     }}
     columns={BalanceColumns} />
     </TabPane>
    <TabPane tab="已打款" key="paid">
    <Table  dataSource={this.state.balanceChargesData}
            rowKey='_id'
            pagination={{defaultPageSize: 20,
                         total: this.state.totalCount,
                         onChange: (page, pageSize)=> this.handlePageChangePaid(page, pageSize),
                         showQuickJumper: true,
                         current: this.state.currentPage
     }}
     columns={BalanceColumns} />
    </TabPane>
    <TabPane tab="已撤销" key="revoke">
    <Table  dataSource={this.state.balanceChargesData}
            rowKey='_id'
            pagination={{defaultPageSize: 20,
                         total: this.state.totalCount,
                         onChange: (page, pageSize)=> this.handlePageChangeRevoke(page, pageSize),
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

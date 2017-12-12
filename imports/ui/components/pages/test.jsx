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


componentDidMount(){
  let self = this;
  self.getBalanceChargeUnpaid(1,20,this.state.conditionUnpaid);
  console.log(self.state.balanceChargesData);
  console.log("componentDidMount",self.state.balanceChargesData[0]);
  countBalanceCharge(function(err,rlt){
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
  console.log(page,pageSize,this.state.condition);
}

handlePageChangePaid(page, pageSize){
  $(document).scrollTop(0);
  this.getBalanceChargePaid(page, pageSize, this.state.conditionPaid);
  console.log(page,pageSize,this.state.condition);
}

handlePageChangeRevoke(page, pageSize){
  $(document).scrollTop(0);
  this.getBalanceChargeRevoke(page, pageSize, this.state.conditionRevoke);
  console.log(page,pageSize,this.state.conditionRevoke);
}

toggleBalanceCharges(key) {
  let self = this;
  console.log(key);
  if(key=="unpaid"){
      self.getBalanceChargeUnpaid(1,20,this.state.conditionUnpaid);
      countBalanceCharge(function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
      })
  }
  if(key=="paid"){
      self.getBalanceChargePaid(1,20,this.state.conditionPaid);
      countBalanceCharge(function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
      })
  }
  if(key=="revoke"){
      self.getBalanceChargeRevoke(1,20,this.state.conditionRevoke);
      countBalanceCharge(function(err,rlt){
          if(!err){
            self.setState({
              totalCount:rlt,
            })
          }
      })
  }

}









getBalanceChargeUnpaid(page,pageSize,conditionUnpaid){
  let self = this;
  getMeteorBalanceChargeUnpaid(conditionUnpaid,page,pageSize,function(err,rlt){
    if(!err){
      console.log(rlt)
      self.setState({
        balanceChargesData:rlt,
        currentPage:page,
      })
      console.log(rlt);
    }
    console.log(self.state.balanceChargesData)
  })
}

getBalanceChargePaid(page,pageSize,conditionPaid){
  let self = this;
  getMeteorBalanceChargePaid(conditionPaid,page,pageSize,function(err,rlt){
    if(!err){
      console.log(rlt)
      self.setState({
        balanceChargesData:rlt,
        currentPage:page,
      })
      console.log(rlt);
    }
    console.log(self.state.balanceChargesData)
  })
}

getBalanceChargeRevoke(page,pageSize,conditionRevoke){
  let self = this;
  getMeteorBalanceChargeRevoke(conditionRevoke,page,pageSize,function(err,rlt){
    if(!err){
      console.log(rlt)
      self.setState({
        balanceChargesData:rlt,
        currentPage:page,
      })
      console.log(rlt);
    }
    console.log(self.state.balanceChargesData)
  })
}


  render() {
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
    },
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

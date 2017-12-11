'use strict';

import React from "react";
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { showbalancedata } from '/imports/ui/actions/withdrawals.js';
import {getMeteorBalanceCharge,countBalanceCharge} from '../../services/balancecharges.js'


class Withdrawals extends React.Component{
  constructor(props) {
    super(props);

  }
state= {
  balanceChargesData:[],
  loadingTip:"加载中...",
  condition: {},
  currentPage:1,
  totalCount:500,
}




componentDidMount(){
  let self = this;

  this.getBalanceCharge(1,20,this.state.condition);
  // console.log(self.state.balanceChargesData);
  // console.log("componentDidMount",self.state.balanceChargesData[0]);

  countBalanceCharge(function(err,rlt){
      if(!err){
        self.setState({
          totalCount:rlt,
        })
      }
  })
}



handlePageChange(page, pageSize){
  $(document).scrollTop(0);
  this.getBalanceCharge(page, pageSize, this.state.condition);
  console.log(page,pageSize,this.state.condition);
}


getBalanceCharge(page,pageSize,condition){
  let self = this;
  getMeteorBalanceCharge(condition,page,pageSize,function(err,rlt){
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
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
    },
  ];
    return (
      <div>  <Table  dataSource={this.state.balanceChargesData}  rowKey='_id'
      pagination={{defaultPageSize: 20, total: this.state.totalCount,
         onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
         showQuickJumper: true, current: this.state.currentPage
       }}
       columns={BalanceColumns} /></div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Withdrawals);

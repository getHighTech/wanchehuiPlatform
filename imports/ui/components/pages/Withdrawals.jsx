'use strict';

import React from "react";
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { showbalancedata } from '/imports/ui/actions/withdrawals.js';

import {getMeteorBalanceCharge} from '../../services/balancecharges.js'


class Withdrawals extends React.Component{
  constructor(props) {
    super(props);

  }
state= {
  balanceChargesData:[],
  loadingTip:"加载中...",
  condition: {},
}

getBalanceCharge(page,pageSize,condition){
  let self =this;
  getMeteorBalanceCharge(condition,page,pageSize,function(err,rlt){
    if(!err){
      self.setState({
        balanceChargesData:rlt,
      })
      console.log(rlt);
    }
  })
}


componentDidMount(){
  this.getBalanceCharge(1,20,this.state.condition);
}


  render() {
    const BalanceColumns = [
      {
        title: '提现记录id',
        dataIndex: '_id',
        key: '_id',
        width: 150,
      },
      {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      width: 150,
    }, {
      title: '银行卡号',
      dataIndex: 'bankId',
      key: 'bankId',
      width: 150,
    }, {
      title: '姓名',
      dataIndex: 'userId',
      key: 'name',
      width: 150,
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
      <div>  <Table  dataSource={this.state.balanceChargesData} columns={BalanceColumns} /></div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Withdrawals);

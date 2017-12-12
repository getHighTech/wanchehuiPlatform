'use strict';

import React from "react";
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { showbalancedata } from '/imports/ui/actions/withdrawals.js';
import {getMeteorBalanceCharge,countBalanceCharge} from '../../services/balancecharges.js'
import { Input } from 'antd';
import { DatePicker } from 'antd';
import { Button } from 'antd';

const Search = Input.Search;
const { RangePicker } = DatePicker;
import moment from 'moment';


const dateFormat = 'YYYY/MM/DD';


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


// handleChange(value, dateString) {
//   console.log('Selected Time: ', value);
//   console.log('Formatted Selected Time: ', dateString);
// }
//
// handleOk(value) {
//   console.log('onOk: ', value);
// }

getBalanceCharge(page,pageSize,condition){
  let self =this;
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

handleonChange(date, dateString) {
  console.log(date, dateString);
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
    return (<div >
      <div style={{padding:'20px',background: 'rgb(236, 236, 236)'}}>
      <span>关键字：</span>
        <Search placeholder="input search text" style= {{width:250}}
        onSearch = {value =>console.log(value)}/>
        <span style={{margin:'0px 0px 0px 20px'}}>时间筛选：</span>
        <DatePicker className="startdate" onChange = {this.handleonChange}
        style={{width:'250px',display:'inline-block'}}/>
        <span> - </span>
        <DatePicker className="enddate" onChange = {this.handleonChange}
        style={{width:'250px',display:'inline-block',}}/>
         <Button type="primary" style={{margin:'0px 10px 0px 10px',background:'#434547'}}>搜索</Button>

        <div style={{margin:'20px 10px 0px 0px'}}>
          <span>区域筛选：</span>
           <Button type="primary" style={{margin:'0px 10px 0px 10px'}}>全国</Button>
           <Button type="primary" onClick={this.handleClick}>北京</Button>
           <Button type="primary" style={{margin:'0px 25px 0px 10px'}}>成都</Button>
          <span>当前查询区域：</span>
        </div>
        <div style={{margin:'20px 10px 0px 0px'}}>
          <span>时段筛选：</span>
          <Button type="primary" style={{margin:'0px 10px 0px 10px'}}>今日</Button>
          <Button type="primary">昨日</Button>
          <Button type="primary" style={{margin:'0px 10px 0px 10px'}}>最近７天</Button>
          <Button type="primary" >最近３０天</Button>
        </div>

      </div>

        <Table  dataSource={this.state.balanceChargesData}  rowKey='_id'
          pagination={{defaultPageSize: 20, total: this.state.totalCount,
          onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
          showQuickJumper: true, current: this.state.currentPage}}
          columns={BalanceColumns}
        />
       </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Withdrawals);

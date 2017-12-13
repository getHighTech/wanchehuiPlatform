'use strict';

import React from "react";
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { showbalancedata } from '/imports/ui/actions/withdrawals.js';
<<<<<<< HEAD
import {getMeteorBalanceCharge,countBalanceCharge} from '../../services/balancecharges.js'
import { Input } from 'antd';
import { DatePicker } from 'antd';
import { Button } from 'antd';

const Search = Input.Search;
const { RangePicker } = DatePicker;
import moment from 'moment';


const dateFormat = 'YYYY/MM/DD';
=======
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
>>>>>>> 433bd4413f775b7d335e5a05125e2f48602a5400



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

<<<<<<< HEAD
componentDidMount(){
  let self = this;
  self.getBalanceCharge(1,20,this.state.condition);
  countBalanceCharge(function(err,rlt){
=======

componentDidMount(){
  let self = this;
  self.getBalanceChargeUnpaid(1,20,this.state.conditionUnpaid);
  countBalanceCharge(this.state.conditionUnpaid,function(err,rlt){
>>>>>>> 433bd4413f775b7d335e5a05125e2f48602a5400
      if(!err){
        self.setState({
          totalCount:rlt,
        })
      }
  })
}

<<<<<<< HEAD
handlePageChange(page, pageSize){
=======
handlePageChangeUnpaid(page, pageSize){
  $(document).scrollTop(0);
  this.getBalanceChargeUnpaid(page, pageSize, this.state.conditionUnpaid);
}

handlePageChangePaid(page, pageSize){
  $(document).scrollTop(0);
  this.getBalanceChargePaid(page, pageSize, this.state.conditionPaid);
}

handlePageChangeRevoke(page, pageSize){
>>>>>>> 433bd4413f775b7d335e5a05125e2f48602a5400
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

// reflashTable(){
//   let self = this;
//
// }



<<<<<<< HEAD
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
=======


getBalanceChargeUnpaid(page,pageSize,conditionUnpaid){
  let self = this;
  getMeteorBalanceChargeUnpaid(conditionUnpaid,page,pageSize,function(err,rlt){
    if(!err){
      self.setState({
        balanceChargesData:rlt,
        currentPage:page,
      })
    }
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
>>>>>>> 433bd4413f775b7d335e5a05125e2f48602a5400
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
<<<<<<< HEAD
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
=======
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


>>>>>>> 433bd4413f775b7d335e5a05125e2f48602a5400
       </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Withdrawals);

'use strict';

import React from "react";

import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import {getMeteorOrders,countOrders} from '../../services/orders.js'

import { Input } from 'antd';
import { DatePicker } from 'antd';
import "antd/lib/date-picker/style";
import { Button } from 'antd';
import "antd/lib/button/style";

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
    countOrders(function(err,rlt){
        if(!err){
          self.setState({
            totalCount:rlt,
          })
          console.log(rtl);
        }
    })

  }

  handlePageChange(page, pageSize){
    $(document).scrollTop(0);
    this.getOrders(page, pageSize, this.state.condition);
    console.log(page,pageSize,this.state.condition);
  }

  getOrders(page,pageSize,condition){
    let self =this;
    getMeteorOrders(condition,page,pageSize,function(err,rlt){
      if(!err){
        console.log(rlt)
        self.setState({
          ordersData:rlt,
          currentPage:page,
        })
      //  console.log(rlt);
      }
      console.log(self.state.ordersData)
    })
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
    const OrdersColumns = [
      {
        title: '订单号',
        dataIndex: '_id',
        key: '_id',
        width: 150,
      },
      {
      title: '内部交易单号',
      dataIndex: '',
      key: '',
      width: 150,
    }, {
      title: '渠道交易单号',
      dataIndex: '',
      key: '',
      width: 150,
    }, {
      title: '支付方式',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },
    {
      title: '交易时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 150,
    },{
      title: '姓名',
      dataIndex:'name',
      key:'name',
      width:150,
    },{
      title: '手机号',
      dataIndex:'mobile',
      key:'mobile',
      width:150,
    },{
      title:'车牌号',
      dataIndex:'carNubmer',
      key:'carNubmer',
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
      title:'操作',
      dataIndex:'edit',
      key:'edit',
      width:150
    },{
      title:'状态',
      dataIndex:'status',
      key:'status',
      width:150
    }
  ];
    return (<div>
      <div style={{padding:'20px',background: 'rgb(236, 236, 236)'}}>
        <span>关键字：</span>
        <Search placeholder="input search text" style= {{width:250}}
        onSearch = {value =>console.log(value)}/>

        <span style={{margin:'0px 0px 0px 20px'}}>时间筛选：</span>
        <DatePicker className="startdate" onChange = {this.handleonChange}/>
        <span> - </span>
        <DatePicker className="enddate" onChange = {this.handleonChange}/>

        <Button type="primary" style={{margin:'0px 10px 0px 10px',background:'#434547'}}>搜索</Button>


      <div style={{margin:'20px 10px 0px 0px'}}>
        <span>区域筛选：</span>
        <Button type="primary" onClick={this.QuanguoLocation.bind(this)}  style={{margin:'0px 10px 0px 10px'}} value="全国">全国</Button>
        <Button type="primary" onClick={this.BeijingLocation.bind(this)} value='北京'>北京</Button>
        <Button type="primary" onClick={this.ChengduLocation.bind(this)}  style={{margin:'0px 25px 0px 10px'}}　value='成都'>成都</Button>
        <span>当前查询区域：{this.state.value}</span>
      </div>
      <div style={{margin:'20px 10px 0px 0px'}}>
        <span>时段筛选：</span>
        <Button type="primary" style={{margin:'0px 10px 0px 10px'}}>今日</Button>
        <Button type="primary">昨日</Button>
        <Button type="primary" style={{margin:'0px 10px 0px 10px'}}>最近７天</Button>
        <Button type="primary" >最近３０天</Button>
    </div>

    </div>
    <Table  dataSource={this.state.ordersData}  rowKey='_id'
      pagination={{defaultPageSize: 20, total: this.state.totalCount,
        onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
        showQuickJumper: true, current: this.state.currentPage}}
        columns={OrdersColumns}
      />
    </div>

    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Orders);

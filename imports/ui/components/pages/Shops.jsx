'use strict';

import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Switch from 'antd/lib/switch';
import "antd/lib/switch/style";
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import Avatar from 'antd/lib/avatar';


import { Roles } from '/imports/api/roles/roles.js';

import {countShops,getMeteorShopsLimit} from '../../services/shops.js'


import CommonModal from './shops_components/CommonModal.jsx';
import { showShop, editShop,addShop,shangShop,getShopAddress, getShopPoint  } from '/imports/ui/actions/shops.js';


const confirm = Modal.confirm;

class Shops extends React.Component{
  constructor(props) {
    super(props);

  }
  showChangeConfirm(state,shopId) {
    console.log(state);
    console.log(shopId);
    confirm({
      title: '确定关闭/开启店铺吗？！',
      content: '店铺关闭/开启后，将激活/禁用店铺一切功能！',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        console.log('OK');
        Meteor.call('shops.changeShopState',shopId, function(error,result){
          if(!error){
              console.log(result)
              if (result.status){
                message.success('店铺关闭成功！')
              }else{
                message.success('店铺开启成功！')
              }
          }else{
            console.log("店铺状态改变失败！")
          }
        })
      },
      onCancel() {
        console.log('Cancel');
        message.error('店铺开启失败');
      },
    });
  }

  handleSearchInput(value){
    console.log(value);
  }

  state = {
    shopsData:[],
    currentPage:1,
    loadingTip: "加载中...",
    tableLoading: true,
    totalCount: 500,
    condition: {},
    modalVisible: false,  // modal是否可见
    modalTitle: '',  // modal标题
    confirmTitle: '',
    confirmContent: '',

  };

  hideModal = () => {
    this.setState({modalVisible: false});
  };

  onClickInsert = (e) => {
    let self = this
    const {dispatch } = self.props;
    self.setState({
      modalVisible: true,
      modalTitle: "新增店铺"
    })
    dispatch(addShop())
    console.log("当前不可编辑" + self.props.editState)
    console.log("当前是否为新增店铺" + self.props.modalState)
    console.log(self.props.singleShop)
  }

  onClickUpdate = (shopId) => {
    console.log(shopId);
    let self = this
    this.setState({
      modalVisible: true,
      modalTitle: "编辑店铺",
    })
    Meteor.call('shops.findShopById',shopId, function(error,result){
      const {dispatch } = self.props;
      dispatch(getShopAddress(result.address))
      dispatch(getShopPoint(result.lntAndLat))
      console.log(result);
      if(!error){
        dispatch(editShop(result));
        console.log('编辑店铺');
        console.log("当前不可编辑" + self.props.editState)
        console.log("当前是否为新增店铺" + self.props.modalState)
        console.log(self.props.singleShop)
      }else{
        console.log("获取数据失败");
      }
    })
  }

  onClickShow = (shopId) => {
    let self = this
    self.setState({
      modalVisible: true,
      modalTitle: "查看店铺",
    })
    Meteor.call('shops.findShopById',shopId, function(error,result){
      const {dispatch } = self.props;
      dispatch(getShopAddress(result.address))
      dispatch(getShopPoint(result.lntAndLat))
      console.log(self.props);
      if(!error){
        dispatch(showShop(result));
        console.log(result);
        console.log('查看店铺');
        console.log("当前不可编辑" + self.props.editState)
        console.log("当前是否为新增店铺" + self.props.modalState)
        console.log(self.props.singleShop)
        // self.fromModal.setFormData(result);
        console.log(self.fromModal)
      }else{
        console.log("获取数据失败");
      }
    })
  }


  getPageShops(page,pageSize,condition){
    console.log(condition);
    console.log("这里开始获取数据");
    let self = this;
    getMeteorShopsLimit(condition,page,pageSize,function(err, rlt){
      if(!err){
        self.setState({
          shopsData: rlt,
          tableLoading: false,
          currentPage: page,
        })
        console.log('获取单页数据成功')
        console.log(rlt);
      }
      else{
        console.log('获取单页数据失败')
      }
    })
  }
  handlePageChange(page, pageSize){
    $(document).scrollTop(0);
    this.getPageShops(page, pageSize, this.state.condition);
  }

  componentDidMount(){
    let self = this
    console.log('加载店铺数据')
    console.log(this.state.condition);
    this.getPageShops(1,5,this.state.condition);
    countShops(function(err, rlt){
      if (!err) {
        self.setState({
          totalCount: rlt,
        });
      }
    })

  }

  render() {
      const {singleShop, modalState, editState,allState} = this.props
      const headerMenuStyle ={
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'space-around',
        borderStyle: 'solid',
        padding: '15px',
        borderWidth: 'thin'
      };
      const actionStyle = {
        fontSize: 16, color: '#08c'
     };
     const switchStyle = {

     }
      const ShopColumns = [
        // {
        //   title: '店铺ID',
        //   dataIndex: '_id',
        //   key: '_id',
        //   width: 200,
        //   fixed: 'left',
        // },
        {
        title: '店名',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        fixed: 'left',
      },{
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        width: 50,
        render:(text, record) =>(
            <img src={record.cover} style={{height:50,width:50}}/>
        )
      }, {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width: 200,

      }, {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
        width: 100,
      }, {
        title: '店铺标签',
        dataIndex: 'tags',
        key: 'tags',
        width: 100,
      },
      {
        title: '店铺简介',
        dataIndex: 'description',
        key: 'description',
        width: 150,
      },
      {
        title: '指派店长',
        dataIndex: 'other',
        key: 'other',
        width: 100,
        render: (text, record) => (
          <span>
            <Tooltip placement="topLeft" title="指派店长" arrowPointAtCenter>
              <Button shape="circle" onClick={ () => this.onClickShow(record._id)}  icon="eye"  style={actionStyle} />
            </Tooltip>
          </span>
        ),
      },
      {
        title: '指派店员',
        dataIndex: 'other2',
        key: 'other2',
        width: 150,
        render: (text, record) => (
          <span>
            <Tooltip placement="topLeft" title="指派店长" arrowPointAtCenter>
              <Button shape="circle" onClick={ () => this.onClickShow(record._id)}  icon="eye"  style={actionStyle} />
            </Tooltip>
          </span>
        ),
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        fixed: 'right',
        render: (text, record) => (
          <span>
            <Tooltip placement="topLeft" title="查看店铺" arrowPointAtCenter>
              <Button shape="circle" onClick={ () => this.onClickShow(record._id)}  icon="eye"  style={actionStyle} />
            </Tooltip>
            <span className="ant-divider" />
            <Tooltip placement="topLeft" title="编辑此记录" arrowPointAtCenter>
              <Button shape="circle" onClick={ () => this.onClickUpdate(record._id)} icon="edit" style={actionStyle} />
            </Tooltip>
            <span className="ant-divider" />

            <Tooltip placement="topLeft" title="开关店铺" arrowPointAtCenter>
              <Switch checkedChildren="营业" unCheckedChildren="关闭"  defaultChecked={record.status} onChange={() => this.showChangeConfirm(record.status,record._id)}  />
            </Tooltip>
          </span>
        ),
      },

    ];


    return (
      <div>
        <div style={headerMenuStyle}>
        <Tooltip placement="topLeft" title="添加新店铺" arrowPointAtCenter>
          <Button shape="circle" icon="plus"  onClick={this.onClickInsert}  style={{fontSize: "18px", color: "red"}} ></Button>
        </Tooltip>

        <CommonModal
        modalVisible={this.state.modalVisible}
        modalTitle={this.state.modalTitle}
        onCancel = { this.hideModal}
        getPageShops = {this.getPageShops.bind(this)}
        ref = {(input) => { this.fromModal = input; }}
        />
        <div>
        <Input.Search
              placeholder="搜索店铺相关"
              style={{ width: 200 }}
              onSearch={value => console.log(value)}
              onInput={input => this.handleSearchInput(input.target.value) }
            />
        </div>
      </div>

      <Table rowKey={record => record._id} 
      dataSource={this.state.shopsData} 
      columns={ShopColumns}
      scroll={{ x: 1300 }}
      pagination={{
        defaultPageSize: 5,
        total: this.state.totalCount,
        onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
        current: this.state.currentPage}} />

      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    allState: state.ShopsList,
    singleShop: state.ShopsList.singleShop,
    modalState: state.ShopsList.modalInsert,
    editState: !state.ShopsList.modalEditable,
  };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(Shops));

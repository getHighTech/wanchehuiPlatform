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


import { Roles } from '/imports/api/roles/roles.js';

import {countShops,getMeteorShopsLimit} from '../../services/shops.js'


import CommonModal from './shops_components/CommonModal.jsx';
import { showShop, editShop,addShop } from '/imports/ui/actions/shops.js';

const confirm = Modal.confirm;

class Shops extends React.Component{
  constructor(props) {
    super(props);

  }
  
 showConfirm(title) {
    confirm({
      title: title,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
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
  };

  hideModal = () => {
    this.setState({modalVisible: false});
  };

  onClickInsert = (e) => {
    let self = this
    e.preventDefault();
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
  onClickUpdate = (ShopId) => {
    let self = this
    this.setState({
      modalVisible: true,
      modalInsert: false,
      modalTitle: "编辑店铺",
      modalEditable: true,
    })
    Meteor.call('shops.findShopById',ShopId, function(error,result){
      const {dispatch } = self.props;
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
  onClickShow = (ShopId) => {
    let self = this
    self.setState({
      modalVisible: true,
      modalTitle: "查看店铺",
    })
    Meteor.call('shops.findShopById',ShopId, function(error,result){
      const {dispatch } = self.props;
      if(!error){
        dispatch(showShop(result));
        console.log('查看店铺');
        console.log("当前不可编辑" + self.props.editState)
        console.log("当前是否为新增店铺" + self.props.modalState)
        console.log(self.props.singleShop)
      }else{
        console.log("获取数据失败");
      }
    })
  //  console.log(self.refs.test);
  //  self.refs.test
  }
  // deleteThisShop = (ShopId) => {
  //   let self = this

  // }

  getPageShops(page,pageSize,condition){
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
  onChange(checked) {
    let self = this;
    console.log(`switch to ${checked}`);
    if(checked){
      self.showConfirm('确定关闭店铺吗？')
    }else{
      self.showConfirm('确定打开店铺吗？')
    }
  }

  componentDidMount(){
    console.log('加载店铺数据')
    this.getPageShops(1,20,this.state.condition);
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
        {
          title: '店铺ID',
          dataIndex: '_id',
          key: '_id',
          width: 150,
        },
        {
        title: '店名',
        dataIndex: 'shopName',
        key: 'shopName',
        width: 150,
      }, {
        title: '地址',
        dataIndex: 'shopAddress',
        key: 'shopAddress',
        width: 150,
      }, {
        title: '联系电话',
        dataIndex: 'shopPhone',
        key: 'shopPhone',
        width: 150,
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 150,
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
              <Switch checkedChildren="营业" unCheckedChildren="关闭"  defaultChecked={true} onChange={this.onChange}  />
            </Tooltip>
          </span>
        ),
      }
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
        ref = "test"
        // ref={ (input) => {this.modalComponent = input}}
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

      <Table rowKey={record => record._id} dataSource={this.state.shopsData} columns={ShopColumns} />

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    allState: state.ShopsList,
    singleShop: state.ShopsList.singleShop,
    modalState: state.ShopsList.modalInsert,    
    editState: !state.ShopsList.modalEditable
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



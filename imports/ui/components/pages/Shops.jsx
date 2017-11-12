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

import { Roles } from '/imports/api/roles/roles.js';

import { ShopColumns } from '../table_columns/ShopColumns.js'
import {countShops,getMeteorShopsLimit} from '../../services/shops.js'


import CommonModal from './shops_components/CommonModal.jsx';

class Shops extends React.Component{
  constructor(props) {
    super(props);

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
    modalEditable: true, //modal是否可以编辑
    modalTitle: '',  // modal标题
    modalInsert: true,  // 当前modal是用来insert还是update
    modalReadonly: false,
    // 图片预览相关状态
    previewVisible: false,  // 是否显示图片预览modal
    previewImages: [], // 要预览的图片

    // 用户自定义组件modal, 一般用于实现单条记录的更新
    componentModalVisible: false,
  };

  
  // showModal = () => {
  //   this.setState({
  //     modalVisible: true,
  //   });
  // }
  // handleOk = (e) => {
  //   console.log(e);
  //   this.setState({
  //     modalVisible: false,
  //   });
  // }
  // handleCancel = (e) => {
  //   console.log(e);
  //   this.setState({
  //     modalVisible: false,
  //   });
  // }

  hideModal = () => {
    this.setState({modalVisible: false});
  };

  onClickInsert = (e) => {
    e.preventDefault();
    this.setState({
      modalVisible: true,
      modalInsert: true,
      modalTitle: "新增店铺",
      modalEditable: true,
    }
    )
  }
  onClickUpdate = (e) => {
    e.preventDefault();
    this.setState({
      modalVisible: true,
      modalInsert: false,
      modalTitle: "编辑店铺",
      modalEditable: true,
    }
    )
  }
  onClickShow = (e) => {
    e.preventDefault();
    this.setState({
      modalVisible: true,
      modalInsert: false,
      modalTitle: "查看店铺",
      modalEditable: false,
    }
    )
  }

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
    console.log("加载单页数据")
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
      const ShopColumns = [
        // {
        //   title: '封面',
        //   dataIndex: 'cover',
        //   key: 'cover',
        //   render: text => <img style={{width: '100px'}} src={text} />,
        // },
        {
        title: '店名',
        dataIndex: 'shopName',
        key: 'shopName',
      }, {
        title: '地址',
        dataIndex: 'shopAddress',
        key: 'shopAddress',
      }, {
        title: '联系电话',
        dataIndex: 'shopPhone',
        key: 'shopPhone',
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip placement="topLeft" title="查看店铺" arrowPointAtCenter>
              <Button shape="circle" onClick={this.onClickShow.bind(this)} icon="eye"  style={actionStyle} />
            </Tooltip>
            <span className="ant-divider" />
            <Tooltip placement="topLeft" title="删除此记录" arrowPointAtCenter>
              <Button shape="circle" onClick={this.deleteThisShop} icon="delete"  style={actionStyle} />
            </Tooltip>
            <span className="ant-divider" />
            <Tooltip placement="topLeft" title="编辑此记录" arrowPointAtCenter>
              <Button shape="circle" onClick={this.onClickUpdate.bind(this)} icon="edit" style={actionStyle} />
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
          modalEditable={this.state.modalEditable} 
          modalTitle={this.state.modalTitle} 
          modalInsert ={this.state.modalInsert}
          componentModalVisible = {this.state.componentModalVisible}
          onCancel = { this.hideModal}
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

        <Table dataSource={this.state.shopsData} columns={ShopColumns} />

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

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

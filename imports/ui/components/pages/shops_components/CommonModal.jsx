import React from "react";

import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';

import 'antd/lib/form/style';
import 'antd/lib/checkbox/style'


import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import { Roles } from '/imports/api/roles/roles.js';
import ShopForm from './ShopForm.jsx';
import {Link} from 'react-router';



class CommonModal extends React.Component{
  constructor(props){
    super(props);
  }



  initAmap(){
    var map = new AMap.Map('container', {
            center: [117.00, 36.68],
            zoom: 6
        });
    map.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
    });
  }

  test(str){
      console.log(str);
  }
   /**
   * 设置表单要显示的数据
   */
  setFormData(data) {
    // 注意这里, 由于antd modal的特殊性, this.formComponent可能是undefined, 要判断一下
    if (this.formComponent) {
      this.formComponent.resetFields();
      if (data) {
        this.formComponent.setFieldsValue(data);
      }
    } else {
      this.formInitData = data;
    }
  }

  reflashTable(){
    this.props.getPageShops(1,20,{});
  }
  componentWillMount(){
  }




  handleModalOk = () => {
    let self = this
    let validated = true;
    this.formComponent.validateFieldsAndScroll((err, values) => validated = err ? false : validated); // 不知道有没有更好的办法
    if (!validated) {
      console.log('参数错误');
      return;
    }
    //处理收到的表单的数据
    const newObj = {};

    
    const oldObj = this.formComponent.getFieldsValue();
    console.log(oldObj);
    //把表单中跟时间有关系的参数进行时间格式化
    for (const key in oldObj) {
      if (oldObj[key] instanceof Date){
        newObj[key] = oldObj[key].format('yyyy-MM-dd HH:mm:ss');
      }else {
        newObj[key] = oldObj[key];
      }
    }
    console.log(newObj);
    // 至此表单中的数据格式转换完毕
    self.hideModal();

    //将转化好的数据传给后端
    if(self.props.modalState){
      //新增店铺到数据库
      Meteor.call("shops.insert", newObj, function(error,result){
        if(!error){
          console.log("新增店铺");
          console.log(result);
          //数据变化后，刷新表格
          self.reflashTable();
          self.setFormData({});
          console.log("刷新表格成功");

        }else{
          console.log(error);
        }
      })

    }else{
      console.log('店铺升级')
      Meteor.call('shops.update',this.props.singleShop, newObj, function(error,result){
        if(!error){
          console.log('店铺升级成功')
          console.log(result);
          self.reflashTable();
          self.setFormData({});
        }else{
          console.log(error);
        }
      })

    }
  }





  handleCancel = (e) => {
    this.props.onCancel();
    this.setFormData({});
  }

  hideModal = () => {
    this.props.onCancel();
  };



  render(){
    const {singleShop, modalState, editState, shopAddress} = this.props
    return(
      <div>
        <Modal
          title={this.props.modalTitle}
          visible={this.props.modalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleCancel.bind(this)}
          maskClosable={false}
          style={{ top: 20 }}
        >
          <ShopForm shopAddress= {this.props.shopAddress} shop= {this.props.singleShop} editState = {this.props.editState} ref = {(input) => { this.formComponent = input; }} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleShop: state.ShopsList.singleShop,
    modalState: state.ShopsList.modalInsert,
    editState: !state.ShopsList.modalEditable,
    shopAddress: state.ShopsList.shopAddress
   };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(CommonModal));

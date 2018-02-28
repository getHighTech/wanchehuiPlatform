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
import ProductForm from './ProductForm.jsx';
import {Link} from 'react-router';



class ProductModal extends React.Component{
  constructor(props){
    super(props);
  }
  state={
    aa : '',
    spec_length:0

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
  cc (end_spec){
    this.setState({
      aa: end_spec
    })
  }
   /**
   * 设置表单要显示的数据
   */
  setFormData(data) {
    console.log(data);
    // 注意这里, 由于antd modal的特殊性, this.formComponent可能是undefined, 要判断一下
    if (this.formComponent) {
      console.log(this.formComponent);
      this.formComponent.resetFields();
      if (data) {
        this.formComponent.setFieldsValue(data);
      }
    } else {
      this.formInitData = data;
    }
  }

  reflashTable(){
    this.props.getProducts();
  }
  componentWillMount(){
  }
  componentDidMount(){
    console.log('2');
    console.log(this.props)
    console.log(this.props.productmodalVisible);
    console.log(this.props.key_arr);
  }



  handleModalOk = () => {
    let self = this
    console.log(self.state.aa);
    let validated = true;
    console.log(this.formComponent)
    this.formComponent.validateFieldsAndScroll((err, values) => validated = err ? false : validated); // 不知道有没有更好的办法
    if (!validated) {
      console.log('参数错误');
      return;
    }
    //处理收到的表单的数据
    const newObj = {};

    // const getFieldValue = this.props.form.getFieldValue;
    // console.log(getFieldValue('shopAddress'))
    const getFieldValue = this.formComponent.getFieldValue;
    const setFieldsValue = this.formComponent.setFieldsValue;
    setFieldsValue({specifications: self.state.aa})
    const oldObj = this.formComponent.getFieldsValue();
    console.log(oldObj);
    //把表单中跟时间有关系的参数进行时间格式化
    for (const key in oldObj) {
        newObj[key] = oldObj[key];
    }
    console.log(newObj);
    // 至此表单中的数据格式转换完毕
    self.hideModal();

    //将转化好的数据传给后端
    if(self.props.modalState){
      //新增店铺到数据库
      let shopId=this.props.id
      Meteor.call("products.insert", newObj, shopId,function(error,result){
        if(!error){
          console.log("新增商品");
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
      Meteor.call('product.update',this.props.singleProduct, newObj, function(error,result){
        if(!error){
          console.log('更新商品');
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
    const {singleProduct, modalState, editState,length,key_arr} = this.props
    return(
      <div>
        <Modal
          title={this.props.productmodalTitle}
          visible={this.props.productmodalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleCancel.bind(this)}
          style={{ top: 20 }}
        >

          <ProductForm bb={this.state.aa}   cc={this.cc.bind(this)} product= {this.props.singleProduct} key_arr={this.props.key_arr} kay_length={this.props.length} editState = {this.props.editState} ref = {(input) => { this.formComponent = input; }} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleProduct: state.ProductsList.singleProduct,
    modalState: state.ProductsList.productmodalInsert,
    editState: !state.ProductsList.productmodalEditable,
    length:state.ProductsList.key_length,
    key_arr:state.ProductsList.key_arr
   };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(ProductModal));

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
    console.log(props);
  }
  state={
    xx:[],
    fileState:'',
    coverState:'',
    detailsState:'',
    spec : '',
    spec_length:0,
    descriptionKey:[],
    shopName:''
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
  getSpec (end_spec){
    this.setState({
      spec: end_spec
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
    // console.log(this.props.singleProduct);
    let shopId=this.props.id;
    let self =this;
    Meteor.call('shops.findShopById',shopId,function(err,alt){
      console.log(alt);
      self.setState({
        shopName:alt.name
      })
    })
    console.log(self.state.shopName);

  }



  handleModalOk = () => {
    let self = this;
    let validated = true;
    console.log(this.formComponent);
    this.formComponent.validateFieldsAndScroll((err, values) => validated = err ? false : validated);
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
    const oldObj = this.formComponent.getFieldsValue();
    let speckeys = oldObj.keys;
    console.log(speckeys);
    let specname=oldObj.spec_name;
    let specvalue=oldObj.spec_value;
    let end_spec=[];
    for(var i = 0; i<speckeys.length;i++){
      var spec_index=speckeys[i];
      var spec_name=specname[spec_index];
      var spec_value=specvalue[spec_index];
      var o1={spec_name:spec_name};
      var o2={spec_value:spec_value};
      var o3={isThis:false};
      var obj = Object.assign(o1,o2,o3);
      end_spec.push(obj);
    }
    setFieldsValue({specifications: end_spec})

    //把表单中跟时间有关系的参数进行时间格式化
    for (const key in oldObj) {
        newObj[key] = oldObj[key];
    }
    // 至此表单中的数据格式转换完毕
    let newPrice=newObj.price;
    newObj.price=newPrice*100;
    let newEndPrice =newObj.endPrice;
    newObj.endPrice=newEndPrice*100;
    newObj.specifications=end_spec;
    console.log(newObj);
    console.log(this.props.singleProduct.shop_name);
    self.hideModal();

    //将转化好的数据传给后端
    if(self.props.modalState){
      console.log(self.state.shopName);
      //新增店铺到数据库
      let shopId=this.props.id;
      let shopName= this.state.shopName;
      console.log(shopName,shopId);
      Meteor.call("products.insert", newObj, shopId,shopName,function(error,result){
        if(!error){
          console.log("新增商品");
          console.log(result);
          //数据变化后，刷新表格
          self.reflashTable();
          self.setFormData({});
          console.log("刷新表格成功");
          self.setState({
            xx:[],
            fileState:'',
            coverState:'',
            detailsState:''
          })
          console.log(self.state.xx);
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
          self.setState({
            xx:[],
            fileState:'',
            coverState:'',
            detailsState:''
          })
          console.log(self.state.xx);
        }else{
          console.log(error);
        }
      })

    }

  }





  handleCancel = (e) => {
    console.log('走了这');
    this.props.onCancel();
    this.setFormData({});
    this.setState({
      descriptionKey:[],
      xx:[],
      fileState:'',
      coverState:'',
      detailsState:''
    })


  }

  hideModal = () => {
    this.props.onCancel();
  };
  changeXX(v){
    console.log(v);
    this.setState({
      xx:v
    })
  }
  changefileState(state){
    this.setState({
      fileState:state
    })
  }
  changecoverState(state){
    this.setState({
      coverState:state
    })
  }
  changedetailsState(state){
    this.setState({
      detailsState:state
    })
  }


  render(){
    const {singleProduct, modalState, editState,length,key_arr,productId} = this.props
    return(
      <div>
        <Modal
        maskClosable={false}
          title={this.props.productmodalTitle}
          visible={this.props.productmodalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleCancel.bind(this)}
          width={1000}
          style={{ top: 20 }}
        >
          <ProductForm id={this.props.id} xx={this.state.xx} changeXX={this.changeXX.bind(this)}  fileState={this.state.fileState} changefileState={this.changefileState.bind(this)} coverState={this.state.coverState} detailsState={this.state.detailsState} changedetailsState={this.changedetailsState.bind(this)} changecoverState={this.changecoverState.bind(this)} spec={this.state.spec} descriptionKey={this.state.descriptionKey}  getSpec={this.getSpec.bind(this)}  product= {this.props.singleProduct} modalState={this.props.modalState} key_arr={this.props.key_arr} productId={this.props.productId} kay_length={this.props.length}  editState = {this.props.editState} ref = {(input) => { this.formComponent = input; }}  />

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
    key_arr:state.ProductsList.key_arr,
    productId:state.ProductsList.productId
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

//此组件用于测试
import React from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Button from 'antd/lib/button/';
import 'antd/lib/button/style';
import Icon from 'antd/lib/icon/';
import 'antd/lib/icon/style';
import Avatar from 'antd/lib/avatar';
import 'antd/lib/avatar/style';
import {getOneShopData} from '../../services/shops.js'
import Tag from 'antd/lib/tag/';
import 'antd/lib/tag/style';
import { Card, Col, Row ,List} from 'antd';
import Table from 'antd/lib/table';
const { Meta } = Card;
import Modal from 'antd/lib/modal';
import TimePicker from 'antd/lib/time-picker';
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Upload from 'antd/lib/upload';
import message from 'antd/lib/upload';
import "antd/lib/form/style";
import "antd/lib/input/style";
import "antd/lib/checkbox/style";
import "antd/lib/tooltip/style";
import "antd/lib/time-picker/style";
import "antd/lib/select/style";
import "antd/lib/upload/style";
import 'antd/lib/modal/style';
import { Roles } from '/imports/api/roles/roles.js';
import { showProduct, editProduct,addProduct } from '/imports/ui/actions/products.js';
import ProductModal from './shops_components/ProductModal.jsx';
import Product from './shops_components/Product.jsx';


const FormItem = Form.Item;
const format = 'HH:mm';
const { TextArea } = Input;
class ShopDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params._id);
  }
  state={
    shopdetails:[],
    product:[],
    visible: false,
    editaddressVisible:false,
    editphoneVisible:false,
    editaddress:'',
    editphone:[],
    productmodalVisible: false,  // modal是否可见
    productmodalTitle: '',
  }
  componentDidMount(){
    let self = this;
    let id= this.props.params._id;
    Meteor.call('shops.findShopById',id,function(err,alt){
      if(!err){
      console.log(alt);
      self.setState({
        shopdetails:alt
      })
      // self.getFormdata();
    }
    console.log(self.state.shopdetails)
    })
    Meteor.call('get.product.byShopId',id,function(error,result){
      console.log(result);
      self.setState({
        product:result
      })
    })
  }

  getProducts(){
    let self = this;
    let id= this.props.params._id;
    Meteor.call('get.product.byShopId',id,function(error,result){
      console.log(result);
      self.setState({
        product:result
      })
    })
  }

  hideModal = () => {
    this.setState({productmodalVisible: false});
  };
  onAddProduct(){
    let self =this;
    const {dispatch } = self.props;

    self.setState({
      productmodalVisible:true,
      productmodalTitle:'增加商品'
    })
    dispatch(addProduct())

  }
  onShowProduct = (id) => {
    let self =this;
    self.setState({
      productmodalVisible:true,
      productmodalTitle:'查看商品'
    })
    Meteor.call('get.oneproduct.id',id,function(err,alt){
      console.log(alt);
      const {dispatch } = self.props;
      if(!err){
        dispatch(showProduct(alt))
        console.log("当前不可编辑" + self.props.editState)
        console.log("当前是否为新增商品" + self.props.modalState)

      }
    })
  }
  onEditProduct = (id) => {
    let self =this;
    self.setState({
      productmodalVisible:true,
      productmodalTitle:'修改商品'
    })
    Meteor.call('get.oneproduct.id',id,function(err,alt){
      console.log(alt);
      const {dispatch } = self.props;
      if(!err){
        dispatch(editProduct(alt))


        console.log("当前不可编辑" + self.props.editState)
        console.log("当前是否为新增商品" + self.props.modalState)

      }
    })

  }

  render(){
      const {singleProduct, modalState, editState,allState} = this.props
    const actionStyle = {
      fontSize: 16, color: '#08c'
    };

    const colors=['blue','red','green','lime'];

    const Columns=[
      {
        title: '商品名',
        dataIndex: 'name_zh',
        key: 'name_zh',
        width: 150,
      },
      {
        title: '商品名',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 100,
      },
      {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 100,
      },
      {
        title: '简介',
        dataIndex: 'brief',
        key: 'brief',
        width: 150,
      },
       {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (text, record) => {
        return(
          <span>
          <Tooltip placement="topLeft" title="查看" arrowPointAtCenter>
            <Button shape="circle" icon="eye"  onClick={ () => this.onShowProduct(record._id)}></Button>
          </Tooltip>
          <span className="ant-divider" />
          <Tooltip placement="topLeft" title="修改" arrowPointAtCenter>
            <Button shape="circle" icon="edit"  onClick={ () => this.onEditProduct(record._id)}></Button>
          </Tooltip>
          <span className="ant-divider" />


        </span>)
    },
    }
    ]
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          console.log(selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
        }),
      };
    const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
          },
        };
      const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 14,
              offset: 6,
            },
          },
        };
        const headerMenuStyle ={
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'space-around',
          padding: '15px',
          borderWidth: 'thin',
          background:'#ECECEC',
          marginTop:10
        };


    return (

      <div>
      <Product id={this.props.params._id}/>

      <div style={headerMenuStyle}>
        <Tooltip placement="topLeft" title="添加新店铺" arrowPointAtCenter>
          <Button shape="circle" icon="plus"  onClick={this.onAddProduct.bind(this)}  style={{fontSize: "18px", color: "red"}} ></Button>
        </Tooltip>


        <div>
          <Input.Search
                placeholder="搜索店铺相关"
                style={{ width: 200 }}
                onSearch={value => console.log(value)}
                onInput={input => this.handleSearchInput(input.target.value) }
              />
        </div>
      </div>
      <ProductModal
     productmodalVisible={this.state.productmodalVisible}
     productmodalTitle={this.state.productmodalTitle}
     onCancel = { this.hideModal}
     getProducts={this.getProducts.bind(this)}
     ref = {(input) => { this.fromModal = input; }}
     id={this.props.params._id}
     />


      <Table rowSelection={rowSelection} rowKey={record => record._id} dataSource={this.state.product} columns={Columns} style={{background: '#ECECEC'}}/>

      <div>





      </div>

      </div>

        )
  }
}



function mapStateToProps(state) {
  return {
    allState: state.ProductsList,
    singleProduct: state.ProductsList.singleProduct,
    modalState: state.ProductsList.productmodalInsert,
    editState: !state.ProductsList.productmodalEditable,
  };
}

export default createContainer(() => {
  if (Meteor.userId()) {
    Meteor.subscribe('roles.current');
  }
  return {
    current_role: Roles.findOne({users: {$all: [Meteor.userId()]}})
  };
}, connect(mapStateToProps)(ShopDetails));

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



const FormItem = Form.Item;
const format = 'HH:mm';
const { TextArea } = Input;
class ShopDeailsWrap extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.params._id);
  }
  state={
    shopdeails:[],
    product:[],
    visible: false,
    editaddressVisible:false,
    editphoneVisible:false,
    editaddress:'',
    editphone:[],
    modalVisible: false,  // modal是否可见
    modalTitle: '',
  }
  componentDidMount(){
    let self = this;
    let id= this.props.params._id;
    Meteor.call('shops.findShopById',id,function(err,alt){
      if(!err){
      console.log(alt);
      self.setState({
        shopdeails:alt
      })
      // self.getFormdata();
    }
    console.log(self.state.shopdeails)
    })
    Meteor.call('get.product.byShopId',id,function(error,result){
      console.log(result);
      self.setState({
        product:result
      })
    })
  }
  editaddress(){
    console.log(this.state.shopdeails);
    console.log(this.state.shop);
    this.setState({
      editaddressVisible:true
    })
  }
  editphone(){
    this.setState({
      editphoneVisible: true,
    });
  }
  addressInput(value){
    this.setState({
      editaddress:value
    })
  }
  phoneInput(value){
    this.setState({
      editphone:value
    })
  }
  getFormdata(){
    let self = this
    let data =this.state.alt
    console.log('11');
    if(data){
      self.props.form.setFieldsValue(data);
      console.log('2');
      console.log(this.props.form.name);
    }
  }
  showModal = () => {
    let self = this;


    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      editaddressVisible:false,
      editphoneVisible:false,
    });
  }
  handleOkphone= (e) =>{
    let self =this;
    let id= this.props.params._id;
    let phone =this.state.editphone;
    console.log(id,phone);
    Meteor.call('shops.editphone',id,phone,function(err,rlt){
      if(!err){
        console.log(rlt);
        self.reflash();
      }
      else {
        console.log(err);
      }
    })
    this.setState({
      visible: false,
      editaddressVisible:false,
      editphoneVisible:false,
    });
  }
  handleOkaddress= (e) =>{
    let self =this;
    let id= this.props.params._id;
    let address =this.state.editaddress;
    console.log(id,address);
    Meteor.call('shops.editaddress',id,address,function(err,rlt){
      if(!err){
        console.log(rlt);
        self.reflash();
      }
      else {
        console.log(err);
      }
    })
    this.setState({
      visible: false,
      editaddressVisible:false,
      editphoneVisible:false,
    });
  }
  reflash(){
    let self = this;
    let id= this.props.params._id;
    Meteor.call('shops.findShopById',id,function(err,alt){
      if(!err){
      console.log(alt);
      self.setState({
        shopdeails:alt
      })
    }
    })
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      editaddressVisible:false,
      editphoneVisible:false,
    });
  }


  onEditProduct = (id) => {
    let self =this;
    self.setState({
      modalVisible:true,
      modalEdit:false,
      modalTitle:'修改商品'
    })
    Meteor.call('get.oneproduct.id',id,function(err,alt){
      const {dispatch } = self.props;
      if(!err){
        dispatch(editProduct(alt))
      }
    })

    console.log(self.state.oneProduct);
  }

  render(){

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
        title: '价格',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 100,
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        width: 150,
      },{
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 50,
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



    return (

      <div>
      <Row gutter={7}>
        <Col span={15}>
        <Card style={{width:'100%'}} bordered={false}>
          <Meta
              avatar={<Avatar  shape="square" size="large" style={{width:100,height:100}}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
              title={this.state.shopdeails.name}
              description={[<span key='1'>店铺描述:{this.state.shopdeails.description}</span>,
                          <br key='2'/>,
                          <span key='3'>店主:字段还未完成</span>,
                          // <br key='4'/>,
                          // <span key='5'>店铺电话：{shopdata.phone}</span>,
                          // <br key='6'/>,
                          // <span key='7'>店铺地址:{shopdata.address}</span>
                          ]} />


        </Card>
        </Col>
        <Col span={8}>
        <Card style={{width:'100%'}} bordered={false}>
        <Meta

            description={[<Button key='1'>发布商品</Button>,<Button key='2' onClick={this.showModal}  style={{marginLeft:20}}>修改店铺</Button>,<Button key='3' style={{marginLeft:20}}>指派管理员</Button>]} />

        </Card>
        </Col>

        </Row>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={8}>
          <Col span={6}><Card title="店长" bordered={false}>张三</Card></Col>
          <Col span={6}><Card title="店铺地址" onClick={this.editaddress.bind(this)} extra={<Icon type="edit" />} bordered={false}>{this.state.shopdeails.address}</Card></Col>
          <Col span={6}><Card title="店铺电话" onClick={this.editphone.bind(this)} extra={<Icon type="edit" />} bordered={false}>{this.state.shopdeails.phone}</Card></Col>
          <Col span={6}><Card title="商品数量" bordered={false}>10000</Card></Col>
        </Row>
      </div>


      <Table rowSelection={rowSelection} rowKey={record => record._id} dataSource={this.state.product} columns={Columns} style={{background: '#ECECEC'}}/>

      <div>
      <Modal
        title="修改店铺地址"
        visible={this.state.editaddressVisible}
        onOk={this.handleOkaddress}
        onCancel={this.handleCancel}
      >
      <TextArea rows={4} defaultValue={this.state.shopdeails.address} onInput={input => this.addressInput(input.target.value) }/>
      </Modal>
      <Modal
        title="修改店铺电话"
        visible={this.state.editphoneVisible}
        onOk={this.handleOkphone}
        onCancel={this.handleCancel}
      >
      <Input  defaultValue={this.state.shopdeails.phone} onInput={input => this.phoneInput(input.target.value) }/>
      </Modal>

      <ProductModal
      modalVisible={this.state.modalVisible}
      modalTitle={this.state.modalTitle}
      onCancel = { this.hideModal}
      ef = {(input) => { this.fromModal = input; }}
      />


      </div>

      </div>

        )
  }
}



const ShopDeails = Form.create()(ShopDeailsWrap);
export default ShopDeails;

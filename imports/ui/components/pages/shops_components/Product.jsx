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
class ProductWrap extends React.Component {
  constructor(props) {
    super(props);
  }
  state={
    shopdetails:[],
    editaddressVisible:false,
    editphoneVisible:false,
    editaddress:'',
    editphone:[],
  }
  componentDidMount(){
    let self = this;
    let id= self.props.id;
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
  }
  editaddress(){
    console.log(this.state.shopdetails);
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
    let id= self.props.id;
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
      editaddressVisible:false,
      editphoneVisible:false,
    });
  }
  handleOkaddress= (e) =>{
    let self =this;
    let id= self.props.id;
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
      editaddressVisible:false,
      editphoneVisible:false,
    });
  }
  reflash(){
    let self = this;
    let id= self.props.id;
    Meteor.call('shops.findShopById',id,function(err,alt){
      if(!err){
      console.log(alt);
      self.setState({
        shopdetails:alt
      })
    }
    })
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      editaddressVisible:false,
      editphoneVisible:false,
    });
  }




  render(){

    const actionStyle = {
      fontSize: 16, color: '#08c'
    };

    const colors=['blue','red','green','lime'];






    return (

      <div>
      <Row gutter={7}>
        <Col span={15}>
        <Card style={{width:'100%'}} bordered={false}>
          <Meta
              avatar={<Avatar  shape="square" size="large" style={{width:100,height:100}}  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
              title={this.state.shopdetails.name}
              description={[<span key='1'>店铺描述:{this.state.shopdetails.description}</span>,
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
          <Col span={6}><Card title="店铺地址" onClick={this.editaddress.bind(this)} extra={<Icon type="edit" />} bordered={false}>{this.state.shopdetails.address}</Card></Col>
          <Col span={6}><Card title="店铺电话" onClick={this.editphone.bind(this)} extra={<Icon type="edit" />} bordered={false}>{this.state.shopdetails.phone}</Card></Col>
          <Col span={6}><Card title="商品数量" bordered={false}>10000</Card></Col>
        </Row>
      </div>



      <div>
      <Modal
        title="修改店铺地址"
        visible={this.state.editaddressVisible}
        onOk={this.handleOkaddress}
        onCancel={this.handleCancel}
      >
      <TextArea rows={4} defaultValue={this.state.shopdetails.address} onInput={input => this.addressInput(input.target.value) }/>
      </Modal>
      <Modal
        title="修改店铺电话"
        visible={this.state.editphoneVisible}
        onOk={this.handleOkphone}
        onCancel={this.handleCancel}
      >
      <Input  defaultValue={this.state.shopdetails.phone} onInput={input => this.phoneInput(input.target.value) }/>
      </Modal>




      </div>

      </div>

        )
  }
}



const Product = Form.create()(ProductWrap);
export default Product;

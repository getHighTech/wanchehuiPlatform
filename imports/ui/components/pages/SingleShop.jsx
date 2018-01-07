//此组件用于测试
import React from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { push, replace, goBack } from 'react-router-redux';
import Button from 'antd/lib/button/';
import 'antd/lib/button/style';
import Icon from 'antd/lib/icon/';
import 'antd/lib/icon/style';
import { Card, Avatar ,Col, Row } from 'antd';
const { Meta } = Card;
import {getOneShopData} from '../../services/shops.js'
import Tag from 'antd/lib/tag/';
import 'antd/lib/tag/style';

class SingleShop extends React.Component {
  constructor(props) {
    super(props);
  }
  state={
    shopData:[],
    aaa:11
  }
  componentDidMount(){
    let self = this;
    self.getShopData();
  }
  getShopData(){

    let self = this;
    getOneShopData(function(err,rlt){
      if(!err){
        self.setState({
          shopData:rlt
        })
      }
      console.log(self.state.shopData);
    })
  }
  in(){
    console.log("进入店铺");
    const { dispatch } = this.props;
    let self = this;
    dispatch(push("/shops/singleshop/publishgoods"));
  }
  out(){
    console.log("关闭店铺");
  }
  render(){
    const array=this.state.shopData;
    console.log(array);
    const colors=['blue','red','green','lime'];



    return (
        <div >
        <Row gutter={16}>

        { array.map((shopdata,index) =>
          <Col span={8} key={index}>
              <Card key={shopdata._id}
                style={{ width: 300 }}
                cover={<img alt="example" style={{width:300,height:200}} src={shopdata.cover} />}
                hoverable={true}
                actions={[ <span  onClick={ () => this.in()} >进入店铺</span>,<span onClick={ () => this.out()} >发布商品</span>]}
              >
              {shopdata.tags.map((color,index)=>
                <Tag key={index} color={colors[index]} style={{marginBottom:10}} >{color}</Tag>
              )}


                <Meta
                  title="店铺介绍"
                  description={[<span key='1'>店铺描述:{shopdata.description}</span>,
                                <br key='2'/>,
                                <span key='3'>店主:字段还未完成</span>,
                                <br key='4'/>,
                                <span key='5'>店铺电话：{shopdata.phone}</span>,
                                <br key='6'/>,
                                <span key='7'>店铺地址:{shopdata.address}</span>]}
                />

              </Card>
              </Col>

        )}
        </Row>
        </div>

        )
  }
}

function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(SingleShop);

//此组件用于测试
import React from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Button from 'antd/lib/button/';
import 'antd/lib/button/style';
import Icon from 'antd/lib/icon/';
import 'antd/lib/icon/style';
import { Card, Avatar ,Col, Row } from 'antd';
const { Meta } = Card;
import {getOneShopData} from '../../services/shops.js'
import Tag from 'antd/lib/tag/';
import 'antd/lib/tag/style';

class PublishGoods extends React.Component {
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

    // {shopdata.tags.map((color,index)=>
    //   <Tag key={index} color={colors[index]} style={{marginBottom:10}} >{color}</Tag>
    // )}


    return (
        <div >
        11111
        </div>

        )
  }
}

function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(PublishGoods);

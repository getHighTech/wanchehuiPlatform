'use strict';

import React from "react";

import { connect } from 'react-redux';
import Card from 'antd/lib/card/';
import 'antd/lib/card/style';

import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";

import Button from 'antd/lib/button';
import "antd/lib/button/style";

import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

class DashBoard extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      allUsersMount: 0,
      allCardUsersMount: 0,
      usersAddOnToday: 0,
      salesOnToday: 0,
      salesInThisWeek: 0
    }
  }

  updateUsersCount(){

    let self  = this;
    Meteor.call("users.count", function(error, result){

      if (!error) {
        self.setState({
          allUsersMount: result
        });
      }
    });
  }

  updateUsersCardsCount(){

    let self = this;
    Meteor.call("users.cards.count", function(error, result){
      if (!error) {
        self.setState({
          allCardUsersMount: result
        })
      }
    });
  }
  updateUsersAddOnToday (){
    Meteor.call("get.users.addOnToady", (error, result)=>{
      if (!error) {
        this.setState({
          usersAddOnToday: result
        })
      }
    });
  }
  updateSalesOnToday (){
    Meteor.call("users.cards.addOnToady", (error, result)=>{
      if (!error) {
        this.setState({
          salesOnToday: result
        })
      }
    });
  }

  updateSalesInThisWeek (){
    Meteor.call("users.cards.addOnWeek", (error, result)=>{
      if (!error) {
        this.setState({
          salesInThisWeek: result
        })
      }
    });
  }

  componentDidMount(){

    let self = this;

    this.updateUsersCount();
    this.updateUsersCardsCount();
    this.updateUsersAddOnToday();
    this.updateSalesOnToday();
    this.updateSalesInThisWeek();
  }





  render() {

    const CardExtra = () => (
      <div>
          <Tooltip placement="topLeft" title="刷新" arrowPointAtCenter>
            <Button type="dashed" shape="circle" icon="reload" />
          </Tooltip>

          <Tooltip placement="topLeft" title="查看" arrowPointAtCenter>
            <Button type="dashed" shape="circle" icon="eye-o" />
          </Tooltip>
      </div>
    );

    return (
      <div style={{background: 'rgb(236, 236, 236)', position: 'relative', left: "-40px",
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center' }}>
            <Card title="总共的注册量：" extra={
              <CardExtra />
            }>
                <h1>{this.state.allUsersMount}</h1>
            </Card>
            <Card title="总持卡人数:" extra={
              <CardExtra />

            }>
                <h1>{this.state.allCardUsersMount}</h1>
            </Card>
            <Card title="今日新增注册量:" extra={
              <CardExtra />

            } >
            <h1>{this.state.usersAddOnToday}</h1>
            </Card>
            <Card title="今日卡销量:"  extra={
              <CardExtra />
              
            }>
            <h1>{this.state.salesOnToday}</h1>
            </Card>
            <Card title="本周卡片销量:"  extra={
              <CardExtra />

            }>
            <h1>{this.state.salesInThisWeek}</h1>
            </Card>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(DashBoard);

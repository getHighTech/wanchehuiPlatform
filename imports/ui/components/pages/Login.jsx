'use strict';

import React from "react";

import { connect } from 'react-redux';
import LoginForm from './login_components/LoginForm.jsx'
import { push, replace, goBack } from 'react-router-redux';

import message from 'antd/lib/message/';
import 'antd/lib/message/style';

class Login extends React.Component{
  constructor(props) {
    super(props);


  }
  getUserInfo(userInfo){
    console.log("主登录框架");
    const { dispatch } = this.props;
    Meteor.loginWithPassword(userInfo.userName, userInfo.password, function(error, result){
        console.log(error);
        console.log(result);
        if (!error) {
          dispatch(push("/"));
          message.success("登录成功");
        }
    })
  }
  componentDidMount(){
    if (Meteor.userId() != null) {
      //若是已经登录 就返回主页
      const { dispatch } = this.props;
      dispatch(push("/"));
    }
  }





  render() {
    return (
      <div style={{padding: "20px"}}>
        <div style={{minWidth: "284px", textAlign: "center",display: "flex", alignItems: "center",justifyContent: "center",flexDirection: "column"}}>
        <br/><br/>
          <h2>欢迎登录万人车会平台</h2><br/>
          <LoginForm loginInfo={userInfo => this.getUserInfo(userInfo)}/>
        </div>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Login);

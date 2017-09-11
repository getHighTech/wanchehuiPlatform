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
    this.state = {
      validate: {
        username: "unknown",
        password: "unknown",
      },
    }


  }
  handleSubmit = (e) => {
    
  }

  getUserInfo(userInfo){
    const { dispatch } = this.props;
    let self = this;
    Meteor.loginWithPassword(userInfo.userName, userInfo.password, function(error, result){
        if (!error) {
          dispatch(push("/"));
          message.success("登录成功");
        }else{
          if (error.reason === "User not found") {
            self.setState({
              validate: {
                username: "unpass",
                password: self.state.validate.password
              }
            })
          }
          if (error.reason === "Incorrect password") {
            self.setState({
              validate: {
                username: "pass",
                password: "unpass",
              }
            })
          }
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
          <LoginForm validate={this.state.validate} loginInfo={userInfo => this.getUserInfo(userInfo)}/>
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

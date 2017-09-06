'use strict';

import React from "react";

import { connect } from 'react-redux';
import LoginForgotFormStepOne from './login_forgot_components/LoginForgotFormStepOne.jsx'

class LoginForgot extends React.Component{
  constructor(props) {
    super(props);

  }
  handleSubmitForm1(){
    console.log("123");
  }





  render() {
    return (
      <div style={{padding: "20px"}}>
        <div style={{minWidth: "284px", textAlign: "center",display: "flex", alignItems: "center",justifyContent: "center",flexDirection: "column"}}>
        <br/><br/>
          <h2>找回密码</h2><br/>
          <h3>步骤1，确认您的用户名</h3><br/>
          <LoginForgotFormStepOne />
        </div>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(LoginForgot);

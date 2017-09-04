'use strict';

import React from "react";

import { connect } from 'react-redux';
import LoginForm from './login_components/LoginForm.jsx'

class Login extends React.Component{
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <div>
      <LoginForm />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Login);

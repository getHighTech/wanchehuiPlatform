'use strict';

import React from "react";

import { connect } from 'react-redux';
import NewMemberApplyForm from './new_member_apply_components/NewMemberApplyForm.jsx'
import {Link} from 'react-router'

class LoginForgot extends React.Component{
  constructor(props) {
    super(props);

  }




  render() {
    return (
      <div style={{padding: "20px"}}>
        <div style={{minWidth: "284px", textAlign: "center",display: "flex", alignItems: "center",justifyContent: "center",flexDirection: "column"}}>
        <br/><br/>
          <h2>开始成为万人车汇平台的合作者</h2><br/>
          <div style={
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width:"30%"
            }
          }>
          <div><h3>填写以下信息,我们会在一周内和您联系</h3></div>
          <div><br/></div>
          <div><Link to="/login">返回</Link></div>
          </div>
          <NewMemberApplyForm />
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

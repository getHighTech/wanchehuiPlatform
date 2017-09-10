'use strict';

import React from "react";

import { connect } from 'react-redux';
import {Link} from 'react-router'

import { NewMemberApplyForm } from "./new_member_apply_components/NewMemberApplyForm.jsx"

class NewMemberApply extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      validate: {
        username: "unknown",
        password: "unknown",
      },
    }
  }

  render() {
    return (
      <div>

        <div style={{padding: "20px"}}>
          <div style={{minWidth: "284px", textAlign: "center",display: "flex", alignItems: "center",justifyContent: "center",flexDirection: "column"}}>
          <br/><br/>
            <h2>填下以下信息，申请入驻我们，我们会尽快联系您</h2><br/>
          <NewMemberApplyForm validate={this.state.validate} loginInfo={userInfo => this.getUserInfo(userInfo)}/>
          </div>

        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(NewMemberApply);

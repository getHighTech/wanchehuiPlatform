'use strict';

import React from "react";

import { connect } from 'react-redux';
import NewMemberApplyForm from './new_member_apply_components/NewMemberApplyForm.jsx'
import {Link} from 'react-router'
import {newMemberApply} from '/imports/ui/actions/new_member_apply.js';
import { push } from 'react-router-redux';

class LoginForgot extends React.Component{
  constructor(props) {
    super(props);

  }
  synicFormInfo(name, mobile, email, intro){
    const {dispatch, new_member_apply} = this.props;
    dispatch(newMemberApply(name, mobile, email, intro));
    dispatch(push("/new_member/apply/confirm"));
    //提交数据到后台
    // Meteor.call("partners.apply",
    //   values.applyName, values.applyEmail,
    //   values.applyMobile, htmlcontent,
    //   function(error, result){
    //     console.error(error);
    //     console.log(result);
    //   });
  }




  render() {
    const {new_member_apply} = this.props;

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
          <NewMemberApplyForm applyInfo={new_member_apply} synicFormInfo={(name, mobile, email, intro) => this.synicFormInfo(name, mobile, email, intro)} />
        </div>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    new_member_apply: state.NewMemberApply
   };
}

export default connect(mapStateToProps)(LoginForgot);

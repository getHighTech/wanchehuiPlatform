'use strict';

import React from "react";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import {Link} from 'react-router'
import message from 'antd/lib/message/';
import 'antd/lib/message/style';

import Spin from 'antd/lib/spin/';
import 'antd/lib/spin/style';

import {submitMemberApply} from '/imports/ui/actions/new_member_apply.js';

class NewMemberApplyConfirm extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  componentWillMount(){
    const {dispatch, new_member_apply} = this.props;
    //检查必填项目
    if (this.props.new_member_apply.applyName == "") {
         dispatch(replace("/new_member/apply"));
         message.warn("请先填写必要信息");
    }
  }
  handleSubmit(e){
    let self = this;
    const {dispatch, new_member_apply} = this.props;
    self.setState({
      loading: true
    });
    let applyName = this.props.new_member_apply.applyName;
    let applyEmail = this.props.new_member_apply.applyEmail;
    let applyMobile = this.props.new_member_apply.applyMobile;
    let applyIntro = this.props.new_member_apply.applyIntro;
    Meteor.call("member.applies.insert",applyName, applyEmail, applyMobile, applyIntro, function(error, result){
        if (!error) {
          self.setState({
            loading: false
          });
          dispatch(submitMemberApply(applyName, applyEmail, applyMobile, applyIntro));
          dispatch(push('/login'));
          message.success("您已成功提交了您的信息，请等待工作人员联系您");
        }else{
          if (error.error == "404") {
            message.error("该功能尚未开通, 敬请期待");
            self.setState({
              loading: false
            });

          }
          if (error.error == "500") {
            message.error("网络或者服务器错误，程序猿们在自残祭天");
          }
          if (error.error == "403") {
            message.error("嗯哼，你可能没有权限访问");

          }
        }



    });



  }






  render() {
    const {new_member_apply} = this.props;
    const btnStyle = {
      display: "flex",
      flexDirection: "row",
      width: "50%",
      alignItems: "center",
      justifyContent: "space-around"
    }
    return (
      <Spin style={{padding: "20px"}} spinning={this.state.loading}>
        <div style={{minWidth: "284px", textAlign: "center",display: "flex", alignItems: "center",justifyContent: "center",flexDirection: "column"}}>
        <br/><br/>
        <h2>确认以下信息</h2><br/>
          <div>
            <div>您的姓名：{this.props.new_member_apply.applyName}</div><br/>
            <div>您的电话：{this.props.new_member_apply.applyMobile}</div><br/>
            <div>您的邮箱：{this.props.new_member_apply.applyEmail}</div><br/>
            <div>您的简介：</div><br/>
            <div dangerouslySetInnerHTML={{__html: this.props.new_member_apply.applyIntro}} />
          </div><br/>
            <div style={btnStyle}>
               <Button onClick={this.handleSubmit.bind(this)} type="danger">确认提交</Button>
               <Button type="primary"><Link to="/new_member/apply">返回修改</Link></Button>
            </div>
        </div>
     </Spin>
    )
  }
}
function mapStateToProps(state) {
  return {
    new_member_apply: state.NewMemberApply
   };
}

export default connect(mapStateToProps)(NewMemberApplyConfirm);

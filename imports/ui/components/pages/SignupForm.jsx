'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';
import "antd/lib/form/style";
import "antd/lib/icon/style";
import "antd/lib/input/style";
import "antd/lib/button/style";
import "antd/lib/checkbox/style";
const FormItem = Form.Item;
import {Link} from 'react-router'

class SignupWrap extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      username: {
        validateStatus: "success",
        help: "",
        hasFeedback: false
      },
      password: {
        validateStatus: "success",
        help: "",
        hasFeedback: false
      }
    }
  }
  checkBlank(form){
    //判断空值的验证
    if (form.getFieldValue("userName") == "") {
      this.setState({
        username: {
          validateStatus: "error",
          help: "用户名不得为空",
          hasFeedback: true,
        },
      });
      return false;
    }
    if (form.getFieldValue("password") == "") {
      this.setState({
        password: {
          validateStatus: "error",
          help: "密码不得为空",
          hasFeedback: true,
        },
      })
      return false;
    }
    return true;
  }

  handleSubmit = (e) => {
      e.preventDefault();
      let self = this;

      if (!this.checkBlank(this.props.form)) {
        return false;
      }
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values.userName == undefined) {
            self.setState({
              username: {
                validateStatus: "error",
                help: "用户名不得为空",
                hasFeedback: true,
              },
            });
            return false;
          }
          if (values.password == undefined) {
            self.setState({
              password: {
                validateStatus: "error",
                help: "密码不得为空",
                hasFeedback: true,
              },
            });
            return false;
          }

          self.setState({
            username: {
              validateStatus: "validating",
              help: "正在验证",
              hasFeedback: true
            },
            password: {
              validateStatus: "validating",
              help: "正在验证",
              hasFeedback: true
            }
          })
          // self.props.loginInfo(values);
          console.log(values);
          Meteor.call('user.create',values,function(error,result){
            console.log(result);
          })

        }
      });
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <div style={{padding: "20px"}}>
        <div style={{minWidth: "284px", textAlign: "center",display: "flex", alignItems: "center",justifyContent: "center",flexDirection: "column"}}>
        <br/><br/>
          <h2>注册账号</h2><br/>
          <Form onSubmit={this.handleSubmit} className="login-form" id="sysLogForm">
            <FormItem validateStatus={this.state.username.validateStatus} hasFeedback={this.state.username.hasFeedback} help={this.state.username.help}>
              {getFieldDecorator('userName')(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
              )}
            </FormItem>
            <FormItem validateStatus={this.state.password.validateStatus} hasFeedback={this.state.password.hasFeedback} help={this.state.password.help}>
              {getFieldDecorator('password')(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>

              <Button type="primary" htmlType="submit" className="login-form-button">
                注册
              </Button>
            </FormItem>
          </Form>
        </div>

      </div>


    )
  }
}

const SignupForm = Form.create()(SignupWrap);
export default SignupForm;

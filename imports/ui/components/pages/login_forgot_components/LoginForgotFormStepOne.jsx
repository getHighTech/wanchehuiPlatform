import React, { Component } from 'react';
import Checkbox from 'antd/lib/checkbox';
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
import message from 'antd/lib/message';
import "antd/lib/message/style";

class LoginForgotFormStepOneWrap extends Component {

  constructor(props){
    super(props);
    this.state ={
      username: {
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
    }else{
      this.setState({
        username: {
          validateStatus: "success",
          help: "",
          hasFeedback: false,
        },
      });
      return true;
    }
    return false;

  }

  componentWillReceiveProps(nextProps){

    this.checkBlank(nextProps.form);
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
          Meteor.call("role.by.username", values.userName, function(error, result){
            if (!error) {
              if (!result) {
                message.warning('此用户并不存在!');
                return false;
              }
              if (result.accesses.isSuper) {
                message.warning('您的超级管理员，不允许修改密码!');
                return false;
              }
            }
          })

        }
      });
    }


    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form" id="">
          <FormItem
            label="用户名"
            validateStatus={this.state.username.validateStatus} hasFeedback={this.state.username.hasFeedback} help={this.state.username.help}
          >
          {getFieldDecorator('userName')(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </Form>
      );
    }
  }

const LoginForgotFormStepOne = Form.create()(LoginForgotFormStepOneWrap);
export default LoginForgotFormStepOne;

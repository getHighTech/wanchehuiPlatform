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


class LoginWrap extends Component {

  constructor(props){
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

  handleSubmit = (e) => {
      e.preventDefault();
      let self = this;
      if (!this.checkBlank(this.props.form)) {
        return false;
      }
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
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
          self.props.loginInfo(values);

        }
      });
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

    componentWillReceiveProps(nextProps){

      if (nextProps.validate.username === "unknown"){
        this.setState({
          username: {
            validateStatus: "success",
            help: "",
            hasFeedback: false
          },
        })
      }
      if (nextProps.validate.password === "unknown") {
        this.setState({
          password: {
            validateStatus: "success",
            help: "",
            hasFeedback: false
          },
        })
      }

      this.checkBlank(nextProps.form);

      //从父组件得到 props更新来网络验证
      if (nextProps.validate.username === "unpass") {
        this.setState({
          username: {
            validateStatus: "error",
            help: "用户不存在",
            hasFeedback: true
          },
        })
      }
      if (nextProps.validate.username === "pass") {
        this.setState({
          username: {
            validateStatus: "success",
            help: "",
            hasFeedback: true
          },
        })
      }
      if (nextProps.validate.password === "unpass") {
        this.setState({
          password: {
            validateStatus: "error",
            help: "密码错误",
            hasFeedback: true
          },
        })
      }
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
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
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <Link className="login-form-forgot" to="/login/forgot">忘记密码</Link>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            或者 <a href="">申请成为万人车汇合作者</a>
          </FormItem>
        </Form>
      );
    }
  }

const LoginForm = Form.create()(LoginWrap);
export default LoginForm;

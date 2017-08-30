import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "antd/lib/form/style";
import "antd/lib/icon/style";
import "antd/lib/input/style";
import "antd/lib/button/style";
import "antd/lib/checkbox/style";
const FormItem = Form.Item;
import createBrowserHistory from 'history/createBrowserHistory';
// App component - represents the whole app
const history = createBrowserHistory();
if (Meteor.userId()) {
  history.replace('/');
}

class Login extends Component {

  constructor(props){
    super(props);

  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        let res = Meteor.loginWithPassword(values.userName, values.password , function(error, result){
          console.log(error);
          console.log(result);
        });
        console.log(res);
        }
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form" id="sysLogForm">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入您的用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码' }],
            })(
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
            <a className="login-form-forgot" href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            或者 <a href="">申请成为万人车汇合作者</a>
          </FormItem>
        </Form>
      );
    }
  }

const LoginForm = Form.create()(Login);
export default LoginForm;

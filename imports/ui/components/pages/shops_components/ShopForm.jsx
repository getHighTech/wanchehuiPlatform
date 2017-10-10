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
import { Map } from 'react-amap';

class ShopFormWrap extends Component {

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
      },

    }
  }

  componentDidMount(){

      var map = new AMap.Map('container', {
         center:[117.000923,36.675807],
         zoom:11
      });

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

    }
    render() {



      const { getFieldDecorator } = this.props.form;
      return (
        <Form style={{height: "700px"}} onSubmit={this.handleSubmit} className="login-form" id="sysLogForm">
          <FormItem validateStatus={this.state.username.validateStatus} hasFeedback={this.state.username.hasFeedback} help={this.state.username.help}>
            {getFieldDecorator('userName')(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="店铺名称" />
            )}
          </FormItem>
          <FormItem validateStatus={this.state.password.validateStatus} hasFeedback={this.state.password.hasFeedback} help={this.state.password.help}>
            {getFieldDecorator('password')(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="联系电话" />
            )}
          </FormItem>
          <div id="container" tabIndex="0"></div>

        </Form>
      );
    }
  }

const ShopForm = Form.create()(ShopFormWrap);
export default ShopForm;

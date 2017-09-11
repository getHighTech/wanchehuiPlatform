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
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class NewMemberApplyWrap extends Component {

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



    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form  className="login-form" id="">
          <FormItem
            label="您的称呼"
            validateStatus={this.state.username.validateStatus} hasFeedback={this.state.username.hasFeedback} help={this.state.username.help}
          >
          {getFieldDecorator('applyName')(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
          </FormItem>
          <FormItem
            label="你的邮箱"
            validateStatus={this.state.username.validateStatus} hasFeedback={this.state.username.hasFeedback} help={this.state.username.help}
          >
          {getFieldDecorator('applyEmail')(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
          </FormItem>
          <FormItem
            label="您的联系电话"
            validateStatus={this.state.username.validateStatus} hasFeedback={this.state.username.hasFeedback} help={this.state.username.help}
          >
          {getFieldDecorator('applyMobile')(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
          </FormItem>
          <FormItem
          label="尽情介绍一下您的情况吧"
          >
          {getFieldDecorator('applyMobile')(
              <Editor />
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

const NewMemberApplyForm = Form.create()(NewMemberApplyWrap);
export default NewMemberApplyForm;

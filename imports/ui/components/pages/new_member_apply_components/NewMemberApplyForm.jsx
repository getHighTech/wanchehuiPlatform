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
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

class NewMemberApplyWrap extends Component {

  constructor(props){
    super(props);
    this.state = {
      applyName: {
        validateStatus: "success",
        help: "",
        hasFeedback: false
      },
      applyEmail: {
        validateStatus: "success",
        help: "",
        hasFeedback: false
      }
      ,
      applyMobile: {
        validateStatus: "success",
        help: "",
        hasFeedback: false
      },
      applyIntro:{
        validateStatus: "success",
        help: "",
        hasFeedback: false
      },
      contentState: EditorState.createEmpty(),

    }

  }
  checkBlank(form){
    //判断空值的验证
    if (form.getFieldValue("userName") == "") {
      this.setState({
        applyName: {
          validateStatus: "error",
          help: "用户名不得为空",
          hasFeedback: true,
        },

      });
      return false;
    }else{
      this.setState({
        applyName: {
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
      console.log("这是");
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    }

    onEditorStateChange(editorState) {
      this.setState({
        contentState: editorState,
      });
    }
    uploadImageCallBack(file) {
      console.log(file.type);

      return new Promise(
        (resolve, reject) => {
          // const xhr = new XMLHttpRequest();
          // xhr.open('GET', 'http://gegeyun.b0.aicdn.com/gegeyun/');
          // xhr.setRequestHeader('Authorization', 'Basic moobWt2PQbZkT8/iTjmuL4cUdwI=');
          // const data = new FormData();
          // data.append('image', file);
          //
          // xhr.send(data);
          // xhr.addEventListener('load', () => {
          //   const response = JSON.parse(xhr.responseText);
          //   resolve(response);
          // });
          // xhr.addEventListener('error', () => {
          //   const error = JSON.parse(xhr.responseText);
          //   reject(error);
          // });
        }
      );
    }


    render() {
      const { contentState } = this.state;
      const { getFieldDecorator } = this.props.form;

      console.log(draftToHtml(convertToRaw(contentState.getCurrentContent())));
      return (
        <Form onSubmit={this.handleSubmit}  className="login-form" id="">
          <FormItem
            label="您的称呼"
            validateStatus={this.state.applyName.validateStatus} hasFeedback={this.state.applyName.hasFeedback} help={this.state.applyName.help}
          >
          {getFieldDecorator('applyName')(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="您的姓名" />
          )}
          </FormItem>
          <FormItem
            label="您的邮箱"
            validateStatus={this.state.applyEmail.validateStatus} hasFeedback={this.state.applyEmail.hasFeedback} help={this.state.applyEmail.help}
          >
          {getFieldDecorator('applyEmail')(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="邮箱" />
          )}
          </FormItem>
          <FormItem
            label="您的联系电话"
            validateStatus={this.state.applyMobile.validateStatus} hasFeedback={this.state.applyMobile.hasFeedback} help={this.state.applyMobile.help}
          >
          {getFieldDecorator('applyMobile')(
            <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="手机" />
          )}
          </FormItem>
          <FormItem
          label="尽情介绍一下您的情况吧"
          >
          {getFieldDecorator('applyIntro')(
              <Editor
              onEditorStateChange={this.onEditorStateChange.bind(this)}
              localization={{
                locale: 'zh',
              }}
              toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: {
                    uploadCallback: this.uploadImageCallBack.bind(this), alt: { present: false, mandatory: false },
                    urlEnabled: true,
                    uploadEnabled: true,
                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                  },
                }}
                />
          )}

          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>


        </Form>
      );
    }
  }

const NewMemberApplyForm = Form.create()(NewMemberApplyWrap);
export default NewMemberApplyForm;

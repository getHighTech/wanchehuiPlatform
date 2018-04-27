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
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

function uploadImageCallBack(file) {

  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/images/upload/handler');
      xhr.send(file);

      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);

      });
    }
  );
}


class NewMemberApplyWrap extends Component {

  constructor(props){
    super(props);
    console.log(props);
    const html = this.props.applyInfo.applyIntro;
    console.log(html);
    const contentBlock = htmlToDraft(html);
    console.log(contentBlock);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    console.log(contentState);
    const editorState = EditorState.createWithContent(contentState);
    console.log(editorState);
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
      contentState: editorState,

    };


  }
  state={
    a:'',
    b:0
  }
  componentDidMount(){

    if (this.props.applyInfo.applyName != "") {
      //保持住填写的内容

      this.props.form.setFieldsValue({
          applyName: this.props.applyInfo.applyName,
          applyEmail: this.props.applyInfo.applyEmail,
          applyMobile: this.props.applyInfo.applyMobile,
      });
    }

  }
  //判断文本编辑器是否为空
  checkBlockBlank(blocks){
    if (blocks.length<=1) {
      if (blocks[0].text == "") {
        //=========更改状态
        this.setState({
          applyIntro: {
            validateStatus: "error",
            help: "麻烦介绍你自己嘛",
            hasFeedback: true,
          },

        });
        //=============
        return false;
      }else{
        this.setState({
          applyIntro: {
            validateStatus: "success",
            help: "",
            hasFeedback: false,
          },
        });
      }

    }

    return true;
  }

  checkBlank(form){
    //判断空值的验证

    if (form.getFieldValue("applyIntro") == undefined) {
      this.setState({
        applyIntro: {
          validateStatus: "error",
          help: "麻烦介绍你自己不",
          hasFeedback: true,
        },

      });
    }else {
      //文本块行数
        let blocks = form.getFieldValue("applyIntro").blocks;
        console.log(blocks);
        this.checkBlockBlank(blocks);

    }
    if (this.props.applyInfo.applyIntro != undefined) {
      this.setState({
        applyIntro: {
          validateStatus: "success",
          help: "",
          hasFeedback: false,
        },
      });
    }

    if (form.getFieldValue("applyName") == "") {
      this.setState({
        applyName: {
          validateStatus: "error",
          help: "请填写您的称谓",
          hasFeedback: true,
        },

      });
    }else{
      this.setState({
        applyName: {
          validateStatus: "success",
          help: "",
          hasFeedback: false,
        },
      });
    }
    //判断空值的验证
    if (form.getFieldValue("applyMobile") == "") {
      this.setState({
        applyMobile: {
          validateStatus: "error",
          help: "请填写您的联系手机",
          hasFeedback: true,
        },

      });
    }else{
      this.setState({
        applyMobile: {
          validateStatus: "success",
          help: "",
          hasFeedback: false,
        },
      });
    }
    //判断空值的验证
    if (form.getFieldValue("applyEmail") == "") {
      this.setState({
        applyEmail: {
          validateStatus: "error",
          help: "请填写您的邮箱",
          hasFeedback: true,
        },

      });
      return false;
    }else{
      this.setState({
        applyEmail: {
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
      this.checkBlank(this.props.form);
      let self = this;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values.applyName == undefined) {
            self.setState({
              applyName: {
                validateStatus: "error",
                help: "请填写您的称谓",
                hasFeedback: true,
              },

            });
            return false;
          }
          if (values.applyEmail == undefined) {
            self.setState({
              applyEmail: {
                validateStatus: "error",
                help: "请填写您的邮箱",
                hasFeedback: true,
              },

            });
              return false;
          }
          if (values.applyMobile == undefined) {
            self.setState({
              applyMobile: {
                validateStatus: "error",
                help: "请填写您的手机号",
                hasFeedback: true,
              },

            });
          }
          console.log(self.state.contentState);
          let htmlcontent = draftToHtml(convertToRaw(self.state.contentState.getCurrentContent()));
          console.log(htmlcontent);
          const contentBlock = htmlToDraft(htmlcontent);
          console.log(contentBlock);
          if (contentBlock == undefined) {
            self.setState({
              applyIntro: {
                validateStatus: "error",
                help: "麻烦介绍一下您呢",
                hasFeedback: true,
              },

            });
            return false;
          }


          if (!self.checkBlockBlank(contentBlock)) {
              return false;
          }
          //提交的表单验证完毕
          //开始将表单提交到数据库
          self.props.synicFormInfo(
            values.applyName, values.applyEmail, values.applyMobile, htmlcontent
          );



        }
      });

    }

    onEditorStateChange(editorState) {
      console.log(editorState);
      this.setState({
        contentState: editorState,
      });
    }



    render() {
      const { contentState } = this.state;
      const { getFieldDecorator } = this.props.form;

      return (
        <Form onSubmit={this.handleSubmit}  className="login-form" id="">
          <FormItem
            label="您的称呼"
            validateStatus={this.state.applyName.validateStatus} hasFeedback={this.state.applyName.hasFeedback} help={this.state.applyName.help}
          >
          {getFieldDecorator('applyName')(
            <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="您的姓名" />
          )}
          </FormItem>
          <FormItem
            label="您的邮箱"
            validateStatus={this.state.applyEmail.validateStatus} hasFeedback={this.state.applyEmail.hasFeedback} help={this.state.applyEmail.help}
          >
          {getFieldDecorator('applyEmail')(
            <Input type="email" prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="邮箱" />
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
          validateStatus={this.state.applyIntro.validateStatus} hasFeedback={this.state.applyIntro.hasFeedback} help={this.state.applyIntro.help}
          >
          {getFieldDecorator('applyIntro')(
              <Editor
              onEditorStateChange={this.onEditorStateChange.bind(this)}
               initialEditorState={contentState}
                 editorState={contentState}
              localization={{
                locale: 'zh',
              }}
              toolbarClassName="rdw-storybook-toolbar"
               wrapperClassName="rdw-storybook-wrapper"
               editorClassName="rdw-storybook-editor"
              toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: {
                    uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false },
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

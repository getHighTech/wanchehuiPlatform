//此组件用于测试
import React, { Component } from 'react';
import Upload from 'antd/lib/upload/';
import 'antd/lib/upload/style';
import Button from 'antd/lib/button/';
import 'antd/lib/button/style';
import Icon from 'antd/lib/icon/';
import 'antd/lib/icon/style';
import Input from 'antd/lib/input';
import "antd/lib/form/style";
import UserBasicViewPopover from './tools/UserBasicViewPopover.jsx';
import DateRange from './withdrawals/DateRange.jsx';
import Form from 'antd/lib/form';
import "antd/lib/form/style";
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import Select from 'antd/lib/select';
import "antd/lib/select/style";
const FormItem = Form.Item;
const { TextArea } = Input;
import { Row, Col } from 'antd';


import MDReactComponent from 'markdown-react-js';




var Markdown = require('react-markdown');


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


let uuid = 0;
class ComponentTest extends Component {
  remove = (k) => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    }

    add = () => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(uuid);
      uuid++;
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    }

    handleSubmit = (e) => {
      let self =this;
      const { form } = this.props;
      e.preventDefault();
      const getFieldValue = this.props.form.getFieldValue;
      console.log(getFieldValue('keys'))

          let end_spec=[];
          for(var i =0;i<getFieldValue('keys').length;i++){
            var spec_index=getFieldValue('keys')[i]
            var spec_name =getFieldValue('spec_name')[spec_index];
            var spec_value= parseFloat(getFieldValue('spec_value')[spec_index])
            var o1={spec_name:spec_name};
            var o2={spec_value:spec_value};
            var o3={isThis:false}
            var obj =Object.assign(o1,o2,o3)
            end_spec.push(obj);
          }
          console.log(end_spec);
          // const setFieldsValue = this.props.form.setFieldsValue;
          // setFieldsValue({specifications:end_spec})
    }

    render() {
      const { getFieldDecorator, getFieldValue } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      console.log(keys);
      const formItems = keys.map((k, index) => {
        return (
          <FormItem
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? 'Passengers' : ''}
            required={false}
            key={k}
          >
            {getFieldDecorator(`spec_name[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              }],
            })(
              <Input placeholder="passenger name" style={{ width: '30%', marginRight: 8 }} />
            )}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>
        );
      });
      const formItems2 = keys.map((k, index) => {
        return (
          <FormItem
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? 'Passengers' : ''}
            required={false}
            key={k}
          >
            {getFieldDecorator(`spec_value[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
              }],
            })(
              <Input placeholder="passenger name" style={{ width: '80%', marginRight: 8 }} />
            )}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>
        );
      });
  return (
    <Form onSubmit={this.handleSubmit}>
    <Row>
      <Col span={6}></Col>
      <Col span={6}>{formItems}</Col>
      <Col span={6}>{formItems2}</Col>
      <Col span={6}></Col>
    </Row>


        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
  );
}




}
const WrappedComponentTest = Form.create()(ComponentTest);

export default WrappedComponentTest;

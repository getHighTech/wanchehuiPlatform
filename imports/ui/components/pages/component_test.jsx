//此组件用于测试
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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





let uuid = 0;
let aaa = 0;
class ComponentTest extends Component {

  state = {

 }
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
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;

    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  addmodal = () =>{
    const { form } = this.props;
    const child = form.getFieldValue('child');
    const nextKeys = child.concat(aaa);
    aaa++;
    console.log(child);
    form.setFieldsValue({
      child: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
     getFieldDecorator('child',{initialValue:[]})
     const keys = getFieldValue('keys');
     const child = getFieldValue('child');
     const formItems2=child.map((k,index)=>{
       return (
         <FormItem
           {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
           label={index === 0 ? 'Passengers' : ''}
           required={false}
           key={k}
         >
           {getFieldDecorator(`result[${k}]`, {
             validateTrigger: ['onChange', 'onBlur'],
             rules: [{
               required: true,
               whitespace: true,
               message: "Please ",
             }],
           })(
             <Input placeholder="passenger name" style={{ width: '20%', marginRight: 8 }} />
           )}



         </FormItem>
       )
     })
     const formItems = keys.map((k, index) => {
       return (
         <FormItem
           {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
           label={index === 0 ? 'Passengers' : ''}
           required={false}
           key={k}
         >
           {getFieldDecorator(`names[${k}]`, {
             validateTrigger: ['onChange', 'onBlur'],
             rules: [{
               required: true,
               whitespace: true,
               message: "Please input passenger's name or delete this field.",
             }],
           })(
             <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
           )}
           {keys.length > 1 ? (
             <Icon
               className="dynamic-delete-button"
               type="minus-circle-o"
               disabled={keys.length === 1}
               onClick={() => this.remove(k)}
             />
           ) : null}
           <br /><br />
           <Button onClick={this.addmodal}>12312</Button>

         </FormItem>
       );
     });
     return (
       <Form onSubmit={this.handleSubmit}>
         {formItems}
         {formItems2}
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

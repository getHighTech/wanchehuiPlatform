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

  state = {
   fileList: [{
     uid: -1,
     name: 'xxx.png',
     status: 'done',
     url: 'http://www.baidu.com/xxx.png',
   }],
 }
 handleChange = (info) => {
   let fileList = info.fileList;

   // 1. Limit the number of uploaded files
   //    Only to show two recent uploaded files, and old ones will be replaced by the new
   fileList = fileList.slice(-2);

   // 2. read from response and show file link
   fileList = fileList.map((file) => {
     console.log(file.response);
     if (file.response) {
       // Component will show file.url as link
       file.url = file.response.url;
     }
     console.log(file);
     return file;
   });

   // 3. filter successfully uploaded files according to response from server
   fileList = fileList.filter((file) => {
     if (file.response) {
       return file.response.status === 'success';
     }
     return true;
   });
   console.log(fileList);
   this.setState({ fileList });
 }
 render() {
   const props = {
     action: '//jsonplaceholder.typicode.com/posts/',
     onChange: this.handleChange,
     multiple: true,
   };
   return (
     <Upload {...props} fileList={this.state.fileList}>
       <Button>
         <Icon type="upload" /> upload
       </Button>
     </Upload>
   );
 }



}
const WrappedComponentTest = Form.create()(ComponentTest);

export default WrappedComponentTest;

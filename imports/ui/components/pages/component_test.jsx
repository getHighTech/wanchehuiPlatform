//此组件用于测试
import React, { Component } from 'react';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';
import "antd/lib/form/style";
import Form from 'antd/lib/form';
import "antd/lib/form/style";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import "antd/lib/select/style";
import UploadToCloudinary from '../public/UploadToCloudinary';






class ComponentTest extends Component {

getRemoteImages = (remoteUrls) => {
  console.log(remoteUrls);
}

  render() {

     return (
       <Form>
          <UploadToCloudinary getRemoteImages={this.getRemoteImages} />
       </Form>
     );
   }
 }
const WrappedComponentTest = Form.create()(ComponentTest);

export default WrappedComponentTest;

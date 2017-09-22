import React from "react";

import Button from 'antd/lib/button';

import Upload from 'antd/lib/upload';

import message from 'antd/lib/message';

import Icon from 'antd/lib/icon';

import 'antd/lib/icon/style/';
import "antd/lib/button/style/";
import 'antd/lib/upload/style/';
import 'antd/lib/message/style/';






class upLoadButton  extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div>
        <Upload>
          <Button>
            <Icon type="upload" /> { this.props.children }
          </Button>
        </Upload>
      </div>
    )
  }
}

export default upLoadButton;

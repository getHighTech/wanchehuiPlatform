'use strict';

import React from "react";

import { connect } from 'react-redux';

import Button from 'antd/lib/button';

import Upload from 'antd/lib/upload';

import message from 'antd/lib/message';

import Icon from 'antd/lib/icon';


import 'antd/lib/icon/style/';
import "antd/lib/button/style/";
import 'antd/lib/upload/style/';
import 'antd/lib/message/style/';


class GiveCardToUser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fail: 0,
      success: 0,
      found: 0,
      messages: [],
    }

  }

  render() {
    let self = this;
    const props = {
      name: 'file',
      action: '/excels/upload/mobile_agency',
      headers: {
        authorization: 'authorization-text',
        contentType: "application/x-www-form-urlencoded;charset=utf8",
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log("上传完毕");
        }
        if (info.file.status === 'done') {
          self.setState({
            fail: info.file.response.fail,
            success: info.file.response.success,
            found: info.file.response.found,
            messages: info.file.response.messages
          });
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    let listMessages = () => {
      return self.state.messages.map((item, index) => {
        console.log(item);
        return (
          <li key={index}><div dangerouslySetInnerHTML={{__html: item}} /></li>
        )
      });
    }


    return (
      <div style={{background: 'rgb(236, 236, 236)', position: 'relative', left: "-40px",
            padding: '5px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center' }}>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 导入代理链Excel表格
              </Button>
            </Upload>
            <br/>
            <div style={{width: "90%"}}>
            <h3>详细信息:</h3>
              <ul>
                <li>需要处理：{this.state.found}个用户</li>
                <li>
                  <ul>
                    {listMessages()}
                  </ul>
                </li>
                <li><div dangerouslySetInnerHTML={{__html: this.state.found}} /></li>
              </ul>

            </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(GiveCardToUser);

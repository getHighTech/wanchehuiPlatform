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
      users: []
    }

  }

  render() {
    let self = this;
    const props = {
      name: 'file',
      action: '/excels/upload/mobile_agency',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          self.setState({
            users: info.file.response,
          });
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    let listUsers = function(){
      return self.state.users.map((user, index)=>{
        console.log(user.length);
        if (user.length > 1) {
          return (
            <div key={index}>
              <span>{user[0]}</span>|<span>{user[1]}</span>
            </div>
          )
        }

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
            <div style={{width: "50%"}}>
            <h3>显示</h3>
            {listUsers()}
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

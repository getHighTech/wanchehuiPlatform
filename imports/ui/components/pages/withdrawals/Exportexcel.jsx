import React from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Button from 'antd/lib/button/';
import 'antd/lib/button/style';

class Exportexcel extends React.Component {

  state = {
    size: 'large',
  };
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }


  render(){
    let self = this;
    const props = {
      name: 'file',
      action: '/excels/upload/mobile_agency',
      headers: {
        authorization: 'authorization-text',
        contentType: "application/x-www-form-urlencoded;charset=utf8",
      },
      onChange(info) {
        console.log(info);
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
    const size = this.state.size;
    return (

        <div >
              <Button {...props} type="primary" icon="download" size={size}>导出当前页面数据</Button>
        </div>



    )
  }


}

function mapStateToProps(state) {
  return {

   };
}

export default connect(mapStateToProps)(Exportexcel);

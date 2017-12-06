//此组件用于测试
import React, { Component } from 'react';

import Upload from 'antd/lib/upload/';
import 'antd/lib/upload/style';
import Button from 'antd/lib/button/';
import 'antd/lib/button/style';
import Icon from 'antd/lib/icon/';
import 'antd/lib/icon/style';
// import AMapSearcher from './tools/AMapSearcher.jsx';
// import UserFinderModal from './tools/UserFinderModal.jsx';
import UserBasicViewPopover from './tools/UserBasicViewPopover.jsx';

class ComponentTest extends Component {
  constructor(props) {
    super(props);
  }
  getUserId(userId){
    console.log(userId);
  }
  

  render(){
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [...fileList],
    };

    const fileList = [{
      uid: -1,
      name: 'xxx.png',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }, {
      uid: -2,
      name: 'yyy.png',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }];
    
    
    return (

        <div style={{position: 'relative', left: "-40px",
              padding: '5px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center' }}>
              <UserBasicViewPopover username='18820965455'/>
              {/* <Upload {...props}>
                <Button>
                  <Icon type="upload" /> upload
                </Button>
              </Upload> */}
        </div>
       

     
    )
  }


}


export default ComponentTest;

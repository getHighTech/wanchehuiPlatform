//此组件用于在高德地图中定位输入的文本的位置
import React, { Component } from 'react';

import AMapSearcher from './tools/AMapSearcher.jsx';

class ComponentTest extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div style={{position: 'relative', left: "-40px",
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center' }}>
        <AMapSearcher />
      </div>

    )
  }


}


export default ComponentTest;

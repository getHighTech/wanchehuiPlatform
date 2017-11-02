//此组件用于在高德地图中定位输入的文本的位置
import React, { Component } from 'react';

// import AMapSearcher from './tools/AMapSearcher.jsx';
import UserFinderModal from './tools/UserFinderModal.jsx';

class ComponentTest extends Component {
  constructor(props) {
    super(props);
  }
  getUserId(userId){
    console.log(userId);
  }

  render(){
    return (
      <div style={{position: 'relative', left: "-40px",
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center' }}>
            <UserFinderModal getUserId={(userId)=> this.getUserId(userId)} />
      </div>

    )
  }


}


export default ComponentTest;

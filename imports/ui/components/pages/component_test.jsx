//此组件用于测试
import React, { Component } from 'react';

// import AMapSearcher from './tools/AMapSearcher.jsx';
// import UserFinderModal from './tools/UserFinderModal.jsx';
import UserBasicViewPopover from './tools/UserBasicViewPopover.jsx';
import DateRange from './withdrawals/DateRange.jsx';
class ComponentTest extends Component {
  constructor(props) {
    super(props);
  }
  getUserId(userId){
    console.log(userId);
  }

  render(){
    const showstyle ={width:'200',height:'200',position: 'relative'}

    return (
      <div style={{position: 'relative', left: "-40px",
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center' }}>
            <UserBasicViewPopover username='18820965455'/>
            <div style={{width:"100"}}><DateRange popupStyle={showstyle}/></div>
      </div>

    )
  }


}


export default ComponentTest;

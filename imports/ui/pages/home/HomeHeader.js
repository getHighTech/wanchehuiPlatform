import React from 'react';
import HeaderUserArea from '/imports/ui/components/HeaderUserArea.js';


const HomeHeader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }}>

    <h2>仪表盘</h2>
    <HeaderUserArea  />
  </div>
)

export default HomeHeader;

import React from 'react';
import HeaderUserArea from '/imports/ui/components/HeaderUserArea.js';


const CarsHeader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }}>

    <h2>车辆管理</h2>
    <HeaderUserArea  />
  </div>
)

export default CarsHeader;

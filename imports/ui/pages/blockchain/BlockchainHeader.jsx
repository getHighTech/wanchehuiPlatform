import React from 'react';
import HeaderUserArea from '/imports/ui/components/HeaderUserArea.js';


const BlockchainHeader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }}>

    <h2>区块链</h2>
    <HeaderUserArea  />
  </div>
)

export default BlockchainHeader;

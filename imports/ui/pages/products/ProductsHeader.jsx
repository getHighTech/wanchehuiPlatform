import React from 'react';
import HeaderUserArea from '/imports/ui/components/HeaderUserArea.js';


const ProductsHeader = (path) => {
  console.log(path.match.path);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>

      <h2>产品管理</h2>
      <HeaderUserArea  />
    </div>
  )
}

export default ProductsHeader;

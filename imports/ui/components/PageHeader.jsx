import React from 'react';
import HeaderUserArea from '/imports/ui/components/HeaderUserArea.js';


const PageHeader = (path) => {
  let title = function(path){
    switch (path.match.path) {
      case "/products":
        return "商品管理"
        break;
      case "/blockchain":
        return "区块链"
        break;
      default:
        return "未定义页面";
        break;

    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>

      <h2>{title(path)}</h2>
      <HeaderUserArea  />
    </div>
  )
}

export default PageHeader;

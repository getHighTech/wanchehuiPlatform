import React from 'react';
import HeaderUserArea from './HeaderUserArea.js';


const PageHeader = (path) => {
  let title = function(path){
    switch (path) {
      case "/component_test":
        return "组件测试页面"
        break;
      case "/products":
        return "商品管理"
        break;
      case "/shops":
        return "店铺管理"
        break;
      case "/orders":
        return "订单管理"
        break;
      case "/roles":
        return "角色管理"
        break;
      case "/blockchain":
        return "区块链"
        break;
      case "/settings":
        return "系统设置"
        break;
      case "/users":
        return "用户管理"
        break;
      case "/":
        return "控制面板";
        break;
      case "/give_card_to_users":
        return "分销链接数据丢失紧急补丁";
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

      <h2>{title(path.path.pathname)}</h2>
      <HeaderUserArea  />
    </div>
  )
}

export default PageHeader;

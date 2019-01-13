import React from 'react';
import HeaderUserArea from './HeaderUserArea.js';


const PageHeader = (path) => {
  let title = function(path){
    switch (path) {
      case "/component_test":
        return "组件测试页面"
        break;
      case "/productclass":
        return "商品分类"
        break;
      case "/order_state":
        return "通讯录管理系统"
        break;
      case "/products":
        return "商品管理"
        break;
      case "/withdrawals":
        return "提现管理"
        break;
      case "/shops":
        return "店铺管理"
        break;
      case (path.match(/\/shops\/single_shop\/shop_details\/\S{2,}/) || {}).input:
      // /\/shops\/singleshop\/publishgoods\/\S{2,}/.test(path):
        return "商家店铺详情"
        break;
        case (path.match(/\/orders\/order_details\/\S{2,}/) || {}).input:
        // /\/shops\/singleshop\/publishgoods\/\S{2,}/.test(path):
          return "订单详情"
          break;
      case "/shops/shop_item":
      return "新增店铺"
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
      case "/agencies_relations":
        return "分销关系管理";
        break;
      case "/cards":
        return "会员卡管理";
        break;
      case "/svips":
        return "高级会员管理";
      case "/cvips":
        return "普通会员管理";
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

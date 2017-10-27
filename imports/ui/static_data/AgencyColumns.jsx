import React from "react";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

const createdAt = {
  title: '注册时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render: (text, record) => {
    return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
  }
};


const user = {
  title: '用户名／手机号',
  dataIndex: 'userId',
  key: 'userId',
  render: (text, record) => {
    return (<span>text</span>)
  }

}

const product = {
  title: '所分享的商品',
  dataIndex: 'productId',
  key: 'productId',
  render: (text, record) => {
    return (<span>text</span>);
  }
}

const superAgency = {
  title: '上级代理',
  dataIndex: 'superAgencyId',
  key: 'superAgencyId',
  render: (text, record) => {
    return (<span>text</span>);
  }
}

const lowerAgencies = {
  title: "其下级代理",
  dataIndex: 'productId',
  key: 'productId',
  render: (text, record) => {
    return (<span>text</span>)
  }
}

export const AgencyColumns = {
  createdAt,user, product, superAgency, lowerAgencies
}

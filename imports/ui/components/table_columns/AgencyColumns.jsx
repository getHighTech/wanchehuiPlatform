import React from "react";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

import UserById from './TableComponents/UserById'
import UserByAgencyId from './TableComponents/UserByAgencyId'
import ProductById from './TableComponents/ProductById'
import AgencyChange from './TableComponents/AgencyChange';
import LookUpLowerAgencies from './TableComponents/LookUpLowerAgencies.js'

import {getAgencyId} from '/imports/ui/actions/current_deal_agency.js';


import configureStore from "/imports/ui/stores/mainStore";
const store = configureStore();

const actionStyle = {
   fontSize: 16, color: '#08c'
};


const createdAt = {
  title: '分销时间',
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
    if (record) {
      return (<UserById userId={text} />);
    }else{
      return (<span>加载中</span>)
    }

  }

}

const product = {
  title: '所分享的商品',
  dataIndex: 'productId',
  key: 'productId',
  render: (text, record) => {
    return (<ProductById productId={text} />);
  }
}



const superAgency = {
  title: '上级代理',
  dataIndex: 'superAgencyId',
  key: 'superAgencyId',
  render: (text, record) => {
    let extraBackData = {
      type: "changeSuperAgency",
      record,
    }
    if (record) {
      return (
        <AgencyChange userId={record.userId} extraBackData={extraBackData} agencyId={text} />
      );
    }else{
      return (<span>加载中</span>)
    }
  }
}

const lowerAgencies = {
  title: "其下级代理",
  dataIndex: 'lowerAgencies',
  key: 'lowerAgencies',
  render: (text, record) => {

    return (<LookUpLowerAgencies agencyId={record._id} />)
  }
}

export const AgencyColumns = [
  createdAt,user, product, superAgency, lowerAgencies
]

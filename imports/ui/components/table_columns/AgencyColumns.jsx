import React from "react";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

import UserById from './TableComponents/UserById'
import UserByAgencyId from './TableComponents/UserByAgencyId'
import UserFinderModal from '../pages/tools/UserFinderModal.jsx';

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
    return (<span>{text}</span>);
  }
}



const superAgency = {
  title: '上级代理',
  dataIndex: 'superAgencyId',
  key: 'superAgencyId',
  render: (text, record) => {
    let getUserId= function(userId){
      //触发自定义的事件，把这个userId,在父组件内部处理
      $(document).trigger("select-user-id",userId);
    }
    if (record) {
      return (
        <div >
            <UserByAgencyId agencyId={text} />
            <UserFinderModal text="选择并更改其上级" getUserId={(userId)=> getUserId(userId)} />
        </div>);
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
    return (<span>
      <Tooltip placement="topLeft" title="查看下级代理" arrowPointAtCenter>
        <Button shape="circle" icon="eye" data-id={record._id} className="lookup-lower-agencies"  style={actionStyle} />
      </Tooltip>
      </span>)
  }
}

export const AgencyColumns = [
  createdAt,user, product, superAgency, lowerAgencies
]
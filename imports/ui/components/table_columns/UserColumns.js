import React from "react";
import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";



const actionStyle = {
   fontSize: 16, color: '#08c'
};

const header = {
  title: '头像',
  dataIndex: 'headurl',
  key: 'headurl',
  render: text => <img style={{width: '100px'}} src={text} />,
};
const mobile = {
  title: '电话号码',
  dataIndex: 'profile.mobile',
  key: 'profile.mobile',
};
const username = {
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
};

const carnumber = {
  title: '车牌号',
  dataIndex: 'carnumber',
  key: 'carnumber',
};

const createdAt = {
  title: '注册时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render: (text, record) => {
    return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
  }
};

const hasCards = {
  title: '是否有卡',
  dataIndex: 'hasCard',
  key: 'hasCard',
  render: (text, record) => {
    if (!(record.cards)) {
      return(
      <span>无　&nbsp; | &nbsp;
         <Button className="give-user-card"   style={actionStyle}>
            <span data-id={record._id}>授卡</span>
         </Button>
         </span>
      );
    }else{
      return (<span>有　&nbsp; | &nbsp;
        <Button className="ban-user-card"  style={actionStyle}>
           <span data-id={record._id}>禁卡</span>
        </Button>
        </span>);
    }

  }
};


const action = {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Tooltip placement="topLeft" title="查看详情" arrowPointAtCenter>
        <Button className="on-dev-unfinished" shape="circle" icon="eye"  style={actionStyle} />
      </Tooltip>
      <span className="ant-divider" />
      <Tooltip placement="topLeft" title="封号" arrowPointAtCenter>
        <Button  className="on-dev-unfinished" shape="circle" icon="lock"  style={actionStyle} />
      </Tooltip>
      <span className="ant-divider" />
      <Tooltip placement="topLeft" title="重置密码" arrowPointAtCenter>
        <Button  className="on-dev-unfinished" shape="circle" icon="key"  style={actionStyle} />
      </Tooltip>
      <span className="ant-divider" />
    </span>
  ),
};
const SelectAction = {
  title: '选择',
  dataIndex: 'action',
  key: 'action',
  render: (text, record) => (
    <span>
        <Button data-id={record._id}  className="select-user-id" shape="circle" icon="point"  style={actionStyle} />
    </span>
  ),
};

export const UserColumns = [
      header,mobile, username,carnumber,createdAt,hasCards,action
];
export const SelectUserColumns = [
    header,mobile, username,createdAt,SelectAction
];

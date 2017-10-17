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
export const UserColumns = [
      {
        title: '头像',
        dataIndex: 'headurl',
        key: 'headurl',
        render: text => <img style={{width: '100px'}} src={text} />,
      },
      {
      title: '电话号码',
      dataIndex: 'profile.mobile',
      key: 'profile.mobile',
    },{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '车牌号',
      dataIndex: 'carNumber',
      key: 'carNumber',
    }, {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => {
        return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
      }
    },
    {
      title: '是否有卡',
      dataIndex: 'hasCard',
      key: 'hasCard',
      render: (text, record) => {
        if (record.cards === undefined) {
          return(
          <span>无　&nbsp; | &nbsp; 授卡</span>
          );
        }else{
          return (<span>有　&nbsp; | &nbsp; 禁卡</span>);
        }

    }
    },{
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Tooltip placement="topLeft" title="查看详情" arrowPointAtCenter>
            <Button shape="circle" icon="eye"  style={actionStyle} />
          </Tooltip>
          <span className="ant-divider" />
          <Tooltip placement="topLeft" title="封号" arrowPointAtCenter>
            <Button shape="circle" icon="minus-circle"  style={actionStyle} />
          </Tooltip>
          <span className="ant-divider" />
        </span>
      ),
    }
];

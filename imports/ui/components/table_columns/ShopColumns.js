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
export const ShopColumns = [
      {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        render: text => <img style={{width: '100px'}} src={text} />,
      },
      {
      title: '店名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '联系电话',
      dataIndex: 'mobile',
      key: 'mobile',
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
          <Tooltip placement="topLeft" title="删除此记录" arrowPointAtCenter>
            <Button shape="circle" icon="delete"  style={actionStyle} />
          </Tooltip>
          <span className="ant-divider" />
          <Tooltip placement="topLeft" title="编辑此记录" arrowPointAtCenter>
            <Button shape="circle" icon="edit"  style={actionStyle} />
          </Tooltip>

        </span>
      ),
    }
];

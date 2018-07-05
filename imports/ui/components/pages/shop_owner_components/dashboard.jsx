'use strict';

import React from "react";

import { connect } from 'react-redux';
import Card from 'antd/lib/card/';
import 'antd/lib/card/style';

import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";

import Button from 'antd/lib/button';
import "antd/lib/button/style";
import { Table } from 'antd';

import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

class ShopDashBoard extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(Meteor.userId());
    }





    render() {

        const columns = [{
            title: '商品名',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '付款件数',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '付款金额',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '付款订单數',
            dataIndex: 'address1',
            key: 'address1',
        }, {
            title: '退款订单數',
            dataIndex: 'address2',
            key: 'address2',
        }, {
            title: '利润率',
            dataIndex: 'price',
            key: 'price'
        }
            // {
            //   title:'订单时间',
            //   dataIndex:'time',
            //   key:'time'
            // }
        ];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '4',
            name: 'price',
            age: 32,
            address: '12'
        }];

        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(ShopDashBoard);

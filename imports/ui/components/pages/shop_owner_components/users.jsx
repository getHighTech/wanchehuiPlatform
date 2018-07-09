import React, { Component } from 'react';
import { Input } from 'antd';
import { Table, Icon, Divider,Tooltip,Button } from 'antd';


class UsersForShop extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: [],
            condition:{},
            currentPage:1,
            appName:''
         }
    }

    forbiddenUser(){
        console.log('禁用')
    }
    handleSearchInput(str) {
        let condition = { 
            reqApp:appName,
            $or: [
                { 'profile.mobile': eval("/" + str + "/") },
                { username: eval("/" + str + "/") },
                { nickname: eval("/" + str + "/") }
            ]
        };
        console.log(str)
        this.getPageUsers(1, 20, condition);
        this.setState({
            condition,
            currentPage: 1,
        });
        console.log(this.state.condition);
    }
    render() { 
        const columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '手机号码',
            dataIndex: 'profile.mobile',
            key: 'profile.mobile',
        }, {
            title: '注册时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record) => {
                return (<span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>);
            }
        }, {
            title: '注册APP',
            dataIndex: 'regApp',
            key: 'regApp',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Tooltip placement="topLeft" title="禁用/启用" arrowPointAtCenter>
                        <Button shape="circle" onClick={() => this.forbiddenUser(record._id)} icon="user-add" />
                    </Tooltip>
                </span>
            ),
        }];
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
        }];
        return ( 
            <div>
                <Input.Search
                    placeholder="用户名｜电话｜昵称"
                    style={{ width: '75%' }}
                    onInput={input => this.handleSearchInput(input.target.value)}
                />
                <Divider />
                <Table columns={columns} dataSource={data} rowKey='_id' />

            </div>
         )
    }
}
 
export default UsersForShop;
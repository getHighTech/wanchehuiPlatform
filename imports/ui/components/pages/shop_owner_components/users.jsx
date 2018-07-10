import React, { Component } from 'react';
import { Input } from 'antd';
import { Table, Divider,Tooltip,Button } from 'antd';


class UsersForShop extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: [],
            currentPage:1,
            appName:'',
            shopId:'',
            totalCount:100
         }
    }
    componentDidMount(){
        let self = this
        let userId = Meteor.userId()
        console.log(userId)
        Meteor.call('shops.getByCurrentUser', userId, function (err, rlt) {
            if (!err) {
                console.log(rlt.appName)
                self.setState({
                    appName:rlt.appName,
                    shopId: rlt._id,
                })
                self.getUsersByAppName(rlt._id, 1, 20, condition = {})
            }
        })
    }

    handlePageChange(page,pageSize){
        console.log(page),
        console.log(pageSize),
            this.getUsersByAppName(this.state.shopId, page, pageSize, condition = {})
    }
    getUsersByAppName(shopId, page, pageSize,condition={}){
        let self = this
        Meteor.call('user.get.by.appName', shopId, page, pageSize,condition,function(err,rlt){
            self.setState({
                users:rlt,
                currentPage: page
            })
        })
    }
    forbiddenUser(){
        console.log('禁用')
    }
    handleSearchInput(str) {
        let self = this
        let condition = { 
            $or: [
                { 'profile.mobile': eval("/" + str + "/") },
                { username: eval("/" + str + "/") },
                { nickname: eval("/" + str + "/") }
            ]
        };
        console.log(str)
        Meteor.call('user.get.by.dimSearch', condition, this.state.shopId, 1, 20, function (err, rlt) {
            self.setState({
                users: rlt,
                currentPage: 1
            })
        })
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
            title: '首次注册APP',
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
        const users = this.state.users
        console.log(users)
        return ( 
            
            <div>
                <Input.Search
                    placeholder="用户名｜电话｜昵称"
                    style={{ width: '75%' }}
                    onInput={input => this.handleSearchInput(input.target.value)}
                />
                <Divider />
                <Table columns={columns} 
                dataSource={users} 
                rowKey='_id' 
                pagination={{
                    defaultPageSize: 20, total: this.state.totalCount,
                    onChange: (page, pageSize) => this.handlePageChange(page, pageSize),
                    showQuickJumper: true, current: this.state.currentPage
                }}/>

            </div>
         )
    }
}
 
export default UsersForShop;
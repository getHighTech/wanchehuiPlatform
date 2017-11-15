
import React from "react";

import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Table from 'antd/lib/table';
import "antd/lib/table/style";

import Input from 'antd/lib/input';
import 'antd/lib/input/style';

import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style';

import { Roles } from '/imports/api/roles/roles.js';

import { AgencyColumns } from '../table_columns/AgencyColumns'

import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';

import message from 'antd/lib/message';
import 'antd/lib/message/style';

import { getMeteorAgenciesLimit } from '../../services/agencies.js';
import { getUserIdsLimit } from '../../services/users.js';
import {refreshClear} from '/imports/ui/actions/agency_change.js';
import {clearAgencyId} from '/imports/ui/actions/current_deal_agency.js';

const confirm = Modal.confirm;

import watch from 'redux-watch'


class AgenciesRelations extends React.Component{
  constructor(props) {
    super(props);
    let self = this;
    self.state = {
      agencies: [],
      totalCount: 50000,
      condition: {},
      currentPage: 1,
      loadingTip: "加载中...",
      tableLoading: true,
      pageSize: 20,
      currentAgency: {

      }
    }
  }
  handleSearchInput(str){
    $('.agency-search-title h3').html('用户关键字：<b>\"'+str+"\"</b>的搜索结果");
    if (str === '') {
      $('.agency-search-title h3').html('最近的代理链');
    }
    let condition = {
      $or: [
        {'profile.mobile': eval("/"+str+"/")},
        {username: eval("/"+str+"/")},
        {nickname:eval("/"+str+"/")}
      ]
    }
    this.setState({
      tableLoading:true
    });
    getUserIdsLimit(condition, 1, 20, (err, rlt)=>{
      if (!err) {
        this.setState({
          condition: {
            userId: {
              $in: rlt,
            }
          },
          tableLoading:false
        });
      }
      this.getPageAgencies(this.state.condition, 1, 20);
    });

  }

  componentDidMount(){
    this.getPageAgencies(this.state.condition, 1, 20);

  }


  changeSuperAgency(userId){
    this.getPageAgencies(this.state.condition, this.state.currentPage, 20);
  }

  handlePageChange(page){

    this.getPageAgencies(this.state.condition, page, this.state.pageSize);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.CurrentDealAgency._id) {
      let superAgencyId = nextProps.CurrentDealAgency._id;
      $('.agency-search-title h3').html('所选用户所有下级关系');
      this.getPageAgencies({superAgencyId}, this.state.currentPage, this.state.pageSize);

    }
    if (nextProps.AgencyChange.agencyId !== "") {

      $('.agency-search-title h3').html('查看您选择用户的下级关系');

      this.getPageAgencies({superAgencyId:nextProps.AgencyChange.agencyId }, this.state.currentPage, this.state.pageSize);

    }

  }

  getPageAgencies(condition, page, pageSize){
    let self = this;
    const {dispatch,AgencyChange} = this.props;
    this.setState({
      currentPage: page,
      tableLoading:true,
      condition,
    });
    getMeteorAgenciesLimit(condition, page, pageSize, (err,rlt)=>{
      if (!err) {

        this.setState({
          agencies: rlt,
          tableLoading:false
        });
        dispatch(refreshClear());
        dispatch(clearAgencyId());

      }else{
        console.log(err);
      }
    });
  }

  render() {


      const headerMenuStyle ={
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'space-around',
        borderStyle: 'solid',
        padding: '15px',
        borderWidth: 'thin'
      };


    return (

      <div>
        <div style={headerMenuStyle}>
          <Input.Search
               placeholder="用户名｜电话｜昵称"
               style={{ width: '75%' }}
               onInput={input => this.handleSearchInput(input.target.value) }
               onSearch={val => this.handleSearchInput(val) }
              />
        </div>
        <div className="agency-search-title"><h3 style={{textAlign: "center"}}>最新成交关系</h3></div>
        <Spin tip={this.state.loadingTip} spinning={this.state.tableLoading}>
          <Table dataSource={this.state.agencies} rowKey='_id'
          pagination={{defaultPageSize: 20, total: this.state.totalCount,
             onChange: (page, pageSize)=> this.handlePageChange(page, pageSize),
             showQuickJumper: true, current: this.state.currentPage
           }}
            columns={AgencyColumns} />
        </Spin>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
      CurrentDealAgency: state.CurrentDealAgency,
      AgencyChange: state.AgencyChange,
   };
}

export default connect(mapStateToProps)(AgenciesRelations);

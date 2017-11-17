import React from "react";
import { connect } from 'react-redux';

import {getUserByAgencyId} from '/imports/ui/services/users.js'
import UserBasicViewPopover from '../../pages/tools/UserBasicViewPopover.jsx';
import {refreshClear} from '/imports/ui/actions/agency_change.js';


class UserByAgencyId extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mobile: '',
      username: '',
      loaded: true,
    }
  }

  getUserByAgencyId(agencyId){
    let self = this;
    return getUserByAgencyId(agencyId, (err,rlt)=>{
      if (!err) {
        self.props.dispatch(refreshClear());
        if (!rlt) {
          self.setState({
            username: "没有找到",
            mobile: '',
            loaded: false,
          })
        }
        if (rlt.profile) {
          if (rlt.profile.mobile) {
            self.setState({
              username: rlt.username,
              mobile: rlt.profile.mobile,
              loaded: false,
            })
          }else{
            self.setState({
              username: rlt.username,
              mobile: "用户暂无手机号",
              loaded: false,
            })
          }
        }else{
          self.setState({
            username: rlt.username,
            mobile: "用户暂无手机号",
            loaded: false,
          })
        }
      }
    });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.AgencyChange.agencyId) {
      this.getUserByAgencyId(nextProps.AgencyChange.agencyId);
    }
  }

  componentDidMount(){
    if (this.props.agencyId) {
      this.getUserByAgencyId(this.props.agencyId);
    }else{
      console.log("shall be await")
    }
  }


  componentWillUnmount(){
    this.setState({
      loaded: true,
    });
  }
  render(){

    if (this.state.loaded) {
      return (<div>用户信息加载中</div>);
    }else{
      return (
        <div ><UserBasicViewPopover username={this.state.username}/><br/>&nbsp;|&nbsp;{this.state.mobile}</div>
      )
    }

  }
}

function mapStateToProps(state) {
  return {
      CurrentDealAgency: state.CurrentDealAgency,
      AgencyChange: state.AgencyChange,
   };
}

export default connect(mapStateToProps)(UserByAgencyId);

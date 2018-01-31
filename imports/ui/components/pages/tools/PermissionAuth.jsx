//用来判断系统权限的组件
import React from 'react'
import {connect} from 'react-redux'
import { go,push, replace, goBack } from 'react-router-redux';
import { getCurrentRoles } from '/imports/ui/actions/roles.js';


class PermissionAuth extends React.Component{
  state = {
    isSuperAdmin: '',
  };


  componentDidMount(){
    let self = this
    const { dispatch } = this.props;
    let userId = Meteor.userId()
    Meteor.call('roleNames.find_by_user_id',userId, function(err,rlt){
      dispatch(getCurrentRoles(rlt));
      if(rlt.indexOf('superAdmin') == -1){
        console.log("不是超级管理员")
        dispatch(push('/permission_denied'))
        self.setState({
          isSuperAdmin: false,
        })
      }else{
        console.log("超级管理员")
        self.setState({
          isSuperAdmin: true,
        })
      }
    })
  }

  render(){
    const { currentRoles } = this.props;
    if (!this.state.isSuperAdmin) {
      return null
    }
    return this.props.children
  }
}


function mapStateToProps(state) {
  return {
    currentRoles:state.RolesList.currentRoles,
  }
}

export default connect(mapStateToProps)(PermissionAuth)
//用来判断系统权限的组件
import React from 'react'
import {connect} from 'react-redux'
import { getCurrentRoles } from '/imports/ui/actions/roles.js';


class CheckRoles extends React.Component{
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
      console.log('普通用户')
      console.log(this.props)
      return React.cloneElement(this.props.commonUser, this.props.commonUser.props)
    }
    return React.cloneElement(this.props.superAdmin, this.props.superAdmin.props)
  
  }
}


function mapStateToProps(state) {
  return {
    currentRoles:state.RolesList.currentRoles,
  }
}

export default connect(mapStateToProps)(CheckRoles)
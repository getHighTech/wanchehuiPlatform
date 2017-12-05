import React from "react";

import {getUserById} from '/imports/ui/services/users.js'
import UserBasicViewPopover from '../../pages/tools/UserBasicViewPopover.jsx';

class UserById extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mobile: '',
      username: '',
      loaded: true,
    }
  }

  componentDidMount(){
    let self  = this;
    if (this.props.userId) {
      return getUserById(this.props.userId, (err,rlt)=>{
        if (!err) {
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
        <div><UserBasicViewPopover userId={this.props.userId} username={this.state.username}/><br/>&nbsp;|&nbsp;{this.state.mobile}</div>
      )
    }

  }
}

export default UserById;

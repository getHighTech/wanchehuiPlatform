import React from "react";
import { connect } from 'react-redux';

import {getUserByAgencyId} from '/imports/ui/services/users.js'
import UserBasicViewPopover from '../../pages/tools/UserBasicViewPopover.jsx';

import {getOneUser} from '/imports/ui/actions/current_deal_user.js';


import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

const actionStyle = {
   fontSize: 16, color: '#08c'
};

class UserOreas extends React.Component {
  constructor(props){
    super(props);

  }


  render(){
    const {dispatch, CurrentDealUser} = this.props;

    return (
      <span>
        <Tooltip placement="topLeft" title="查看详情" arrowPointAtCenter>
          <Button className="on-dev-unfinished" shape="circle" icon="eye"  style={actionStyle} />
        </Tooltip>
        <span className="ant-divider" />
        <Tooltip placement="topLeft" title="封号" arrowPointAtCenter>
          <Button  className="on-dev-unfinished" shape="circle" icon="lock"  style={actionStyle} />
        </Tooltip>
        <span className="ant-divider" />
        <Tooltip placement="topLeft" title="重置密码" arrowPointAtCenter>
          <Button  className="on-dev-unfinished" shape="circle" icon="key"  style={actionStyle} />
        </Tooltip>
        <span className="ant-divider" />
        <Tooltip placement="topLeft" title="删除用户" arrowPointAtCenter>
          <Button onClick={()=> dispatch(getOneUser(this.props.userId, "remove"))}  shape="circle" icon="minus"  style={actionStyle} />
        </Tooltip>
      </span>
    )

  }
}

function mapStateToProps(state) {
  return {

      CurrentDealUser: state.CurrentDealUser,
   };
}

export default connect(mapStateToProps)(UserOreas);

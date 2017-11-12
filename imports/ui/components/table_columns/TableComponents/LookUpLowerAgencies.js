import React from "react";
import { connect } from 'react-redux';

import {getUserByAgencyId} from '/imports/ui/services/users.js'
import UserBasicViewPopover from '../../pages/tools/UserBasicViewPopover.jsx';

import {getAgencyId} from '/imports/ui/actions/current_deal_agency.js';


import Button from 'antd/lib/button';
import "antd/lib/button/style";
import Icon from 'antd/lib/icon';
import "antd/lib/icon/style";
import Tooltip from 'antd/lib/tooltip';
import "antd/lib/tooltip/style";

const actionStyle = {
   fontSize: 16, color: '#08c'
};

class LookUpLowerAgencies extends React.Component {
  constructor(props){
    super(props);

  }


  render(){
    const {dispatch, CurrentDealAgency} = this.props;

    return (
      <span>
        <Tooltip placement="topLeft" title="查看下级代理" arrowPointAtCenter>
          <Button onClick={()=>dispatch(getAgencyId(this.props.agencyId))} shape="circle" icon="eye" style={actionStyle} />
        </Tooltip>
        </span>
    )

  }
}

function mapStateToProps(state) {
  return {
      CurrentDealAgency: state.CurrentDealAgency,
   };
}

export default connect(mapStateToProps)(LookUpLowerAgencies);

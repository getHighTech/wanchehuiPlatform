import React from "react";
import { connect } from 'react-redux';

import UserFinderModal from '../../pages/tools/UserFinderModal.jsx';
import UserByAgencyId from './UserByAgencyId'

class AgencyChange extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      agencyId: ""
    }

  }
  changeSuperAgency(agencyId){
    this.setState({
      agencyId
    })
  }




  render(){
    let self = this;
    const {dispatch, AgencyChange, agencyId} = self.props;
    let userAgency = function(){
      if (self.state.agencyId !=="") {
        console.log(self.state.agencyId)
        return (
          <UserByAgencyId  agencyId={self.state.agencyId} />
        )
      }
      return (
        <UserByAgencyId agencyId={agencyId} />

      )
    }
    return (
      <div>
      {userAgency()}
          <UserFinderModal changeSuperAgency={(agencyId)=>this.changeSuperAgency(agencyId)}  extraBackData={this.props.extraBackData} text="选择并更改其上级" />
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {

      AgencyChange: state.AgencyChange,
   };
}

export default connect(mapStateToProps)(AgencyChange);

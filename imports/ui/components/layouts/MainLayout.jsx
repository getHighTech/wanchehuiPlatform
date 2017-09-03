'use strict';


import React from 'react';

import { connect } from 'react-redux';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {






    return (

      <div >

        <div className="ant-layout-main">

          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div style={{ height: "auto" }}>
                {this.props.children}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
   };
}

export default connect(mapStateToProps)(MainLayout);

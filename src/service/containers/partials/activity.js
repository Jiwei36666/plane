//
// Last.Backend LLC CONFIDENTIAL
// __________________
//
// [2014] - [2017] Last.Backend LLC
// All Rights Reserved.
//
// NOTICE:  All information contained herein is, and remains
// the property of Last.Backend LLC and its suppliers,
// if any.  The intellectual and technical concepts contained
// herein are proprietary to Last.Backend LLC
// and its suppliers and may be covered by Russian Federation and Foreign Patents,
// patents in process, and are protected by trade secret or copyright law.
// Dissemination of this information or reproduction of this material
// is strictly forbidden unless prior written permission is obtained
// from Last.Backend LLC.
//

import React from 'react';
import {connect} from 'react-redux';

import {ActivityList} from '../../../activity/components'


const ServiceActivityContainer = (props) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="service-overview-block">
          <ActivityList activity={props.activity}/>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const activity = state.activity;
  return ({
    activity: activity || []
  });
};

export default connect(mapStateToProps)(ServiceActivityContainer);

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

import { App } from '../../api';
import {browserHistory} from 'react-router'
import {
  APP_UPDATE_REQUEST,
  APP_UPDATE_SUCCESS,
  APP_UPDATE_FAILURE
} from '../../constants';

const RequestAction = {
  type: APP_UPDATE_REQUEST
};

const SuccessAction = (payload) => ({
  type: APP_UPDATE_SUCCESS,
  payload
});

const FailureAction = (payload) => ({
  type: APP_UPDATE_FAILURE,
  payload
});

export default (currentName, name, description) => (dispatch) => {

  dispatch(RequestAction);

  return new Promise((resolve, reject) => {
    App.Update(currentName, name, description)
      .then(response => {
        dispatch(SuccessAction(response));
        browserHistory.push(`/ns/${response.meta.name}/settings`);
        resolve(response);
      })
      .catch(error => {
        dispatch(FailureAction(error));
        reject(error);
      });
  });
};
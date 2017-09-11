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

import {Build} from '../../api';
import { browserHistory } from 'react-router'

import {
  BUILD_LIST_FETCH_REQUEST,
  BUILD_LIST_FETCH_SUCCESS,
  BUILD_LIST_FETCH_FAILURE
} from '../../constants';

const RequestAction = {
  type: BUILD_LIST_FETCH_REQUEST
};

const SuccessAction = (payload) => ({
  type: BUILD_LIST_FETCH_SUCCESS,
  payload
});

const FailureAction = (payload) => ({
  type: BUILD_LIST_FETCH_FAILURE,
  payload
});

export default (repo, id) => (dispatch) => {

  dispatch(RequestAction);

  return new Promise((resolve, reject) => {
    return Build.List(repo, id)
      .then(response => {
        dispatch(SuccessAction(response));
        browserHistory.push("/");
        return null;
      })
      .catch(error => {
        dispatch(FailureAction({error}));
        reject(error)
      })
  })
};
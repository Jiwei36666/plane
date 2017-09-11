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

import { Repo } from "../../api";
import {
  REPO_CREATE_FAILURE,
  REPO_CREATE_REQUEST,
  REPO_CREATE_SUCCESS
} from "../../constants";

const RequestAction = {
  type: REPO_CREATE_REQUEST
};

const SuccessAction = (payload) => ({
  type: REPO_CREATE_SUCCESS,
  payload
});

const FailureAction = (payload) => ({
  type: REPO_CREATE_FAILURE,
  payload
});

export default (data) => (dispatch) => {

  dispatch(RequestAction);

  return new Promise((resolve, reject) => {
    Repo.Create(data)
      .then(response => {
        dispatch(SuccessAction(response));
        resolve(response);
      })
      .catch(error => {
        dispatch(FailureAction({error}));
        reject(error);
      });
  });
};
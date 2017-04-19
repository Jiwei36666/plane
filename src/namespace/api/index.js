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

import {request} from "../../utils";

const api_host = process.env.REACT_APP_API_HOST;

export function create(name, desc) {
  let uri = [api_host, "namespace"].join("/");
  let body = {name: name, description: desc};
  return request("POST", uri, body, true);
}

export function get(id) {
  let uri = [api_host, "namespace", id].join("/");
  return request("GET", uri, null, true);
}

export function list() {
  let uri = [api_host, "namespace"].join("/");
  return request("GET", uri, null, true);
}

export function update(id, name, desc) {
  let uri = [api_host, "namespace", id].join("/");
  let body = {name: name, description: desc};
  return request("PUT", uri, body, true);
}

export function remove(id) {
  let uri = [api_host, "namespace", id].join("/");
  return request("DELETE", uri, null, true);
}
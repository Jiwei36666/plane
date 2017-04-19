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
//Page
import ServiceInfoPage from "./pages/info";
// Partial
import ServiceOverviewContainer from "./partials/overview";
import ServiceBuildsContainer from "./partials/builds";
import ServiceDeployContainer from "./partials/deploy";
import ServiceMetricsContainer from "./partials/metrics";
import ServiceLogsContainer from "./partials/logs";
import ServiceActivityContainer from "./partials/activity";
import ServiceSettingsContainer from "./partials/settings";
//Elements
import ServiceCardList from "./elements/list";
import PodDetailInfo from "./elements/pod/detail";

export {
  ServiceInfoPage,
  ServiceOverviewContainer, ServiceBuildsContainer, ServiceDeployContainer,
  ServiceLogsContainer, ServiceMetricsContainer, ServiceActivityContainer, ServiceSettingsContainer,
  ServiceCardList,
  PodDetailInfo
}
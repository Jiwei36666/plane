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
import React from "react";
import {connect} from "react-redux";

import RaisedButton from "material-ui/RaisedButton";
import {Link} from "react-router";

import deployActions from "./../../actions";
import {DeployHeader} from "../../components";
import {DeployDockerContainer, DeployGitContainer} from "../index";

const initData = {
  name: "",
  template: "",
  image: "",
  url: "",
  spec: {
    memory: 128
  }
};

class DeployCreatePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'git',
      data: initData,
    };
  }

  data = Object.assign({}, initData);

  tabChangeHandler = (e, value) => {
    e.stopPropagation();
    this.data = Object.assign({}, initData);
    this.setState({
      tab: value,
    });
  };

  setName = (name) => {
    this.data.name = name;
    this.setState({data: this.data})
  };

  setMemory = (memory) => {
    this.data.spec.memory = memory;
    this.setState({data: {spec: this.data}})
  };

  setResource = (resource) => {
    this.data.resource = resource;
    this.setState({data: this.data})
  };

  setTemplate = (template, version) => {
    this.data.template = template + ":" + (version || "latest");
    this.setState({data: this.data})
  };

  setImage = (owner, image, version) => {
    this.data.image = (owner || "library") + "/" + image + ":" + (version || "latest");
    this.setState({data: this.data})
  };

  setUrl = (url, branch) => {
    this.data.url = (branch === "master") ? url : [url, branch].join("#");
    this.setState({data: this.data})
  };

  onClickToDeploy = () => {
    if (this.checkDisableDeployHandler()) return;
    this.props.dispatch(deployActions.deploy.DeployActionCreators(this.props.namespace, this.data))
  };

  checkDisableDeployHandler() {
    switch (this.state.tab) {
      case "template":
        return !this.data.template;
      case "git":
        return !this.data.url;
      case "docker":
        return !this.data.image;
      default:
        return true;
    }
  }

  render() {
    const {namespace} = this.props;
    return (
      <div>
        <DeployHeader setName={this.setName} setMemory={this.setMemory}
                      setResource={this.setResource} {...this.props} />

        <container className="container-info">
          <div className="container">
            <div className="row">

              <div className="col-xs-12 text-center">
                {/*<RaisedButton style={{margin: "0 10px"}} buttonStyle={{width: "160px", height: "55px"}}*/}
                {/*onClick={e => this.tabChangeHandler(e, "template")}*/}
                {/*primary={this.state.tab === "template"}*/}
                {/*label="TEMPLATES"/>*/}
                {/*<RaisedButton style={{margin: "0 10px"}} buttonStyle={{width: "160px", height: "55px"}}*/}
                {/*onClick={e => this.tabChangeHandler(e, "push")} primary={this.state.tab === "push"}*/}
                {/*label="GIT PUSH"/>*/}
                <RaisedButton style={{margin: "0 10px"}} buttonStyle={{width: "160px", height: "55px"}}
                              onClick={e => this.tabChangeHandler(e, "git")} primary={this.state.tab === "git"}
                              label="GIT REPOSITORIES"/>
                <RaisedButton style={{margin: "0 10px"}} buttonStyle={{width: "160px", height: "55px"}}
                              onClick={e => this.tabChangeHandler(e, "docker")} primary={this.state.tab === "docker"}
                              label="DOCKER HUB"/>
              </div>
            </div>

            <br/>

            <div className="row">
              <div className="col-xs-12 text-center">
                <div className="container-fluid">
                  {/*{*/}
                  {/*(this.state.tab === "template")*/}
                  {/*? <DeployTemplateContainer setTemplate={this.setTemplate} {...this.props}/>*/}
                  {/*: ""*/}
                  {/*}*/}

                  {/*{*/}
                  {/*(this.state.tab === "push")*/}
                  {/*? <DeployGitPushContainer {...this.props}/>*/}
                  {/*: ""*/}
                  {/*}*/}

                  {
                    (this.state.tab === "git")
                      ? <DeployGitContainer setUrl={this.setUrl} {...this.props}/>
                      : ""
                  }

                  {
                    (this.state.tab === "docker")
                      ? <DeployDockerContainer setImage={this.setImage} {...this.props}/>
                      : ""
                  }
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 text-center">
                <div className="settings-block-item text-center">
                  {
                    (this.state.tab !== "push")
                      ? (
                      <div>
                        <RaisedButton label="Deploy" primary={true} style={{margin: "0 10px"}}
                                      disabled={this.checkDisableDeployHandler()}
                                      onClick={this.onClickToDeploy}/>

                        <RaisedButton label="Cancel" style={{margin: "0 10px"}}
                                      containerElement={<Link to={`/ns/${namespace}`}/>}/>
                      </div>
                    )
                      : (
                      <RaisedButton label="Back" style={{margin: "0 10px"}}
                                    containerElement={<Link to={`/ns/${namespace}`}/>}/>
                    )
                  }

                </div>
              </div>
            </div>

          </div>
        </container>
      </div>
    )
  }
}

DeployCreatePage.propTypes = {};

const mapStateToProps = (state, props) => {
  return ({
    namespace: props.params.namespace
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeployCreatePage);

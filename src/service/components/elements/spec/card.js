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
// Dissemination of information or reproduction of material
// is strictly forbidden unless prior written permission is obtained
// from Last.Backend LLC.
//

import React from "react";

import Paper from "material-ui/Paper";
import Timestamp from "react-timestamp";

import {Table, TableBody, TableRow, TableRowColumn} from "material-ui/Table";
import {Card, CardHeader, CardText} from "material-ui/Card";
import Chip from "material-ui/Chip";

import ServiceMemoryChart from "../../charts/memory";
import {getStateColor} from "./../../../../utils";


const SpecCard = (props) => {
  const {spec, replicas} = props;

  function resizeHandler(e, val) {
    e.stopPropagation();
    props.changeMemoryHandler(spec, val);
  }

  function selectHandler(e, val) {
    e.stopPropagation();
    props.selectHandler(val);
  }

  return (
    <Paper className="card">
      <Card>
        <CardHeader title={spec.image}>
          <span onClick={e => selectHandler(e, spec)} className=" cursor-pointer pull-right">settings</span>
          <br/>
        </CardHeader>
        <CardText>
          <div className="row">

            <div className="col-md-3 col-xs-12" style={{padding: "0 10px"}}>
              <ServiceMemoryChart up={resizeHandler} down={resizeHandler}
                                  replicas={replicas}
                                  value={spec.memory}/>
            </div>


            <div className="col-xs-9 col-xs-12">
              <div className="row" style={{padding: "5px 0"}}>
                <div className="col-xs-4">
                  <i className="fa fa-circle" style={{color: "#D3D3D3"}} aria-hidden="true"/> Memory:
                </div>
                <div className="col-xs-8" style={{textAlign: "left"}}>
                  {props.replicas * spec.memory} MB
                </div>
              </div>
              <div className="row" style={{padding: "5px 0"}}>
                <div className="col-xs-4">
                  <i className="fa fa-circle" style={{color: "#D3D3D3"}} aria-hidden="true"/> Build:
                </div>
                <div className="col-xs-8" style={{textAlign: "left"}}>
                  -
                </div>
              </div>
              <div className="row" style={{padding: "5px 0"}}>
                <div className="col-xs-4">
                  <i className="fa fa-circle" style={{color: "#D3D3D3"}} aria-hidden="true"/> Ports:
                </div>
                <div className="col-xs-8" style={{textAlign: "left"}}>
                  {
                    (!!spec.ports && !!Object.keys(spec.ports).length)
                      ? Object.keys(spec.ports).map((key) => {
                      return <Chip key={key}
                                   style={{float: "left", marginRight: "5px"}}>{spec.ports[key].external + "/" + spec.ports[key].protocol}</Chip>
                    })
                      : "-"
                  }
                </div>
              </div>
              <div className="row" style={{padding: "5px 0"}}>
                <div className="col-xs-4">
                  <i className="fa fa-circle" style={{color: "#D3D3D3"}} aria-hidden="true"/> Last Updated:
                </div>
                <div className="col-xs-8" style={{textAlign: "left"}}>
                  <Timestamp time={new Date(spec.meta.created || "")}/>
                </div>
              </div>
            </div>
          </div>

          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              {
                spec.containers.map((container, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn className="text-left">
                        <i className="fa fa-circle" style={{color: getStateColor(container.state)}}
                           aria-hidden="true"/>
                        <span> {container.id.substring(0, 12)}</span>
                      </TableRowColumn>
                      <TableRowColumn className="text-center"
                                      style={{width: "120px", color: getStateColor(container.state)}}>
                        {container.state}
                      </TableRowColumn>
                      <TableRowColumn className="text-right" style={{width: "50px"}}>
                        <i className="fa fa-bars" aria-hidden="true"/>
                      </TableRowColumn>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>

        </CardText>
      </Card>
    </Paper>
  )
};

SpecCard.propTypes = {
  spec: React.PropTypes.object.isRequired,
  replicas: React.PropTypes.number.isRequired,
  changeMemoryHandler: React.PropTypes.func.isRequired,
  selectHandler: React.PropTypes.func.isRequired
};

export default SpecCard;
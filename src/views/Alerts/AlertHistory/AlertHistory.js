import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string'
import Widgets from '../../Widgets/Widgets'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {API_URL} from '../../../supports/api-url/apiurl'
import {  Card, CardBody, CardHeader, Col, Label, Row, Table } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

export class AlertHistory extends Component {

  state= { 
    alertHistoryList: [],
    selectedAlertHistoryId: 0,
    alertDetailList :[],
    alertWarningList:[],
    alertCriticalList:[]
    
 

}
componentDidMount() {
  this.getAlertHistoryList();
  this.getAlertDetailHistoryList();
  this.getlistWarning();
  this.getlistCritical();


  }

  getAlertDetailHistoryList = () => {
    console.log(this.props.location.search)
      var params = queryString.parse(this.props.location.search)
      var alertID = params.alert_id
      axios.get(API_URL + `/alert/getlisthistory/${alertID}`)
      .then((res) => {
      console.log(res.data)
      this.setState({ 
        alertDetailList: res.data,
      })
      }).catch((err) => {
      console.log (err)
      })
    }  

getAlertHistoryList = () => {
  console.log(this.props.location.search)
    var params = queryString.parse(this.props.location.search)
    var alertId = params.alert_id
    axios.get(API_URL + `/alert/getlisthistoryalert/${alertId}`)
    .then((res) => {
    console.log(res.data)
    this.setState({ 
      alertHistoryList: res.data,
    })
    }).catch((err) => {
    console.log (err)
    })
  } 
  
  
  getlistWarning= () => {
    axios.get(API_URL + '/alert/getlistwarning')
    .then((res) => {
      console.log(res.data)
      this.setState({ 
        alertWarningList: res.data})
      }).catch((err) => {
      console.log (err)
      })
    }  
  
  
    getlistCritical= () => {
      axios.get(API_URL + '/alert/getlistCritical')
      .then((res) => {
        console.log(res.data)
        this.setState({ 
          alertCriticalList: res.data})
        }).catch((err) => {
        console.log (err)
        })
      }   

  renderAlertHistory = () => {
    
      var listJSX = this.state.alertHistoryList.map((item) => {
        return (
          <tr key={item.id}  > 
            <td>{item.alerttime}</td>
            <td>{item.resolvedtime}</td>       
              <td>{item.actualValue}</td>
              <td>{item.alertID}</td>
              <td>{item.alertname}</td>
              <td>{item.sensorname}</td>
              <td>{item.status}</td>
          
          </tr>
        )
      })
  
    return listJSX;
  
    }
  

  renderDetailAlertList = () => {
      var listJSXAlertDetail = this.state.alertDetailList.map((item) => {
        return (
          <div key={item.id}> 
          <Row >
          <Col >
            <h4><strong>{item.alertname}</strong> </h4>
          </Col>  
          
          </Row>  
          <Row>
          <Col md="3">
            <p><strong>{item.alertID}</strong> </p>
          </Col>
          </Row>  
          <Row>
          <Col md="6"> 
            <Row>
            <Col md="6"> <Label >Time Raised </Label></Col>        
            <Col  md="6">
            <Label >: {item.alerttime} </Label> </Col>
            </Row>
          </Col>
          <Col md="6">  
            <Row>
            <Col md="6">
            <Label >Time Resolved  </Label></Col>
            <Col  md="6">
            <Label >: {item.resolvedtime} </Label>
            </Col>
            </Row>
          </Col>
          </Row>
          <Row>
          <Col md="6"> 
            <Row>
            <Col md="6"> <Label >Threshold  </Label></Col>        
            <Col  md="6">
            <Label >: {item.threshold} </Label> </Col>
            </Row>
          </Col>
          <Col md="6">  
            <Row>
            <Col md="6">
            <Label >Value</Label></Col>
            <Col  md="6">
            <Label >: {item.value} </Label>
            </Col>
            </Row>
          </Col>
          </Row>
          <Row>
          <Col md="6"> 
            <Row>
            <Col md="6"> <Label >Affected Sensor</Label></Col>        
            <Col  md="6">
            <Label >: {item.sensorname} </Label> </Col>
            </Row>
          </Col>
          <Col md="6">  
            <Row>
            <Col md="6">
            <Label >Actual Value</Label></Col>
            <Col  md="6">
            <Label >: {item.actualValue} </Label>
            </Col>
            </Row>
          </Col>
          </Row>

          </div>
        
        )
        
    })
    return listJSXAlertDetail;
  }
  
  onBtnDetailClick = (alertID) => {
    console.log(alertID)
    axios.get(API_URL + `/alert/getlisthistory/${alertID}`)
    .then((res) => {
      console.log(res)
      this.setState({
        alertDetailList : res.data})
        // this.getAlertList();
    }).catch(err => {
        console.log(err)
    })
  } 

  render() {
    return (
      <div>
       <Row>
       <Col xs="12" sm="6" lg="4">
          <Card className="text-white bg-danger lg">
            <CardBody className="media pb-1">
        <div className="float-right">       
        <i className="icon-fire"></i>
          </div>
          <div className="media-body">
          <h4 >{this.state.alertCriticalList.length}</h4>   
          <p className="text-muted text-uppercase font-weight-bold font-lg">Critical</p>
           </div> 
        </CardBody>       
        </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card className="text-white bg-warning">
            <CardBody className="media pb-1">
        <div className="media-left">       
        <i className="icon-bell"></i>
          </div>
          <div className="media-body">
          <h4 >{this.state.alertWarningList.length}</h4>   
          <p className="text-muted text-uppercase font-weight-bold font-lg">Warning</p>
           </div> 
        </CardBody>
        </Card>
        </Col>      
      </Row>
        <Row>
            <Col md="8">
            <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Alert Detail
                </CardHeader>
                <CardBody>
               {this.renderDetailAlertList()} 
               <br></br>
                </CardBody>
                </Card>
            </Col>
            </Row>
      <Row>
          <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Alert List
                </CardHeader>
                <CardBody>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>
                      <th>Alert Time</th>
                      <th>Resolved Time</th>
                      <th>Actual Value</th>
                      <th>Alert ID</th>
                      <th>Alert Name</th>
                      <th>Sensor Name</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderAlertHistory()}
                    </tbody>
                  </Table>           
                 </CardBody>
              </Card>
              </Col>
              </Row>
              </div>
    )
  }
}

export default AlertHistory





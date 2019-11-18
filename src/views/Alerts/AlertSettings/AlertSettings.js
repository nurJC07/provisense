import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {API_URL} from '../../../supports/api-url/apiurl'
import { Badge, Card, CardBody, CardHeader, Col, Button, FormGroup, FormText, Form, Input,Label, Modal, ModalBody, ModalFooter, ModalHeader,Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

export class AlertSettings extends Component {

  
    state= { 
      alertList: [],
      selectedAlertId: 0, 
      parameterList: [],
      sensorList: [],
      severityList:[],
      isActive: true,
      isOpen: false,
      success: false,
      alertDetailList: []
      
  
  }
   
      componentDidMount() {
        this.getAlertList();
        this.getParameterList();
        this.getSeverityList();
        this.getSensorList()
    
        }
     
      getAlertList = () => {
          axios.get(API_URL + '/alert/getlistalert')
          .then((res) => {
          console.log(res.data)
          this.setState({ 
            alertList: res.data})
          }).catch((err) => {
          console.log (err)
          })
        }      

      getParameterList = () => {
        axios.get(API_URL + '/alert/getlistparameter')
        .then((res) => {
        console.log(res.data)
        this.setState({ 
            parameterList: res.data, 
            listAllParameter: res.data})
        }).catch((err) => {
        console.log (err)
        })
        }

      getSensorList = () => {
        axios.get(API_URL + '/alert/getlistsensor')
        .then((res) => {
        console.log(res.data)
        this.setState({ sensorList: res.data})
        }).catch((err) => {
        console.log (err)
        })
        }

      getSeverityList = () => {
        axios.get(API_URL + '/alert/getlistseverity')
        .then((res) => {
        console.log(res.data)
        this.setState({ severityList: res.data})
        }).catch((err) => {
        console.log (err)
        })
        }
            
    
    onBtnAddClick = () => {       
       var data = {
        alertname       : this.refs.AddName.value,
        parametername   : this.refs.AddParameter.value,
        threshold       : this.refs.AddThreshold.value,
        value           : this.refs.AddValue.value,
        sensorname      : this.refs.AddSensor.value,
        severityname    : this.refs.AddSeverity.value,
        send            : this.refs.AddSend.value ,
        isActive        : this.refs.state

       }
        
       
        axios.post(API_URL + '/alert/addalert', data)
        .then((res) => {
            alert("Add Alert was Successfull")
            this.setState({ alertList: res.data })
            
        })
        .catch((err) =>{
            console.log(err)
        })
        }
       
    
    onBtnUpdateClick = (id) => {
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }
        var data = {
          alertname       : this.refs.EditName.value,
          parametername   : this.refs.EditParameter.value,
          threshold       : this.refs.EditThreshold.value,
          value           : this.refs.EditValue.value,
          sensorname      : this.refs.EditSensor.value,
          severityname    : this.refs.EditSeverity.value,
          send            : this.refs.EditSend.value ,
          isActive        : this.refs.EditisActive.value
  
         }

        axios.put(API_URL + '/alert/editalert/'+id, formData, headers)
        .then((res) => {
            alert("Edit Alert Success")
            this.setState({ alertList: res.data, 
            selectedAlertId: 0 })
        })
        .catch((err) =>{
            console.log(err)
        })
    }


    onBtnDeleteClick = (id) => {
        if(window.confirm('Are sure want to delete this item?')){
            axios.delete(API_URL + '/alert/deletealert/' + id)
            .then((res) => {
                this.getAlertList();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    renderAllParameter = () => {
      var listJSXAllParameter = this.state.parameterList.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.parametername}</option>
        )
    })
    
      return listJSXAllParameter;
  }

  renderAllSeverity = () => {
    var listJSXAllSeverity = this.state.severityList.map((item) => {
      return (
          <option key={item.id} value={item.id}>{item.severityname}</option>
      )
  })
  
    return listJSXAllSeverity;
}

    renderAllSensor = () => {
      var listJSXAllSensor = this.state.sensorList.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.sensorname}</option>
        )
    })

  return listJSXAllSensor;
}


    renderAlertList = () => {
        var listJSX = this.state.alertList.map((item) => {
            if(item.id !== this.state.selectedAlertId) {
                return (
                    <tr key={item.id} > 
            <td>{item.alertID} </td>      
                        <td>{item.alertname}</td>
                        <td>{item.parametername}</td>
                        <td>{item.threshold}</td>
                        <td>{item.value}</td>
                        <td>{item.sensorname}</td>
                        <td>{item.severityname}</td>
                        <td><AppSwitch className={'mx-1'} variant={'3d'} color={'success'} checked outline={item.isActive}/></td>                      
                        <td><input type="button" className="btn btn-primary" value="Edit" onClick={() => this.setState({ selectedCategoryId: item.id })} /></td>
                        <td><input type="button" className="btn btn-danger" value="Remove" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                    </tr>
                )
            }
            return (
                <tr key={item.id}>
                    <td>{item.alertID}</td>
                    <td><input type="text" ref="EditName" defaultValue={item.nama} /></td>
                    <td><input type="text" ref="EditValue" defaultValue={item.value} /></td>
                    <td><input type="text" ref="EditSensor" defaultValue={item.sensor} /></td>
                    <td><input type="text" ref="EditSeverity" defaultValue={item.severity} /></td>
                    <td><input type="text" ref="isActiveEdit" defaultValue={item.isActive} /></td>
                    
                    <td><input type="button" className="btn btn-primary" value="Save" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
                    <td><input type="button" className="btn btn-danger" value="Cancel" onClick={() => this.setState({selectedAlertId:0})} /></td>
                </tr>
            )
        })
        return listJSX;
    }
    render() {
        return (
            <div>
                <Row>
            <Col md="8">
            <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Alert Detail
                </CardHeader>
                <CardBody>
               <p>Ini isinya Alert Detail</p>
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
                      <th>Alert ID</th>
                      <th>Alert Name</th>
                      <th>Parameter</th>
                      <th>Threshold</th>
                      <th>Value</th>
                      <th>Sensor</th>
                      <th>Severity</th>
                      <th>isActive</th>
                      <th></th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderAlertList()}
                    </tbody>
                  </Table>
                  <nav>
                    <Pagination>
                    
                    <Button color="success" onClick={(e)=>{this.setState({isOpen:true})}} className="mr-1">Add New Aler</Button>
                <Modal isOpen={this.state.isOpen}  
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader  
                   toggle   = {(e) =>{this.setState({isOpen:true})}}
                   onClick  ={(e)=>{this.setState({isOpen:false})}}>Add New Alert</ModalHeader>
                  <ModalBody>
                    
                    <Form  className="form-horizontal">
                  <FormGroup row>                  
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Alert Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <input type="text" ref="AddName" name="text-input" placeholder="Please Enter Alert Name" />
                    </Col>
                  </FormGroup>               
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Parameter Type</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <select  ref="AddParameter" >
                      <option value="">Select Parameter</option>
                      {this.renderAllParameter()}
                      
                  </select>
                    </Col>
                  </FormGroup>  
                  <FormGroup row>
                    <Col md="3">
                      <Label>Threshold</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" ref="AddThreshold" name="inline-radios"  />
                        <Label className="form-check-label" check htmlFor="inline-radio1">Upper</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <input className="form-check-input" type="radio" ref="AddThreshold" name="inline-radios"  />
                        <Label className="form-check-label" check htmlFor="inline-radio2">Lower</Label>
                      </FormGroup>
                      
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Value</Label>
                    </Col>
                    <Col xs="12" md="4">
                      <input type="number" ref="AddValue"  name="text-input" placeholder="Please Enter Alert Name" /> 
                    </Col>
                    <Col md="3">
                    <FormText name="text-input"><i>Celcius</i></FormText>
                    </Col>
                  </FormGroup> 
                            
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Severity</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <select  ref="AddSeverity" >
                      <option value="">Select Severity</option>
                      {this.renderAllSeverity()}
                      
                  </select>
                      
                    </Col>
                  </FormGroup> 
                 
                  <FormGroup row>
                    <Col md="3">
                      <Label>Send To</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="checkbox" ref="AddSend" name="inline-checkbox1" value="option1" />
                        <Label className="form-check-label" check htmlFor="inline-checkbox1">Notification</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <input className="form-check-input" type="checkbox"ref="AddSend" name="inline-checkbox2" value="option2" />
                        <Label className="form-check-label" check htmlFor="inline-checkbox2">Email</Label>
                      </FormGroup>
                      
                    </Col>
                  </FormGroup>       
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Affected Sensor</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <select  ref="AddSensor" >
                      <option value="">Select Sensor</option>
                      {this.renderAllSensor()}
                      
                  </select>
                      
                    </Col>
                  </FormGroup> 
                </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.onBtnAddClick}>Create Alert</Button>{' '}
                    </ModalFooter>
                    </Modal>
                     
                    </Pagination>
                   
                  </nav>
                
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        )
    }
}

export default AlertSettings

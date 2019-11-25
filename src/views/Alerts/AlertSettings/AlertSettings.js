import React, { Component } from 'react';
import axios from 'axios';
import {API_URL} from '../../../supports/api-url/apiurl'
import { Card, CardBody, CardHeader, Col, Button, FormGroup, FormText, Form, Input,Label, Modal, ModalBody, ModalFooter, ModalHeader,Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
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
      alertDetailList: [],
      alertHistoryList: [],
      threshold :[],
      sendBy :[],

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
          console.log(res.data[0])
          this.setState({ 
            alertList: res.data,
            isActive:true
          })
          }).catch((err) => {
          console.log (err)
          })
        }      

      getParameterList = () => {
        axios.get(API_URL + '/alert/getlistparameter')
        .then((res) => {
        console.log(res.data.parametername)
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
        threshold       : this.state.threshold,
        limitValue      : this.refs.AddLimitValue.value,
        sensorname      : this.refs.AddSensor.value,
        severityname    : this.refs.AddSeverity.value,
        send            : this.state.sendBy,
        isActive        : this.state.isActive

       }
       
      axios.post(API_URL + '/alert/addalert', data)
      .then((res) => {
        alert("Add Alert was Successfull")
          this.getAlertList()                 
        })
        .catch((err) =>{
            console.log(err)
        })
        }
       
      onBtnUpdateClick = (id) => {
      alert(id)
        var data = {
          alertname       : this.refs.EditName.value,
          parametername   : this.refs.EditParameter.value,
          threshold       : this.refs.EditThreshold.value,
          limitValue      : this.refs.EditLimitValue.value,
          sensorname      : this.refs.EditSensor.value,
          severityname    : this.refs.EditSeverity.value,
          isActive        : this.refs.EditActive.value
         }

        axios.put(API_URL + '/alert/editalert/'+id, data)
        .then((res) => {
            alert("Edit Alert Success")
            this.setState({  
            selectedAlertId: 0,
        })
            this.getAlertList() 
        })
        .catch((err) =>{
            console.log(err)
        })
    }


    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure want to delete this item?')){
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
            <option key={item.id} value={item.parametername}>{item.parametername}</option>
        )
    })
        return listJSXAllParameter;
  }


  renderAllSeverity = () => {
    var listJSXAllSeverity = this.state.severityList.map((item) => {
      return (
          <option key={item.id} value={item.severityname}>{item.severityname}</option>
      )
  })
    return listJSXAllSeverity;
}

  renderAllSensor = () => {
    var listJSXAllSensor = this.state.sensorList.map((item) => {
      return (
          <option key={item.id} value={item.sensorname}>{item.sensorname}</option>
      )
  })
  return listJSXAllSensor;
}

onBtnHistoryList = (alertID) => {
  window.location = `/#/alert/history?alert_id=${alertID}`;
}

renderDetailAlertList = () => {
  var listJSXAlertDetail = this.state.alertDetailList.map((item) => {
      return (
        <div key={item.id}>
        <Row>
        <Col className="text-info md-3">
          <p><strong>{item.alertID}</strong> </p>
        </Col>
        </Row>  
        <Row>
        <Col >
          <p><strong>{item.alertname}</strong> </p>
        </Col>  
        </Row>  
        <Row>
        <Col md="6"> 
          <Row>
          <Col md="6"> <Label >Parameter  </Label></Col>        
          <Col  md="6">
          <Label >: {item.parametername} </Label> </Col>
          </Row>
        </Col>
        <Col md="6">  
          <Row>
          <Col md="6">
          <Label >Affected Sensor  </Label></Col>
          <Col  md="6">
          <Label >: {item.sensorname} </Label>
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
          <Label >: {item.limitValue} </Label>
          </Col>
          </Row>
        </Col>
        </Row>
        <Row>
        <Col md="6"> 
          <Row>
          <Col md="6"> <Label >Severity</Label></Col>        
          <Col  md="6">
          <Label >: {item.severityname} </Label> </Col>
          </Row>
        </Col>
        <Col md="6">  
          <Row>
          <Col md="6">
          <Label >Send to</Label></Col>
          <Col  md="6">
          <Label >: {item.send} </Label>
          </Col>
          </Row>
        </Col>
        </Row>
      <Button color="info" onClick={() => this.onBtnHistoryList(item.alertID)}>Check History</Button>{' '}
        </div>
      ) 
  })
  return listJSXAlertDetail;
}

onBtnDetailClick = (id) => {
  console.log(id)
  axios.get(API_URL + `/alert/alertdetail/${id}`)
  .then((res) => {
    console.log(res)
    this.setState({
      alertDetailList : res.data})
      // this.getAlertList();
  }).catch(err => {
      console.log(err)
  })
} 

    renderAlertList = () => {
        var listJSX = this.state.alertList.map((item) => {
            if(item.id !== this.state.selectedAlertId) {
                return (
                  <tr className="text-center" key={item.id} onClick={() => this.onBtnDetailClick(item.id)} > 
                    <td>{item.alertID}</td>     
                      <td>{item.alertname}</td>
                      <td >{item.parametername} </td>
                      <td>{item.threshold}</td>
                      <td>{item.limitValue}</td>
                      <td>{item.sensorname}</td>
                      <td>{item.severityname}</td>
                      <td><AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked /></td>                  
                      <td><i className="text-primay text-center icon-pencil icons font-3xl d-block" title="edit" onClick={() => this.setState({ selectedAlertId: item.id })}></i></td>
                      <td><i className="text-danger text-center icon-trash icons font-3xl d-block" title="delete" onClick={() => this.onBtnDeleteClick(item.id)}></i></td>
                  </tr>
                )
            }
            return (
                <tr key={item.id}>
                    <td>{item.alertID}</td>
                    <td><input type="text" ref="EditName" defaultValue={item.alertname} /></td>
                    <td> <select  ref="EditParameter">
                      <option defaultValue="">{item.parametername}</option>{this.renderAllParameter()}  
                    </select></td>
                    <td><input type="text" ref="EditThreshold" defaultValue={item.threshold} /></td>
                    <td><input type="number" ref="EditLimitValue" defaultValue={item.limitValue} /></td>
                    <td> <select  ref="EditSensor">
                    <option defaultValue="">{item.sensorname}</option>{this.renderAllSensor()}
                    </select></td>
                    <td> <select  ref="EditSeverity">
                      <option defaultValue="">{item.severityname}</option>{this.renderAllSeverity()}  
                    </select></td>
                    <td><AppSwitch className={'mx-1'} variant={'pill'} color={'danger'}   onClick  ={(e)=>{this.setState({isActive:false})}}/></td> 
                    
                    <td></td>
                    <td><i className="text-success text-center icon-envelope icons font-3xl d-block" title="Save"  onClick={() => this.onBtnUpdateClick(item.id)}></i></td>
                    <td><i className="text-info text-center icon-action-undo icons font-3xl d-block" title="Cancel"  onClick={() => this.setState({selectedAlertId:0})}></i></td>
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
          {this.renderDetailAlertList()} 
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
            <tr className="text-center bg-dark">
              <th>Alert ID</th>
              <th>Alert Name</th>
              <th>Parameter</th>
              <th>Threshold</th>
              <th>Value</th>
              <th>Sensor</th>
              <th>Severity</th>
              <th>isActive</th>
              <th colSpan="2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.renderAlertList()}
            </tbody>
          </Table>
          <nav>
          <Pagination>          
          <Button color="success"  onClick={(e)=>{this.setState({isOpen:true})}} className="mr-1">Add New Alert</Button>
          <Modal isOpen={this.state.isOpen} className={'modal-success ' + this.props.className}>
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
        <option value="">Select Parameter</option> {this.renderAllParameter()}
        </select>
        </Col>
        </FormGroup>  
        <FormGroup row>
        <Col md="3">
          <Label>Threshold</Label>
        </Col>
        <Col md="9">
        <FormGroup check inline>
            <input className="form-check-input" type="radio" name="inline-radios" onClick={(e) => {this.setState({threshold:e.target.value})}} value="Upper"  />
            <Label className="form-check-label"  >Upper</Label>
        </FormGroup>
        <FormGroup check inline>
          <input className="form-check-input" type="radio" name="inline-radios" onClick={(e) => {this.setState({threshold:e.target.value})}}  value="Lower"  />
          <Label className="form-check-label"  >Lower</Label>
        </FormGroup>                      
        </Col>
        </FormGroup>
        <FormGroup row>
        <Col md="3">
          <Label htmlFor="text-input">Value</Label>
        </Col>
        <Col xs="12" md="4">
          <input type="number" ref="AddLimitValue"  name="text-input"  /> 
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
            <input className="form-check-input" type="checkbox"  name="checkbox1"  onClick={(e) => {this.setState({sendBy:e.target.value})}} value="Notification" />
            <Label className="form-check-label" check htmlFor="inline-checkbox1">Notification</Label>
          </FormGroup>
          <FormGroup check inline>
            <input className="form-check-input"  name="checkbox2"  type="checkbox" onClick={(e) => {this.setState({sendBy:e.target.value})}} value="Email"   />
            <Label className="form-check-label" check htmlFor="inline-checkbox">Email</Label>
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

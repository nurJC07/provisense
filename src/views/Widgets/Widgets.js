import React, { Component } from 'react';
import axios from 'axios';
import {API_URL} from '../../supports/api-url/apiurl'
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter,Col, Row } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  
  icon: 'fa fa-alert',
  warning: 'fa fa-alert',
  color: 'primary',
  variant: '0',

};

class Widget extends Component {

  state= { 
 
    alertWarningList:[],
    alertCriticalList:[]
    


}

componentDidMount() {
  this.getlistWarning();
  this.getlistCritical();


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


  render() {
    // const { className, cssModule, header, mainText, icon, color, footer, link, children, variant, ...attributes } = this.props;

    // // demo purposes only
    // const padding = (variant === '0' ? { card: 'p-3', icon: 'p-3', lead: 'mt-2' } : (variant === '1' ? {
    //   card: 'p-0', icon: 'p-4', lead: 'pt-3',
    // } : { card: 'p-0', icon: 'p-4 px-5', lead: 'pt-3' }));

    // const card = { style: 'clearfix', color: color, icon: icon, classes: '' };
    // card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

    // const lead = { style: 'h5 mb-0', color: color, classes: '' };
    // lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

    // const blockIcon = function (icon) {
    //   const classes = classNames(icon, 'bg-' + card.color, padding.icon, 'font-2xl mr-3 float-left');
    //   return (<i className={classes}></i>);
    // };

  
    return (
      <div >
      <Row>
      <Col lg="6" >
          <Card className="text-white bg-danger lg">
            <CardBody className="media pb-1">
        <div className="media-left">       
        <i className="icon-fire"></i>
          </div>
          <div className="media-body">
          <h4 >{this.state.alertCriticalList.length}</h4>   
          <p className="text-muted text-uppercase font-weight-bold font-lg">Critical</p>
           </div> 
        </CardBody>       
        </Card>
        </Col>
        <Col lg="6" >
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
      </div>
    );
  }
}

Widget.propTypes = propTypes;
Widget.defaultProps = defaultProps;

export default Widget;
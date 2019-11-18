import React, { Component, lazy, Suspense } from 'react';


class Dashboard extends Component {
 
 

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
       
          
      <h1>Ini Dashboard</h1>

       
          
       
      </div>
    );
  }
}


export default Dashboard;

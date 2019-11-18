import React from 'react';

const Alert = React.lazy(() => import('./views/Base/Breadcrumbs'))
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Alerts = React.lazy(() => import('./views/Alerts'));
const AlertHistory = React.lazy(() => import('./views/Alerts/AlertHistory'));
const AlertSettings = React.lazy(() => import('./views/Alerts/AlertSettings'))
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/alert', exact: true, name: 'Alert', component: Alerts },
  { path: '/alert/history', name: 'Alert History', component: AlertHistory },
  { path: '/alert/settings', name: 'Alert Settings', component: AlertSettings},
];

export default routes;

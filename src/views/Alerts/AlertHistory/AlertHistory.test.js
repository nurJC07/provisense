import React from 'react';
import ReactDOM from 'react-dom';
import AlertHistory from './AlertHistory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AlertHistory />, div);
  ReactDOM.unmountComponentAtNode(div);
});

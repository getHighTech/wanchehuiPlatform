// Import client startup through a single index entry point


import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import AppRoutes from './routes';

Meteor.startup(() => {
  render(<AppRoutes />, document.getElementById('render-target'));
});

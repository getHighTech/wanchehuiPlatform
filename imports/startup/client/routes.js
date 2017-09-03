import React, { PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
import configureStore from "/imports/ui/stores/mainStore";

import MainLayout from '/imports/ui/components/layouts/MainLayout';
import Login from '/imports/ui/components/pages/Login';
import Users from '/imports/ui/components/pages/Users';
import DashBoard from '/imports/ui/components/pages/DashBoard';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const Routes = ({ location }) =>
<Provider store={store}>
  <Router history={history}>
    <Route path="/" component={MainLayout} >
      <Route path="/users" component={Users}/>
      <IndexRoute component={DashBoard} />
    </Route>
    <Route path="/login" component={Login}/>
  </Router>
  </Provider>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;

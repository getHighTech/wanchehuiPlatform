import React from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';

import MainLayout from '/imports/ui/components/layouts/MainLayout';
import Login from '/imports/ui/components/pages/Login';
import LoginForgot from '/imports/ui/components/pages/LoginForgot';
import Users from '/imports/ui/components/pages/Users';
import Shops from '/imports/ui/components/pages/Shops';
import Orders from '/imports/ui/components/pages/Orders';
import Roles from '/imports/ui/components/pages/Roles';
import Settings from '/imports/ui/components/pages/Settings';
import DashBoard from '/imports/ui/components/pages/DashBoard';
import GiveCardToUsers from '/imports/ui/components/pages/GiveCardToUsers';
import NewMemberApply from '/imports/ui/components/pages/NewMemberApply';
import NewMemberApplyConfirm from '/imports/ui/components/pages/NewMemberApplyConfirm';
import AgenciesRelations from '/imports/ui/components/pages/AgenciesRelations';
import ComponentTest from '/imports/ui/components/pages/component_test';
import ShopItem from '/imports/ui/components/pages/ShopItem';
import configureStore from "/imports/ui/stores/mainStore";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


//将有表单操作的对象管理设置成动态路由
const DBTableContainer = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('/imports/ui/components/DBTable').default)
  }, 'DBTable');
};



const Routes = ({ location }) =>
<Provider store={store}>
  <Router history={history}>
    <Route path="/" component={MainLayout} >
      <Route path="/users" component={Users}/>
      <Route path="/shops" component={Shops}/>
      <Route path="/shops/shop_item" component={ShopItem}/>
      <Route path="option1" tableName="test" getComponent={DBTableContainer}/>
      <Route path="option2" tableName="testSms" getComponent={DBTableContainer}/>
      <Route path="option3" tableName="testAction" getComponent={DBTableContainer}/>
      <Route path="/orders" component={Orders}/>
      <Route path="/roles" component={Roles}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/give_card_to_users" component={GiveCardToUsers}/>
      <Route path="/agencies_relations" component={AgenciesRelations}/>
      <Route path="/component_test" component={ComponentTest}/>
      <IndexRoute component={DashBoard} />
    </Route>
    <Route path="/login" component={Login}/>
    <Route path="/login/forgot" component={LoginForgot}/>
    <Route path="/new_member/apply" component={NewMemberApply}/>
    <Route path="/new_member/apply/confirm" component={NewMemberApplyConfirm}/>
    <Route path="/*" component={Login}/>
  </Router>
  </Provider>;



export default Routes;

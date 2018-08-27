import React from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';

import MainLayout from '/imports/ui/components/layouts/MainLayout';
import Login from '/imports/ui/components/pages/Login';
import LoginForgot from '/imports/ui/components/pages/LoginForgot';
import Users from '/imports/ui/components/pages/Users';
import Shops from '/imports/ui/components/pages/Shops';
import SingleShop from '/imports/ui/components/pages/SingleShop';
import ShopDetails from '/imports/ui/components/pages/ShopDetails';
import Orders from '/imports/ui/components/pages/Orders';
import Withdrawals from '/imports/ui/components/pages/Withdrawals';
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
import PermissionAuth from "/imports/ui/components/pages/tools/PermissionAuth";
import NotFoundPage from '/imports/ui/components/pages/NotFoundPage';
import PermissonDenied from '/imports/ui/components/pages/PermissonDenied';
import CheckRoles from "/imports/ui/components/pages/tools/CheckRoles";
import ShopDashBoard from '/imports/ui/components/pages/shop_owner_components/dashboard';
import OrderDetails from '/imports/ui/components/pages/OrderDetails';
import ProductClass from '/imports/ui/components/pages/ProductClass';
import Cards from '../../ui/components/pages/shop_owner_components/cards';
import UsersForShop from '../../ui/components/pages/shop_owner_components/users';
import OrdersForShop from '../../ui/components/pages/shop_owner_components/orders';
import Vips from '../../ui/components/pages/shop_owner_components/vips';
import Svips from '../../ui/components/pages/shop_owner_components/svips';
import Cvips from '../../ui/components/pages/shop_owner_components/cvips';
import OrderStates from '/imports/ui/components/pages/OrderStates';
import withdrawalsForShop from '../../ui/components/pages/shop_owner_components/withdrawals';



const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);





const Routes = ({ location }) =>
<Provider store={store}>
  <Router history={history}  >
    <Route path="/" component={MainLayout} >
      <Route path="/not_found" component={NotFoundPage}/>
      <Route path="/permission_denied" component={PermissonDenied}/>
      {/* <IndexRoute component={DashBoard} /> */}
      {/* 以下一组路由不同的角色访问不同的组件 */}
      <Route component={CheckRoles}>
     
        <Route path="/orders" component={{superAdmin:Orders,commonUser:OrdersForShop}} />
        <Route path="/users" component={{ superAdmin: Users, commonUser: UsersForShop }} />
          <Route path="/withdrawals" component={{ superAdmin: Withdrawals, commonUser: withdrawalsForShop }} />
        <IndexRoute component={{superAdmin:DashBoard,commonUser:ShopDashBoard}} />
      </Route>
      {/* 以下一组路由为需要验证超级管理员之后才能访问 */}
      <Route component={PermissionAuth}>
        <Route path="/users" component={Users}/>
        {/* <Route path="/withdrawals" component={Withdrawals}/> */}
        <Route path="/roles" component={Roles}/>
        <Route path="/give_card_to_users" component={GiveCardToUsers}/>
        <Route path="/agencies_relations" component={AgenciesRelations}/>
        <Route path="/shops" component={ Shops} />
      </Route>
      <Route path="/shops/single_shop/shop_details/:_id" component={ShopDetails}/>
      <Route path="/orders/order_details/:_id" component={OrderDetails}/>
      <Route path="/shops/shop_item" component={ShopItem}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/component_test" component={ComponentTest}/>
      <Route path="/order_state" component={OrderStates}/>
      <Route path="/productclass" component={ProductClass}/>
      <Route path="/cards" component={Cards}/>
      <Route path="/vips" component={Vips} />
      <Route path="/svips" component={Svips} /> 
      <Route path="/cvips" component={Cvips} />
    </Route>
    <Route path="/login" component={Login}/>
    <Route path="/login/forgot" component={LoginForgot}/>
    <Route path="/new_member/apply" component={NewMemberApply}/>
    <Route path="/new_member/apply/confirm" component={NewMemberApplyConfirm}/>
    {/* <Route path="/*" component={Login}/> */}
    {/* <Route path="/*" component={NotFoundPage}/> */}

  </Router>
  </Provider>;


export default Routes;

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas/index'

import NewMemberApply from '/imports/ui/reducers/NewMemberApply'
import CurrentDealAgency from '/imports/ui/reducers/CurrentDealAgency.js'

// <<<<<<< HEAD
// import AgencyChange from '/imports/ui/reducers/AgencyChange.js'
// import {WithDraws, getWithDraw} from '/imports/ui/reducers/WithDraws.js'

import CurrentDealUser from '/imports/ui/reducers/CurrentDealUser.js'
import AgencyChange from '/imports/ui/reducers/AgencyChange.js'
import {WithDraws, getWithDraw} from '/imports/ui/reducers/WithDraws.js'
import ShopsList from '/imports/ui/reducers/ShopsList.js'
import RolesList from '/imports/ui/reducers/RolesList.js'
import ProductsList from '/imports/ui/reducers/ProductsList.js'


const rmiddleware = routerMiddleware(browserHistory)
const sagaMiddleware = createSagaMiddleware(mySaga)
export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(rmiddleware),
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  let store = createStore(
    combineReducers({
      routing: routerReducer,
      NewMemberApply,
      CurrentDealAgency,
      CurrentDealUser,
      AgencyChange,
      WithDraws,
      getWithDraw,
      ShopsList,
      ProductsList,
      RolesList
    }),
    initialState,
    enhancer
  );
  sagaMiddleware.run(mySaga);

  return store;
}

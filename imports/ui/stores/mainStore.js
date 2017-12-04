import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import NewMemberApply from '/imports/ui/reducers/NewMemberApply'
import CurrentDealAgency from '/imports/ui/reducers/CurrentDealAgency.js'
<<<<<<< HEAD
// <<<<<<< HEAD
// import AgencyChange from '/imports/ui/reducers/AgencyChange.js'
// import {WithDraws, getWithDraw} from '/imports/ui/reducers/WithDraws.js'
=======
import AgencyChange from '/imports/ui/reducers/AgencyChange.js'
import {WithDraws, getWithDraw} from '/imports/ui/reducers/WithDraws.js'
>>>>>>> 14dbb8a3b6943e39586b57a93e5a37da23b4fe6f
import ShopsList from '/imports/ui/reducers/ShopsList.js'

const rmiddleware = routerMiddleware(browserHistory)
export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(rmiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  return createStore(
    combineReducers({
      routing: routerReducer,
      NewMemberApply,
      CurrentDealAgency,
<<<<<<< HEAD
// <<<<<<< HEAD
//       AgencyChange,
//       WithDraws,
//       getWithDraw,
// =======
=======
      AgencyChange,
      WithDraws,
      getWithDraw,
>>>>>>> 14dbb8a3b6943e39586b57a93e5a37da23b4fe6f
      ShopsList,
    }),
    initialState,
    enhancer);
}

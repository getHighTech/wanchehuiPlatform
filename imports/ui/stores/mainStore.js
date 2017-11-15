import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import NewMemberApply from '/imports/ui/reducers/NewMemberApply'
import CurrentDealAgency from '/imports/ui/reducers/CurrentDealAgency.js'
<<<<<<< HEAD
import AgencyChange from '/imports/ui/reducers/AgencyChange.js'
import {WithDraws, getWithDraw} from '/imports/ui/reducers/WithDraws.js'
=======
import ShopsList from '/imports/ui/reducers/ShopsList.js'
>>>>>>> 2772809abb8612cbf4c6ca60711dc9e26b703f1d

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

      AgencyChange,
      WithDraws,
      getWithDraw,

=======
      ShopsList,
>>>>>>> 2772809abb8612cbf4c6ca60711dc9e26b703f1d
    }),
    initialState,
    enhancer);
}

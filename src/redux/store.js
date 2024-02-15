import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from 'redux-thunk';
import { bikesReducer } from './reducers/bikesReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsDenylist, actionsCreators and other options
});
const rootReducer = combineReducers({
    bikesReducer,
    alertsReducer,
    bookingsReducer
})
const store = createStore(
    rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    
  ),
);

export default store;

//import {thunk} instead of thunk
//use (thunk) instead of applyMiddleware([thunk])  
import {visibilityFilter, todos} from "./reducers/reducers";
import App from "./containers/App";
import { toggleSiderReducer, selectKeyReducer, fetchUserInfoReducer } from '../sider/reducers/reducers';
import { combineReducers } from 'redux'

const finalReducers = combineReducers({
  visibilityFilter,
  todos,
  toggleSiderReducer,
  selectKeyReducer,
  fetchUserInfoReducer
})


export {App, finalReducers}
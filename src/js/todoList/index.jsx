import {visibilityFilter, todos} from "./reducers/reducers";
import App from "./containers/App";
import { toggleSiderReducer, selectKeyReducer, fetchUserInfoReducer, modifyBreadcrumbReducer } from '../sider/reducers/reducers';
import { combineReducers } from 'redux'

const finalReducers = combineReducers({
  visibilityFilter,
  todos,
  toggleSiderReducer,
  selectKeyReducer,
  fetchUserInfoReducer,
  modifyBreadcrumbReducer
})


export {App, finalReducers}
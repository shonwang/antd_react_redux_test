import {
  fetchContactReducer,
  queryConditionChangeReducer,
  setVisibilityContactModalReducer,
  addContactReducer
} from "./reducers/reducers";
import App from "./containers/App";
import {
    toggleSiderReducer,
    selectKeyReducer,
    fetchUserInfoReducer,
    modifyBreadcrumbReducer
} from '../sider/reducers/reducers';
import { combineReducers } from 'redux'

const finalReducers = combineReducers({
  fetchContactReducer,
  queryConditionChangeReducer,
  setVisibilityContactModalReducer,
  addContactReducer,
  toggleSiderReducer,
  selectKeyReducer,
  fetchUserInfoReducer,
  modifyBreadcrumbReducer
})


export {App, finalReducers}
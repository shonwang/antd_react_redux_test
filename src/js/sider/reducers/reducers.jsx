import { TOGGLE_SIDER, 
         SELECT_KEY, 
         REQUEST_USER_INFO, 
         RECEIVE_USER_INFO_SUCCESS, 
         RECEIVE_USER_INFO_ERROR,
         MODIFY_BREADCRUMB } from '../actions/actions'

function toggleSiderReducer(state = {collapsed: false, mode: "inline"}, action) {
  switch (action.type) {
    case TOGGLE_SIDER:
      return Object.assign({}, state, {
            collapsed: !action.operation,
            mode: !action.operation ? 'vertical' : 'inline',
        })
    default:
      return state
  }
}

function selectKeyReducer(state = ['/'], action) {
  switch (action.type) {
    case SELECT_KEY:
      return state = action.keys
    default:
      return state
  }
}

function fetchUserInfoReducer(state = {isFetching: false, userInfo: {}, error: null}, action) {
  switch (action.type) {
    case REQUEST_USER_INFO:
      return state = Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER_INFO_SUCCESS:
      return state = Object.assign({}, state, {
        isFetching: false,
        userInfo: action.userInfo,
        error: null,
      })
    case RECEIVE_USER_INFO_ERROR:
      return state = Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        userInfo: {}
      })
    default:
      return state
  }
}

function modifyBreadcrumbReducer(state = ['报警通讯', '联系人管理'], action) {
  switch (action.type) {
    case MODIFY_BREADCRUMB:
      return state = action.breadcrumbArray
    default:
      return state
  }
}

export {toggleSiderReducer, selectKeyReducer, fetchUserInfoReducer, modifyBreadcrumbReducer}
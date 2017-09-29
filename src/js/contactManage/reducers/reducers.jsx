import {
  REQUEST_CONTACT,
  RECEIVE_CONTACT_SUCCESS,
  RECEIVE_CONTACT_ERROR,
  QUERY_CONDITION_CHANGE,
  SET_VISIBILITY_CONTACT_MODAL,
  REQUEST_ADD_CONTACT,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_ERROR,
  CLEAR_CONTACT_ERROR
} from '../actions/actions'

function addContactReducer(state = {
  isAdding: false,
  error: null
}, action) {
  switch (action.type) {
    case REQUEST_ADD_CONTACT:
      return state = Object.assign({}, state, {
        isAdding: true,
        error: null
      })
    case ADD_CONTACT_SUCCESS:
      return state = Object.assign({}, state, {
        isAdding: false,
        error: null
      })
    case ADD_CONTACT_ERROR:
      return state = Object.assign({}, state, {
        isAdding: false,
        error: action.error
      })
    case CLEAR_CONTACT_ERROR:
      return state = Object.assign({}, state, {
        isAdding: false,
        error: null
      })
    default:
      return state
  }
}

function fetchContactReducer(state = {
  isFetching: false,
  data: {},
  error: null
}, action) {
  switch (action.type) {
    case REQUEST_CONTACT:
      return state = Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_CONTACT_SUCCESS:
      return state = Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        error: null,
      })
    case RECEIVE_CONTACT_ERROR:
      return state = Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        data: {}
      })
    default:
      return state
  }
}

function queryConditionChangeReducer(state = {
  "domainName": null,
  "userId": null,
  "email": null,
  "companyName": null,
  "currentPage": 1,
  "pageSize": 10
}, action) {
  switch (action.type) {
    case QUERY_CONDITION_CHANGE:
      return state = Object.assign({}, state, action.values)
    default:
      return state
  }
}

function setVisibilityContactModalReducer(state = {
  "visible": false,
  "data": {},
}, action) {
  switch (action.type) {
    case SET_VISIBILITY_CONTACT_MODAL:
      return state = Object.assign({}, state, {
         visible: action.visible,
         data: action.data
      })
    default:
      return state
  }
}

export {
  fetchContactReducer,
  queryConditionChangeReducer,
  setVisibilityContactModalReducer,
  addContactReducer
}
import fetch from 'isomorphic-fetch'
/*
 * action 类型
 */
export const REQUEST_CONTACT = 'REQUEST_CONTACT';
export const RECEIVE_CONTACT_SUCCESS = 'RECEIVE_CONTACT_SUCCESS';
export const RECEIVE_CONTACT_ERROR = 'RECEIVE_CONTACT_ERROR';
export const QUERY_CONDITION_CHANGE = 'QUERY_CONDITION_CHANGE';
export const SET_VISIBILITY_CONTACT_MODAL = 'SET_VISIBILITY_CONTACT_MODAL';
export const REQUEST_ADD_CONTACT = 'REQUEST_ADD_CONTACT';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_ERROR = 'ADD_CONTACT_ERROR';
export const CLEAR_CONTACT_ERROR = 'CLEAR_CONTACT_ERROR';

/*
 * action 创建函数
 */

export function requstContact(args) {
  return { type: REQUEST_CONTACT, args}
}

export function receiveContactSuccess(args, json) {
  return {
    type: RECEIVE_CONTACT_SUCCESS,
    args,
    data: json,
    receivedAt: Date.now()
  }
}

export function receiveContactError(args, e) {
  return {
    type: RECEIVE_CONTACT_ERROR,
    args,
    error: e,
    receivedAt: Date.now()
  }
}

export function fetchContact(args) {
    return dispatch => {
        dispatch(requstContact(args))

        let url = window.BASE_URL + '/channelManager/user/getUserList';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(args),
            headers,
            credentials: 'include'
        });

        return fetch(request).then(response => {
                if (response.status !== 200) {
                    dispatch(receiveContactError(null, e))
                } else {
                    response.json().then(json => {
                        dispatch(receiveContactSuccess(null, json))
                    })
                }
            }).catch(e => {
                dispatch(receiveContactError(null, e))
            })
    }
}

export function queryConditionChange(values) {
  return { type: QUERY_CONDITION_CHANGE, values}
}

export function setVisibilityContactModal(visible, data) {
    return {
        type: SET_VISIBILITY_CONTACT_MODAL,
        visible,
        data
    }
}

export function requstAddContact(args) {
  return { type: REQUEST_ADD_CONTACT, args}
}

export function addContactSuccess(args, json) {
  return {
    type: ADD_CONTACT_SUCCESS,
    args,
    data: json,
    adddAt: Date.now()
  }
}

export function addContactError(args, e) {
  return {
    type: ADD_CONTACT_ERROR,
    args,
    error: e,
    adddAt: Date.now()
  }
}

export function clearContactError(args, e) {
  return {
    type: CLEAR_CONTACT_ERROR,
    args,
    error: e
  }
}

export function addContact(args) {
    return dispatch => {
        dispatch(requstAddContact(args))

        let url = window.BASE_URL + '/channelManager/user/getUserList';
        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(args),
            headers,
            credentials: 'include'
        });

        return fetch(request).then(response => {
                if (response.status !== 200) {
                    dispatch(addContactError(null, e))
                } else {
                    response.json().then(json => {
                        dispatch(addContactSuccess(null, json));
                        dispatch(setVisibilityContactModal(false, {}))
                    })
                }
            }).catch(e => {
                dispatch(addContactError(null, e))
            })
    }
}
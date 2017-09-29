import fetch from 'isomorphic-fetch' //https://github.com/github/fetch

/*
 * action 类型
 */
export const TOGGLE_SIDER = 'TOGGLE_SIDER';
export const SELECT_KEY = 'SELECT_KEY';
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO_SUCCESS = 'RECEIVE_USER_INFO_SUCCESS';
export const RECEIVE_USER_INFO_ERROR = 'RECEIVE_USER_INFO_ERROR';
export const MODIFY_BREADCRUMB = 'MODIFY_BREADCRUMB';
/*
 * action 创建函数
 */
export function toggleSider(operation) {
  return { type: TOGGLE_SIDER, operation }
}

export function selectKey(keys) {
  return { type: SELECT_KEY, keys }
}

export function requestUserInfo(args) {
  return { type: REQUEST_USER_INFO, args }
}

export function receiveUserInfoSuccess(args, json) {
  return {
    type: RECEIVE_USER_INFO_SUCCESS,
    args,
    userInfo: json,
    receivedAt: Date.now()
  }
}

export function receiveUserInfoError(args, e) {
  return {
    type: RECEIVE_USER_INFO_ERROR,
    args,
    error: e,
    receivedAt: Date.now()
  }
}

export function modifyBreadcrumb(breadcrumbArray) {
  return {
    type: MODIFY_BREADCRUMB,
    breadcrumbArray
  }
}

export function fetchUserInfo() {
    return dispatch => {
        dispatch(requestUserInfo())

        let url = window.BASE_URL + '/gateway/auth/owns/authed?' + new Date().valueOf();
        let headers = new Headers();
        headers.append('systemKey', 'resourcemanager');
        let request = new Request(url, {method: 'GET', headers: headers, credentials: 'include'});

        return fetch(request).then(response => response.json())
            .then(json => {
                if (json.status&&json.status !== 200)
                    dispatch(receiveUserInfoError(null, json))
                else
                    dispatch(receiveUserInfoSuccess(null, json))
            }).catch(e => {
                dispatch(receiveUserInfoError(null, e))
            })
    }
}
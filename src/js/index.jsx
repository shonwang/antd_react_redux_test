import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware , combineReducers} from 'redux';
import { Provider, connect } from 'react-redux';
import { Layout, message } from 'antd';
import MyRouter from './router';
import * as allSiderReducers from './sider/reducers/reducers';
import { toggleSider, selectKey, fetchUserInfo } from './sider/actions/actions';
import {MyHeader, MySider} from './sider/components/sider';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const siderReducers = combineReducers(allSiderReducers)

export const store = createStore(siderReducers, applyMiddleware(ReduxThunk, logger))

fetchUserInfo()(store.dispatch);

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            dispatch(toggleSider(store.getState().toggleSiderReducer.collapsed))
        }
    }
}

const mapStateToProps = (state) => {
  return {
    collapsed: state.toggleSiderReducer.collapsed,
    mode: state.toggleSiderReducer.mode,
    selectedKeys : state.selectKeyReducer,
    isFetching: state.fetchUserInfoReducer.isFetching,
    userInfo: state.fetchUserInfoReducer.userInfo,
    error: state.fetchUserInfoReducer.error,
  }
}

const MyHeaderWithRedux = connect(mapStateToProps, mapDispatchToProps)(MyHeader);
const MySiderWithRedux = connect(mapStateToProps)(MySider);

class MySiderBar extends React.Component {

  render() {
    return (
        <Provider store={store}>
            <Layout id="components-layout-demo-custom-trigger" style={{ height: '100vh' }}>
                    <MyHeaderWithRedux />
                <Layout className="ant-layout-has-sider">
                    <MySiderWithRedux />
                    <Layout>
                        <Layout.Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                            <MyRouter />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        </Provider>
    );
  }
}

ReactDOM.render(<MySiderBar />, document.getElementById('root'));

// let url = 'http://local.center.ksyun.com/gateway/auth/owns/authed?' + new Date().valueOf();

// let headers = new Headers();
// headers.append('systemKey', 'resourcemanager');
// let request = new Request(url, {method: 'GET', headers: headers, credentials: 'include'}),
//     alertMsg = '您还没有登录,请登陆后访问本页面.系统正在为您跳转到登录页面, 如果未能自动跳转，请手动刷新！',
//     onCloseMsg = () => message.success("redirect!!!", 2);

// fetch(request).then(response => response.json())
//     .then(data => {
//         console.log("get it!", data); 
//         if (data.status&&data.status !== 200)
//         message.error(alertMsg, 5, onCloseMsg);
//         else
//         ReactDOM.render(<MySiderBar />, document.getElementById('root'))
//     }).catch(e => {
//         console.log("error", e)
//         message.error(alertMsg, 5, onCloseMsg);
//     })
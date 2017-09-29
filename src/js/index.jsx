import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware , combineReducers} from 'redux';
import { Provider, connect } from 'react-redux';
import { Layout, message, Breadcrumb } from 'antd';
import MyRouter from './router';
import * as allSiderReducers from './sider/reducers/reducers';
import { toggleSider, fetchUserInfo } from './sider/actions/actions';
import {MyHeader, MySider, MyBreadcrumb} from './sider/components/sider';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

if (process.env.NODE_ENV !== 'production')
    window.BASE_URL = "http://local.center.ksyun.com";

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
    breadcrumbArray: state.modifyBreadcrumbReducer,
  }
}

const MyHeaderWithRedux = connect(mapStateToProps, mapDispatchToProps)(MyHeader);
const MySiderWithRedux = connect(mapStateToProps)(MySider);
const MyBreadcrumbRedux = connect(mapStateToProps)(MyBreadcrumb);

class MySiderBar extends React.Component {

  render() {
    return (
        <Provider store={store}>
            <Layout id="components-layout-demo-custom-trigger" style={{ height: '100vh' }}>
                    <MyHeaderWithRedux />
                <Layout className="ant-layout-has-sider">
                    <MySiderWithRedux />
                    <Layout>
                        <MyBreadcrumbRedux />
                        <Layout.Content style={{ margin: '12px 16px', padding: 24, background: '#fff' }}>
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
import React from 'react';
import ReactDOM from 'react-dom';

import {
  Layout,
  Menu,
  Icon,
  message
} from 'antd';

import {Link, HashRouter} from 'react-router-dom';

import "../../../css/antd.css";
import "../css/sider.css";

const {
  Header,
  Sider,
  Content
} = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MyHeader extends React.Component {
  render() {
    let props = this.props;

    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <div className="logo" />
            <Icon className="trigger" type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.onClick} />
            <Menu mode="horizontal" style={{ lineHeight: '64px', float: 'right' }} placement="topRight">
                <SubMenu title={<span><Icon type="setting" />{props.userInfo.userInfoVo&&props.userInfo.userInfoVo.name}</span>}>
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="setting:1">
                            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                        </Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        </Header>
    );
  }
}

class MySider extends React.Component {

  componentWillReceiveProps(nextProps) {
      let alertMsg = '您还没有登录,请登陆后访问本页面.系统正在为您跳转到登录页面, 如果未能自动跳转，请手动刷新！';
      if (nextProps.error) {
        console.log("error", this.props.error)
        message.error(alertMsg, 2);
      }
  }

  render() {
    return (
        <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
          <HashRouter>
            <Menu theme="dark" mode={this.props.mode} selectedKeys={this.props.selectedKeys} defaultOpenKeys={['sub1']}>
              <SubMenu key="sub1" title={<span><Icon type="user" /><span className="nav-text">User</span></span>}>
                  <Menu.Item key="/">
                    <Icon type="user" />用户管理<Link to="/"></Link>
                  </Menu.Item>
                  <Menu.Item key="/todolist">
                    <Icon type="video-camera" />备忘录<Link to="/todolist"></Link>
                  </Menu.Item>
              </SubMenu>
            </Menu>
          </HashRouter>
        </Sider>
    );
  }
}

export {MySider, MyHeader};


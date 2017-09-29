import React from 'react';

import {
  Layout,
  Menu,
  Icon,
  message,
  Breadcrumb
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
            <Icon className="logo" type="api"></Icon>金山云 CDN Open API
            <Icon className="trigger" type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.onClick} />
            <Menu mode="horizontal" style={{ lineHeight: '64px', float: 'right' }} placement="topRight">
                <SubMenu title={<span><Icon type="setting" />{props.userInfo.userInfoVo&&props.userInfo.userInfoVo.name}</span>}>
                    <MenuItemGroup>
                        <Menu.Item key="setting:1">
                            <a href="https://ant.design" target="_blank">退出登录</a>
                        </Menu.Item>
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
              <SubMenu key="sub1" title={<span><Icon type="bell" /><span className="nav-text">报警通讯</span></span>}>
                  <Menu.Item key="/">
                    <Icon type="contacts" />联系人管理<Link to="/"></Link>
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

class MyBreadcrumb extends React.Component {
  render() {
    let props = this.props;
    if (!props.breadcrumbArray) {
        return (
          <Breadcrumb style={{ margin: '12px 0 0 20px' }}></Breadcrumb>
        );
    }
    var BreadcrumbRows = props.breadcrumbArray.map(function(name, index){
        return ( <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>);
    }.bind(this))

    return (
        <Breadcrumb style={{ margin: '12px 0 0 20px' }}>
          {BreadcrumbRows}
        </Breadcrumb>
    );
  }
}

export {MySider, MyHeader, MyBreadcrumb};


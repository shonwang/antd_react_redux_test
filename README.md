# 报警管理控制台说明

### 依赖
1. nodejs

2. 运行以下命令安装依赖包

```
cd $PATH
npm install
```

### 开发环境

`开发环境`就是在本机进行开发和调试.与后台服务的链接,需要通过nginx做代理访问:

1. 设置访问地址为:`http://local.center.ksyun.com/alert-web-console/dist/index.html`，`local.center.ksyun.com` 域名， `alert-web-console` 目录名可以在nginx里面随便配

2. 目前链接的后端为中控的

3. 配置本地host `127.0.0.1 local.center.ksyun.com`

4. 每次修改代码后需要运行 `npm run build` 编译后刷新浏览器

上述nginx配置如下:

```
    server {
        listen 80;
        server_name local.center.ksyun.com;
        location /cdn-center-control-web-console/{
            root E:/project/;
        }
        location /alert-web-console/{
            root E:/project/;
        }
        location /{
            proxy_pass http://10.12.6.143:7331;
            proxy_set_header Host develop.gateway.center.cdn.ksyun.com;
            proxy_set_header X-Forward-For $remote_addr;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   share/nginx/html;
        }
    }
```


### 相关技术文档

偶尔会需要翻墙

redux [http://redux.js.org/](http://redux.js.org/ "redux")

react [https://facebook.github.io/react/docs/hello-world.html](https://facebook.github.io/react/docs/hello-world.html "react")

react-router [https://reacttraining.com/react-router/web/guides/philosophy](https://reacttraining.com/react-router/web/guides/philosophy "react-router")

Ant Design of React 组件库 [https://ant.design/docs/react/introduce-cn](https://ant.design/docs/react/introduce-cn "Ant Design of React")

### 如何用此框架进行开发

框架示意图：

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/1593611749-5686a73ae3662_articlex.png)

Redux 认为，一个应用程序中，所有应用模块之间需要共享访问的数据，都应该放在 State 对象中。这个应用模块可能是指 React Components，也可能是你自己访问 AJAX API 的代理模块，具体是什么并没有一定的限制。 State 以 “树形” 的方式保存应用程序的不同部分的数据。 当前项目以功能划分模块，比如联系人信息管理是一个模块，联系人组管理是一个模块等等

目录结构如下：

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929161828.png)

其中

`contactManage` 是联系人管理模块相关的代码，`sider` 是侧边栏相关的代码

`index.jsx` 是入口代码，主要做一些初始化的工作，比如，初始化`redux`与 `react`，生成存储状态的`store`，加载`redux`中间件，加载路由等等。

`router.jsx` 定义路由，新增一个模块，就从修改这个文件开始

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929162936.png)

图中定义了当访问 "/" 时，加载联系人管理模块。

`bundle.jsx` 是一个运行异步按需加载的需要用的组件，用法如上图。

以联系人管理为例，根据 redux 框架的设定，划分目录结构如下：

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929164106.png)

根据原型，将界面划分为三个组件，然后用一个容器装载它们。

比如联系人管理，一块是操作部分，包括查询，新建联系人按钮 `OperationalPanel.jsx`，一块是联系人列表展示的表格 `ContactTable.jsx`，还有新建编辑联系人弹出的模态框 `AddorEditContactModal.jsx`。然后容器 `App.jsx`

这一部分主要是用到了react 及其组件库 Ant Design of React，代码示例如下

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929170008.png)

组件定义完成后，要实现交互以及数据的变更等，这就需要定义 `action` 和 `Reducer`

在 `Redux` 中，`State` 只能通过 `action` 来变更。`Reducer` 就是根据 `action` 的语义来完成 `State` 变更的函数。

比如联系人管理，有一个明显的动作，那就是获取联系人列表，所以我们定义动作如下：

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929170827.png)

type 是必须要有的属性，其他都是可选的。完整建议请参考 [https://github.com/acdlite/flux-standard-action](https://github.com/acdlite/flux-standard-action "Flux Standard Action(FSA) 定义")

然后定义 reducer ，设置状态的初始值，已经修改状态方式

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929171248.png)

然后通过 dispatch 触发动作，比如：
	  
	 //触发请求联系人动作
	  componentDidMount() {
	      fetchContact(this.props.contactsProps.queryCondition)(this.props.contactsProps.dispatch)
	  }
	...
	//触发改变面包屑导航动作
	this.dispatch(modifyBreadcrumb(['报警通讯', '联系人管理']))

下一步，需要通过 `react-redux`[http://redux.js.org/docs/basics/UsageWithReact.html](http://redux.js.org/docs/basics/UsageWithReact.html) 将 `Redux State` 与 `react 组件` “连接”起来， 在容器 `App.jsx` 中，示例代码如下：

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929171936.png)

由于在实际项目中，不仅仅只有一个动作，会有很多个动作，也就有很多 `Reducer`, 所以最后一步就是在每个模块中定义一个index.jsx，文件汇总当前模块已经全局模块的所有 `Reducer` 。 示例如下：

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929172447.png)

至此，可以编译后，打开浏览器调试吧~

![](https://ks3-cn-beijing.ksyun.com/test-zzy-jr/wendang/20170929173730.png)







import React from 'react'
import {Route , HashRouter, Link} from 'react-router-dom'
import Bundle from "./bundle";
import PropTypes from 'prop-types';
import { selectKey } from './sider/actions/actions';

class MyRouter extends React.Component {
    constructor(props, context) {
        super(props);
        this.dispatch = context.store.dispatch;
        this.store = context.store;
    }

    render () {
      return (<HashRouter>
          <div>
            <Route exact path="/" component={this.index.bind(this)}/>
            <Route exact path="/todolist" component={this.todoList.bind(this)}/>
          </div>
      </HashRouter>)
    }

    index(location){
        this.dispatch(selectKey([location.match.path]))
        return <h1>hello world!</h1>
    }

    todoList(location, cb) {
        this.dispatch(selectKey([location.match.path]))
        var _this = this
        return (<Bundle load={() => import("./todoList/index")}>
          {(todoObj) => {
              _this.store.replaceReducer(todoObj.finalReducers)
              return <todoObj.App />
          }}
        </Bundle>)
    }
}

MyRouter.contextTypes = {
  store: PropTypes.object
};

export default MyRouter
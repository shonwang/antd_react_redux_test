import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContactTable from '../components/ContactTable'
import WrappedOperationalPanel from '../components/OperationalPanel'
import { createSelector } from 'reselect';

class App extends Component {

  render() {
    return (
      <div>
          <div className="operation-ctn" style={{ marginBottom: "20px"}}>
              <WrappedOperationalPanel contactsProps={this.props} />
          </div>
          <div className="table-ctn">
              <ContactTable contactsProps={this.props} />
          </div> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.fetchContactReducer.isFetching,
    data: state.fetchContactReducer.data,
    error: state.fetchContactReducer.error,
    queryCondition: state.queryConditionChangeReducer,
    setVisibilityContactModal: state.setVisibilityContactModalReducer,
    isAdding: state.addContactReducer.isAdding,
    addContactError: state.addContactReducer.error
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps)(App)
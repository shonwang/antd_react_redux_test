import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import {
  fetchContact,
  queryConditionChange,
  setVisibilityContactModal
} from '../actions/actions';
import AddorEditContactModal from './AddorEditContactModal'
const FormItem = Form.Item;

class OperationalPanel extends Component {

  constructor(props, context) {
      super(props);
      this.handleSearch = this.handleSearch.bind(this);
      this.showModal = this.showModal.bind(this);
  }

  handleSearch (value) {
      var serarchObj = {
        "domainName": value
      }
      this.props.contactsProps.dispatch(queryConditionChange(serarchObj));
      var curObj = Object.assign({}, this.props.contactsProps.queryCondition, serarchObj)
      fetchContact(curObj)(this.props.contactsProps.dispatch)
  }

  showModal () {
      let props = this.props.contactsProps;
      props.dispatch(setVisibilityContactModal(true, {}))
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline">
        <FormItem>
          {getFieldDecorator('contactName')(
            <Input.Search prefix={<Icon type="user" />} placeholder="联系人" onSearch={this.handleSearch}/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="button" icon="user-add" onClick={this.showModal}>添加联系人</Button>
          <AddorEditContactModal contactsProps={this.props.contactsProps} />
        </FormItem>
      </Form>
    );
  }
}

const WrappedOperationalPanel = Form.create()(OperationalPanel);

export default WrappedOperationalPanel

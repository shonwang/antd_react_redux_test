import React, { Component } from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  message
} from 'antd';
import {
  setVisibilityContactModal,
  addContact,
  clearContactError
} from '../actions/actions';

const FormItem = Form.Item;
const Option = Select.Option;

class AddContactForm extends React.Component {

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const defaultData = this.props.contactsProps.setVisibilityContactModal.data

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
      </Select>
    );

    const myForm = (<Form>
        <FormItem {...formItemLayout} label="姓名" hasFeedback>
          {getFieldDecorator('contactName', {
            rules: [{ required: true, message: 'Please input contact name!' }],
            'initialValue': defaultData.businessLeader
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail" hasFeedback>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
            'initialValue': defaultData.businessEmail
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
            'initialValue': defaultData.userId
          })(
            <Input type="number" addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
      </Form>)

    return myForm
  }
}

export default class AddorEditContactModal extends React.Component {

  constructor(props, context) {
      super(props);
      this.handleOk = this.handleOk.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
  }

  handleOk(){
    let _this = this
    this.refs.WrappedAddContactForm.validateFields((err, values) => {
      let props = _this.props.contactsProps;
      if (!err) {
        console.log('Received values of form: ', values);
        props.dispatch(addContact(props.queryCondition));
      }
    });
  }

  handleCancel(){
      let props = this.props.contactsProps;
      props.dispatch(setVisibilityContactModal(false, {}))
  }

  componentDidUpdate(){
    let props = this.props.contactsProps;
    if (props.addContactError) {
        message.error('This is a message of error'); 
        props.dispatch(clearContactError())
    }   
  }

  render() {
    let props = this.props.contactsProps;
    const WrappedAddContactForm = Form.create()(AddContactForm);
    let dataKeys = Object.keys(props.setVisibilityContactModal.data);

    return (
      <div>
        <Modal title={dataKeys.length === 0 ? '添加联系人' : '编辑联系人'}
          visible={props.setVisibilityContactModal.visible}
          onOk={this.handleOk}
          confirmLoading={props.isAdding}
          onCancel={this.handleCancel}
        >
          <WrappedAddContactForm contactsProps={props} ref="WrappedAddContactForm"/>
        </Modal>
      </div>
    );
  }
}
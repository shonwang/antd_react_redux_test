import React, { Component } from 'react';
import {
  Alert,
  Spin,
  Table,
  Icon,
  Pagination,
  Modal,
  Form,
  Popover,
  Tag
} from 'antd';
import { connect } from 'react-redux';
import {
  fetchContact,
  queryConditionChange,
  setVisibilityContactModal
} from '../actions/actions';
import _ from 'lodash/core';

const confirm = Modal.confirm;
const FormItem = Form.Item;

export default class ContactTable extends Component {
  constructor(props, context) {
      super(props);
      this.onChangePage = this.onChangePage.bind(this);
      this.handleEditClick = this.handleEditClick.bind(this);
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
      fetchContact(this.props.contactsProps.queryCondition)(this.props.contactsProps.dispatch)
  }

  onChangePage(page, pageSize){
      var pageObj = {
        "currentPage": page,
        "pageSize": pageSize
      }
      let props = this.props.contactsProps;
      props.dispatch(queryConditionChange(pageObj))
      var curObj = Object.assign({}, props.queryCondition, pageObj)
      fetchContact(curObj)(props.dispatch)
  }

  handleEditClick(e) {
      let props = this.props.contactsProps;
      let curObj = _.find(props.data.data, function(el) {
          return el.id == e.target.id;
      });
      props.dispatch(setVisibilityContactModal(true, curObj))
  }

  handleDeleteClick(e) {
      let props = this.props.contactsProps;
      let curObj = _.find(props.data.data, function(el) {
          return el.id == e.target.id;
      });
      confirm({
        title: 'Are you sure delete this contact?',
        content: curObj.businessLeader,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          console.log('OK');
        }
      });    
  }

  render() {
    let props = this.props.contactsProps;

    if (!props.data) {
        return (
          <Alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon
          />
        );
    }

    const columns = [{
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '渠道',
      dataIndex: 'companyName',
      key: 'companyName',
    },{
      title: '姓名',
      dataIndex: 'businessLeader',
      key: 'businessLeader',
    },{
      title: '手机号码',
      dataIndex: 'userId',
      key: 'userId',
    },{
      title: '邮箱',
      dataIndex: 'businessEmail',
      key: 'businessEmail',
    },{
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      render: (text, record) => {
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

        const contactGroup = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];
        const colors = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];

        const tags = contactGroup.map((cg, index) =>{
            let random = Math.floor(Math.random() * colors.length)
            return (<Tag color={colors[random]} key={index}>{cg}</Tag>)
        })

        const content = (
          <div>
            <Form>
              <FormItem {...formItemLayout} label="姓名" style={{marginBottom: '5px'}}>
                  <p>{record.businessLeader}</p>
              </FormItem>
              <FormItem {...formItemLayout} label="E-mail" style={{marginBottom: '5px'}}>
                  <p>{record.businessEmail}</p>
              </FormItem>
              <FormItem {...formItemLayout} label="手机号码" style={{marginBottom: '5px'}}>
                  <p>{record.userId}</p>
              </FormItem>
              <FormItem label="所属联系人组" style={{marginBottom: '5px'}}>
                <div>{tags}</div>
              </FormItem>
            </Form>
          </div>
        );
         return (<span>
                  <a href="javascript:void(0)" id={record.id} onClick={(e) => this.handleEditClick(e)}>编辑</a>
                  <span className="ant-divider" />
                  <a href="javascript:void(0)" id={record.id} onClick={(e) => this.handleDeleteClick(e)}>删除</a>
                  <span className="ant-divider" />
                  <Popover content={content} title="详情" trigger="click" placement="left" overlayStyle={{width: '300px'}}>
                    <a href="javascript:void(0)" id={record.id}>详情</a>
                  </Popover>
                </span>)
      },
    }];

    var pagination = {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: function showTotal(total) {
          return 'Total '+ total + ' items';
        },
        current: props.queryCondition.currentPage,
        total: props.data.totalCount,
        onChange: this.onChangePage,
        onShowSizeChange: this.onChangePage
    }

    return ( <Table rowKey="id" dataSource={props.data.data} loading={props.isFetching} columns={columns} pagination = {pagination}/> )
  }
}
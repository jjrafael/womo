import React, { Component } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { onFormSubmit } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onFormSubmit(values);
      }
    });
  };

  render () {
    const { notif } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        { notif.message && <Alert className="mb-4" { ...notif } /> }
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit" className={'primary-bg login-form-button'}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';

const Login = () => {

  const [radioOption, setRadioOption] = useState('login');

  const onChange = ({ target: { value } }) => {
    console.log('radio checked', value);
    setRadioOption(value);
  };

  const options = [
    {
      label: 'Login',
      value: 'login',
    },
    {
      label: 'Signup',
      value: 'signup',
    }
  ];

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='flex justify-center'>
      <div className='grid justify-center mt-24 p-24 w-fit border-solid border-2'>
      <Radio.Group
        className='flex justify-center mb-10'
        options={options}
        onChange={onChange}
        value={radioOption}
        optionType="button"
        buttonStyle="solid"
      />
      <h1 className='text-4xl text-center font-bold mb-10'>Login</h1>
        <Form
          className=''
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className='border-solid border-blue-400 font-semibold text-blue-400' type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
import React from "react";
import { Form, Input } from "antd";
import Button from "@/components/UI/Button";
import { validateEmail } from "@/utils/helper";

const ResetEmail = ({ userProfile }) => {
  const [form] = Form.useForm();
  form.setFieldsValue({ old_email: userProfile?.email });

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="mt-5">
        <label className=" font-medium">Old Email Address</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="old_email"
          rules={[
            {
              required: true,
              message: "Please input your valid email address!",
            },
            {
              validator: validateEmail,
            },
          ]}
        >
          <Input disabled className="h-8 mt-1" />
        </Form.Item>
      </div>

      <div className="mt-5 mb-10">
        <label className=" font-medium">New Email Address</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="new_email"
          rules={[
            {
              required: true,
              message: "Please input a valid email address!",
            },
            {
              validator: validateEmail,
            },
          ]}
        >
          <Input className="h-8 mt-1" />
        </Form.Item>
      </div>

      <Form.Item>
        <Button btnName="Reset Email" styles="w-full py-2"></Button>
      </Form.Item>
    </Form>
  );
};

export default ResetEmail;

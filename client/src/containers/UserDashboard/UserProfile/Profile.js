import React from "react";
import { Form, Input, InputNumber, Select, Upload } from "antd";

const Profile = ({ userProfile }) => {
  // console.log("testing model", userProfile);   // TODO: [ankan bhai] input field not updating. fixed this issue or change input/form to normal <p> tag 

  const prefixSelector = (
    <Form.Item name="prefix" initialValue="+880" noStyle>
      <Select style={{ width: 80 }} disabled>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <Form
          autoComplete="off"
          layout="vertical"
          initialValues={userProfile}
          className="w-full flex flex-wrap justify-between"
        >
          <Form.Item
            name="name"
            label="Name"
            className="w-[49%]"
            rules={[{ required: true, message: "Please enter your name" }]}
            hasFeedback
          >
            <Input placeholder="Type your name" disabled />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            className="w-[49%]"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your email" disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            className="w-[49%]"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                type: "number",
                message: "please your phone number",
                min: 1100000000,
                max: 1999999999,
              },
            ]}
            hasFeedback
          >
            <InputNumber
              addonBefore={prefixSelector}
              className="w-full"
              placeholder="mobile number"
              disabled
            />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            className="w-[49%]"
            rules={[
              {
                required: true,
                message: "Please enter your age",
              },
              {
                type: "number",
                message: "your age is required",
                min: 4,
                max: 100,
              },
            ]}
            hasFeedback
          >
            <InputNumber className="w-full" placeholder="Type age" disabled />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Profile;

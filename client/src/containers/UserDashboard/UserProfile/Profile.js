import React from "react";
import { Form, Input, InputNumber, Select, Upload } from "antd";
import Image from "next/image";

const Profile = ({ userProfile }) => {
  console.log("testing model", userProfile);

  const prefixSelector = (
    <Form.Item name="prefix" initialValue="+880" noStyle>
      <Select style={{ width: 80 }} disabled></Select>
    </Form.Item>
  );

  return (
    <div>
      <div className="flex items-center">
        <div className="border border-solid border-gray-300 mb-5 rounded-md">
          <Image
            src={userProfile.image}
            className="object-cover"
            width={200}
            height={200}
          />
        </div>
        <div className="ml-10">
          <p
            style={{
              borderBottom: "2px",
              borderBottomStyle: "solid",
              borderColor: "#D0D0D0",
            }}
            className=" mb-2 text-lg font-semibold"
          >
            <span>Name - </span>
            {userProfile.name}
          </p>
          <p
            style={{
              borderBottom: "2px",
              borderBottomStyle: "solid",
              borderColor: "#D0D0D0",
            }}
            className=" mb-2 text-lg font-medium text-gray-600"
          >
            <span>Email - </span>
            {userProfile.email}
          </p>
          <p
            style={{
              borderBottom: "2px",
              borderBottomStyle: "solid",
              borderColor: "#D0D0D0",
            }}
            className=" mb-2 text-lg font-medium text-gray-600"
          >
            <span>Age - </span>
            {userProfile.age}
          </p>
          <p
            style={{
              borderBottom: "2px",
              borderBottomStyle: "solid",
              borderColor: "#D0D0D0",
            }}
            className=" mb-2 text-lg font-medium text-gray-600"
          >
            <span>Phone - </span>
            {userProfile.phone_full}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

/* 
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


*/

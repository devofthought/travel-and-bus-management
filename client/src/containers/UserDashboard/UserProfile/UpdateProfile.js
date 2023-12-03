import React from "react";
import { Form, Input, InputNumber, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MainButton from "../../../components/UI/Button";

const UpdateProfile = ({ userProfile }) => {
  // form
  const onFinish = (values) => {
    console.log({ values });
    // setData({
    //   ...values,
    // });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const prefixSelector = (
    <Form.Item name="prefix" initialValue="+880" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="+880">+880</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <Form
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
          initialValues={userProfile}
          className="w-full flex flex-wrap justify-between"
          onFinishFailed={(error) => {
            console.log({ error }); // TODO: [anakar bhai] handle the error show the proper way
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            className="w-[49%]"
            rules={[{ required: true, message: "Please enter your name" }]}
            hasFeedback
          >
            <Input placeholder="Type your name" />
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
            <InputNumber className="w-full" placeholder="Type age" />
          </Form.Item>

          <Form.Item
            label="Profile Photo"
            name="profile-photo"
            valuePropName="fileList"
            className="w-full"
            getValueFromEvent={(event) => {
              return event?.fileList;
            }}
            rules={[
              {
                required: false,
                message: "Profile picture",
              },
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    if (fileList && fileList[0].size > 2000000) {
                      reject("File size must be under 2MB");
                    } else {
                      resolve("success");
                    }
                  });
                },
              },
            ]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                  if (file.size > 2000000) {
                    reject("File size must be under 2MB");
                  } else {
                    resolve("success");
                  }
                });
              }}
            >
              {uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }} className="w-full mb-0">
            <MainButton
              btnName={"Update Profile"}
              styles="w-full py-2"
            ></MainButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;

import { Avatar, Button, Card, Form, Input, Modal, Upload } from "antd";
import React, { useState } from "react";
import {
  EditOutlined,
  UserOutlined,
  GoogleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const SecondaryBanner = ({openDashboard, setOpenDashboard}) => {
  const isLoggedIn = true;

  // modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  // form
  const onFinish = (values) => {
    console.log({ values });
    setData({
      ...values,
    });
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
  return (
    <Card
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-12 pt-32"
      style={{ borderRadius: "10px" }}
    >
      <div className="container ">
        <h1 className="text-4xl font-bold">Welcome to Our Bus Booking App</h1>
        <p className="mt-4 text-lg">
          Discover comfortable and convenient bus journeys for your travels.
        </p>
        <div className="flex justify-between items-center w-2/3 mx-auto mt-10">
          {isLoggedIn ? (
            <div className="flex items-start">
              <div className="relative w-16">
                <Avatar
                  className="bg-gray-200 flex justify-center items-center"
                  size={64}
                  icon={<UserOutlined className="text-gray-600" />}
                />
                <Button
                  type="primary"
                  className="absolute bottom-0 right-0 bg-gray-400 flex justify-center items-center"
                  shape="circle"
                  size="small"
                  onClick={showModal}
                  icon={<EditOutlined />}
                />
              </div>
              <div className="text-left ml-2">
                <p>name</p>
                <p>example@gmail.com</p>
                <button
                  onClick={() => setOpenDashboard(!openDashboard)}
                  className="bg-white hover:bg-gray-200 text-blue-500 font-semibold py-0.5 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 mt-2"
                >
                  Details
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button className="bg-white hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                Login
              </button>

              <Button
                type="primary"
                shape="circle"
                style={{
                  backgroundColor: "white",
                  color: "gray",
                  height: "40px",
                  width: "40px",
                }}
                className="font-semibold ml-3 flex justify-center items-center"
                icon={<GoogleOutlined style={{ fontSize: "32px" }} />}
              />
            </div>
          )}

          <button className="bg-white hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            Modify Search
          </button>
        </div>
      </div>
      <Modal
        title="Update Profile"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex justify-between flex-wrap">
          <Form
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className="w-full flex flex-wrap justify-between"
            onFinishFailed={(error) => {
              console.log({ error });
            }}
          >
            <Form.Item name="name" label="Name" className="w-[49%]" hasFeedback>
              <Input placeholder="Type your name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              className="w-[49%]"
              hasFeedback
            >
              <Input placeholder="Type your email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              className="w-[49%]"
              hasFeedback
            >
              <Input placeholder="Type your phone number" />
            </Form.Item>

            <Form.Item name="age" label="Age" className="w-[49%]" hasFeedback>
              <Input placeholder="Type your age" />
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
                  required: true,
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
              <Button
                className="w-full bg-blue-500"
                block
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Card>
  );
};

export default SecondaryBanner;
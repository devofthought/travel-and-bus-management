import { Avatar, Button, Card, Form, Input, Modal, Upload } from "antd";
import React, { useState } from "react";
import {
  EditOutlined,
  UserOutlined,
  GoogleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import MainButton from "../UI/Button";

const SecondaryBanner = ({ openDashboard, setOpenDashboard }) => {
  // PROFILE UPDATE MODAL
  const [searchModal, setSearchModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  // TRIP SEARCH MODAL
  const showTripSearchModal = () => {
    setSearchModal(true);
  };
  const closedTripSearchModal = () => {
    setSearchModal(false);
  };
  const [confirmLoadingTripSearchModal, setConfirmLoadingTripSearchModal] =
    useState(false);

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
      className="bg-center bg-cover sm:bg-contain lg:bg-cover bg-no-repeat z-10 text-gray-700 text-center py-12 pt-32 h-[500px]"
      style={{
        backgroundImage: `url("/images/HomeBannerImg.png")`,
        inset: "0px",
        borderRadius: "10px",
      }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Welcome to Our Bus Booking App</h1>
        <p className="mt-4 text-lg">
          Discover comfortable and convenient bus journeys for your travels.
        </p>
        <div className="flex justify-between items-center w-2/3 mx-auto mt-10 backdrop-blur-xl opacity-100  p-5 rounded-3xl">
          <div className="flex items-center">
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
            <div className="text-left ml-3">
              <h3 className="text-slate-900">Mr. Full Name</h3>
              <p className="text-slate-900">example@gmail.com</p>
            </div>
          </div>
          <button
            className="primary-bg text-white border-none rounded-[5px] cursor-pointer text-center py-2 px-3"
            onClick={showTripSearchModal}
          >
            Trip Search
          </button>
          {/* <MainButton styles="py-2 px-4" btnName="Trip Search"></MainButton> */}
        </div>
      </div>

      {/* PROFILE UPDATE MODAL */}
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
              <MainButton btnName={"Submit"} styles="w-full py-2"></MainButton>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* TRIP SEARCH MODAL */}
      <Modal
        title="Trip Search"
        open={searchModal}
        centered
        confirmLoading={confirmLoadingTripSearchModal}
        onCancel={closedTripSearchModal}
        footer={null}
      >
        <div className="flex justify-between flex-wrap">
          <p>search trip</p>
        </div>
      </Modal>
    </Card>
  );
};

export default SecondaryBanner;

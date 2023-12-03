import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import MainButton from "../UI/Button";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import Image from "next/image";
import SearchBarV2 from "./SearchBarV2";

const previousData = {
  name: "",
  email: "",
  image: "",
  age: "",
  phone: "",
};

const SecondaryBanner = ({ openDashboard, setOpenDashboard }) => {
  const [userProfile, setUserProfile] = useState(previousData);
  // USER PROFILE GET
  const { data } = useGetMyProfileQuery();
  // console.log(data);

  // PROFILE UPDATE MODAL
  const [searchModal, setSearchModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    const user = {
      name: data?.data.traveler_id?.name,
      email: data?.data.traveler_id?.email,
      image: data?.data.traveler_id?.image,
      age: data?.data.traveler_id?.age,
      phone:
        data?.data.traveler_id?.phone &&
        data?.data.traveler_id?.phone.substring(4),
    };
    setUserProfile({ ...user });
  }, [data]);

  console.log(userProfile);
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
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="+880">+880</Option>
      </Select>
    </Form.Item>
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
              <Image
                alt="avatar"
                className={`w-16 h-16 rounded-full p-[2px] bg-white cursor-pointer`}
                src={
                  userProfile?.image
                    ? userProfile?.image
                    : "/images/user-avatar.png"
                }
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
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
              <h3 className="text-slate-900 capitalize">{userProfile?.name}</h3>
              <p className="text-slate-900">{userProfile?.email}</p>
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
        centered
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex justify-between flex-wrap">
          <Form
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            initialValues={userProfile}
            className="w-full flex flex-wrap justify-between"
            onFinishFailed={(error) => {
              console.log({ error });
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
              <Input placeholder="Type your email" />
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
              {/* <Input addonBefore={prefixSelector} style={{ width: "100%" }} /> */}
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
              <MainButton btnName={"Submit"} styles="w-full py-2"></MainButton>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* TRIP SEARCH MODAL */}
      <Modal
        title={null}
        open={searchModal}
        centered
        confirmLoading={confirmLoadingTripSearchModal}
        onCancel={closedTripSearchModal}
        footer={null}
        closable={false}
        width={1000}
      >
        <SearchBarV2 />
      </Modal>
    </Card>
  );
};

export default SecondaryBanner;

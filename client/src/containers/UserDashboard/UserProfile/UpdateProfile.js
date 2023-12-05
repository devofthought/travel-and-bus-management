import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useUpdateTravelerProfileMutation } from "@/redux/user/userApi";
import Swal from "sweetalert2";

const UpdateProfile = ({ userProfile }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [
    updateTravelerProfile,
    {
      data: updateTravelerProfileResponse,
      error: updateTravelerProfileError,
      isLoading: updateTravelerProfileIsLoading,
    }, // TODO: [ankan bhai] handle error
  ] = useUpdateTravelerProfileMutation();
  // form
  const onFinish = (values) => {
    // console.log(values);

    // error handle of form data
    if (!values.name || !values.phone || !values.age || !values.profile_photo) {
      messageApi.open({
        type: "error",
        content: "Name, Phone, Age, and Profile Photo can't be empty!",
      });
      return;
    }

    let formData = new FormData();
    if (values.age) {
      formData.append("age", values.age);
    }
    if (values.name) {
      formData.append("name", values.name);
    }
    if (values.phone) {
      formData.append("phone", values.prefix + values.phone);
    }
    if (values.profile_photo) {
      formData.append("profile_image", values.profile_photo[0].originFileObj);
      console.log(values.profile_photo[0].originFileObj);
    }
    updateTravelerProfile(formData);
  };

  useEffect(() => {
    if (updateTravelerProfileResponse?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${updateTravelerProfileResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (
      updateTravelerProfileError?.status === 404 ||
      updateTravelerProfileError?.status === 406 ||
      updateTravelerProfileError?.status === 400
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${updateTravelerProfileError?.data?.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [updateTravelerProfileResponse, updateTravelerProfileError]);

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
      {contextHolder}
      <div className="flex justify-between flex-wrap">
        <Form
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
          initialValues={userProfile}
          className="w-full flex flex-wrap justify-between"
          onFinishFailed={(error) => {
            // error handle of form data
            if (
              error.values.name === "" ||
              !error.values.phone ||
              !error.values.age ||
              !error.values.profile_photo
            ) {
              messageApi.open({
                type: "error",
                content: "Name, Phone, Age, and Profile Photo aren't valid!",
              });
              return;
            }
            console.log({ error }); // TODO: [anakar bhai] handle the error show the proper way
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            className="w-[49%]"
            // rules={[{ required: true, message: "Please enter your name" }]}
            hasFeedback
          >
            <Input placeholder="Type your name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            className="w-[49%]"
            rules={[
              // { required: true, message: "Please input your phone number!" },
              {
                type: "number",
                message: "Your phone number!",
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
                type: "number",
                message: "Your age must be between 4 to 100.",
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
            name="profile_photo"
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
              accept=".png, .jpg, .jpeg"
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
            {/* <MainButton
              btnName={"Update Profile"}
              styles="w-full py-2"
            ></MainButton> */}
            <Button
              type="primary"
              htmlType="submit"
              icon={updateTravelerProfileIsLoading ? <LoadingOutlined /> : null}
              className="bg-[#d84e55] hover:bg-red-600 w-full text-white border-none rounded-[5px] cursor-pointer text-center transition-transform active:scale-95 hover:opacity-75 shadow"
              loading={updateTravelerProfileIsLoading}
            >
              {updateTravelerProfileIsLoading
                ? "Updating..."
                : "Update Profile"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;

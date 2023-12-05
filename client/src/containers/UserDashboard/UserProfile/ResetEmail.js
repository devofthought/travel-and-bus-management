import React, { useEffect } from "react";
import { Form, Input } from "antd";
import Button from "@/components/UI/Button";
import { validateEmail } from "@/utils/helper";
import { useUpdateUserEmailMutation } from "@/redux/user/userApi";
import Swal from "sweetalert2";

const ResetEmail = ({ userProfile }) => {
  const [
    updateEmail,
    {
      data: updateEmailResponse,
      error: updateEmailError,
      isLoading: updateEmailIsLoading,
    }, // TODO: [ankan bhai] handle error
  ] = useUpdateUserEmailMutation();

  const [form] = Form.useForm();
  form.setFieldsValue({ old_email: userProfile?.email });

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    // console.log(values);
    updateEmail(values);
    form.resetFields();
  };

  useEffect(() => {
    if (updateEmailResponse?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${updateEmailResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (
      updateEmailError?.status === 404 ||
      updateEmailError?.status === 406 ||
      updateEmailError?.status === 400
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${updateEmailError?.data?.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [updateEmailResponse, updateEmailError]);

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

import React, { useEffect } from "react";
import { Form, Input } from "antd";
import Button from "@/components/UI/Button";
import Swal from "sweetalert2";
import { useUpdateUserPasswordMutation } from "@/redux/user/userApi";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [
    updatePassword,
    {
      data: updatePasswordResponse,
      error: updatePasswordError,
      isLoading: updatePasswordIsLoading,
    }, // TODO: [ankan bhai] please handle error
  ] = useUpdateUserPasswordMutation();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log(values);
    if (values.new_password !== values.confirm_new_password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "New Password isn't Matched!",
      });
      return;
    } else {
      updatePassword(values);
    }
  };

  useEffect(() => {
    if (updatePasswordResponse?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${updatePasswordResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (
      updatePasswordError?.status === 404 ||
      updatePasswordError?.status === 406 ||
      updatePasswordError?.status === 400
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${updatePasswordError?.data?.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [updatePasswordResponse, updatePasswordError]);

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="mt-5">
        <label className=" font-medium">Old Password</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="old_password"
          rules={[
            {
              required: true,
              message: "Please input your old Password!",
            },
          ]}
        >
          <Input.Password className="h-8 mt-1" />
        </Form.Item>
      </div>

      <div className="mt-5">
        <label className=" font-medium">New Password</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="new_password"
          rules={[
            {
              required: true,
              message: "Please input your New Password!",
            },
          ]}
        >
          <Input.Password className="h-8 mt-1" />
        </Form.Item>
      </div>
      <div className="mt-5">
        <label className=" font-medium">Confirm New Password</label>
        <Form.Item
          name="confirm_new_password"
          rules={[
            {
              required: true,
              message: "Please input your New Confirm Password!",
            },
          ]}
        >
          <Input.Password className="h-8 mt-1" />
        </Form.Item>
      </div>

      {/* <div className="w-full text-right -mt-4 mb-3">
        <Link href="/forget-password" className="hover:underline text-black">
          Forget your password
        </Link>
      </div> */}

      <Form.Item>
        <Button btnName="Reset Password" styles="w-full py-2"></Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPassword;

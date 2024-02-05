import { Form, Input, message } from "antd";
import Button from "@/components/UI/Button";
import { useSignUpMutation } from "@/redux/user/userApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { saveToLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import Link from "next/link";

const SignUpForm = () => {
  const [signUp, { data: signUpData, isSuccess, isLoading }] =
    useSignUpMutation();
  const [form] = Form.useForm(); // Create a form instance
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onFinish = (values) => {
    // console.log("Success:", values);

    // Password and Confirm_password checked
    if (values.password !== values.confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password isn't Matched!",
      });
      return;
    }
    const modified = {
      name: values.firstName + " " + values.lastName,
      ...values,
    };
    delete modified.firstName;
    delete modified.lastName;
    signUp(modified);

    // Reset the form fields after successful submission
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Registration successful",
      });
      if (signUpData?.data?.accessToken) {
        saveToLocalStorage("accessToken", signUpData?.data?.accessToken);
      }
      router.push("/");
    }
  }, [isSuccess]);
  return (
    <>
      {contextHolder}

      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <label className=" font-medium">First Name</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
        >
          <Input className="h-8 mt-1" />
        </Form.Item>
        <label className=" font-medium">Last Name</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
        >
          <Input className="h-8 mt-1" />
        </Form.Item>
        <label className=" font-medium">Email Address</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your valid email address!",
            },
          ]}
        >
          <Input className="h-8 mt-1" />
        </Form.Item>
        <label className=" font-medium">Password</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password className="h-8 mt-1" />
        </Form.Item>

        <div>
          <label className=" font-medium">Confirm Password</label>
          <Form.Item
            name="confirm_password"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
            ]}
          >
            <Input.Password className="h-8 mt-1" />
          </Form.Item>
        </div>

        <div className="w-full text-right -mt-4 mb-3">
          <Link href="/forget-password" className="hover:underline text-black">
            Forget your password
          </Link>
        </div>

        <Form.Item>
          <Button
            isLoading={isLoading}
            btnName="Register"
            styles="w-full py-2"
          ></Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpForm;

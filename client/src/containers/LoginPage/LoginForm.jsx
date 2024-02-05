import { Form, Input, message } from "antd";
import Button from "@/components/UI/Button";
import { useLoginMutation } from "@/redux/user/userApi";
import { useEffect } from "react";
import { saveToLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

const LoginForm = () => {
  const [
    login,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess,
    },
  ] = useLoginMutation();

  console.log(isSuccess, loginData, loginError, loginIsLoading);
  const [form] = Form.useForm(); // Create a form instance
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onFinish = (values) => {
    login(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Login successful",
      });
      if (loginData?.data?.accessToken) {
        saveToLocalStorage("accessToken", loginData?.data?.accessToken);
        saveToLocalStorage(
          "dhruto-travel-credential",
          loginData?.data?.userData
        ); // TODO:  save it for testing.
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: `${loginData?.message}`,
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset the form fields after successful submission
      form.resetFields();

      if (["admin", "driver"].includes(loginData?.data?.userData?.role)) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (loginError?.status === 401 || loginError?.status === 404) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${loginError?.data?.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [loginError]);
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        className=""
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <label className="font-medium">Email Address</label>
        <Form.Item
          className="w-full h-8 mb-4"
          name="email"
          rules={[
            {
              type: "email",
              message: "Your email address",
            },
            {
              required: true,
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input className="h-8 mt-1" />
        </Form.Item>

        <div className="pt-2">
          <label className="font-medium">Password</label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="h-8 mt-1" />
          </Form.Item>
        </div>
        {/* <p className="text-right text-sm text-black cursor-pointer -mt-5 w-full mb-5 hover:underline">
          Forget your password
        </p> */}
        <div className="w-full  text-right -mt-4 mb-3">
          <Link href="/forget-password" className="hover:underline text-black">
            Forget your password
          </Link>
        </div>

        <Form.Item>
          <Button
            isLoading={loginIsLoading}
            btnName="Log in"
            styles="w-full py-2"
          ></Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;

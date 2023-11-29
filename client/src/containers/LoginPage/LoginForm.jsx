import { Form, Input, message } from "antd";
import Button from "@/components/UI/Button";
import { useLoginMutation } from "@/redux/user/userApi";
import { useEffect } from "react";
import { saveToLocalStorage } from "@/utils/localStorage";

const LoginForm = () => {
  const [login, { data: loginData, isSuccess }] = useLoginMutation();
  const [form] = Form.useForm(); // Create a form instance
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    login(values);

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
        content: "Login successful",
      });
      if (loginData?.data?.accessToken) {
        saveToLocalStorage("accessToken", loginData?.data?.accessToken);
      }
    }
  }, [isSuccess]);
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
        <p className="text-right text-sm text-black cursor-pointer -mt-5 w-full mb-5 hover:underline">
          Forget your password
        </p>

        <Form.Item>
          <Button btnName="Log in" styles="w-full py-2"></Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;

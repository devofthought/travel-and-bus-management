import { Form, Input } from "antd";
import Button from "@/components/UI/Button";
const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
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
  );
};

export default LoginForm;

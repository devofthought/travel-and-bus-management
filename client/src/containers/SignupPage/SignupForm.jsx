import { Form, Input } from "antd";
import Button from "@/components/UI/Button";

const SignUpForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
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

      <label className=" font-medium">Confirm Password</label>
      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please input your Confirm Password!",
          },
        ]}
      >
        <Input.Password className="h-8 mt-1" />
      </Form.Item>

      <Form.Item>
        <Button btnName="Sign up" styles="w-full py-2"></Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;

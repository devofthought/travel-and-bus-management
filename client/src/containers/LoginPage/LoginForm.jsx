import { Button, Form, Input } from "antd";

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
        className="w-full h-10 mb-4"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your valid email address!",
          },
        ]}
      >
        <Input className="h-10 mt-1" />
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
        <Input.Password className="h-10 mt-1" />
      </Form.Item>
      <p className="text-right text-sm secondary-text cursor-pointer -mt-5 w-full mb-5 hover:underline">
        Forget your password
      </p>

      <Form.Item>
        <Button
          className="border-solid font-semibold w-full py-5 flex justify-center items-center"
          type="primary"
          htmlType="submit"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

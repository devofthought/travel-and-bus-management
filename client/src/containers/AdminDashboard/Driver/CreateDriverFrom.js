import { Form, Button, Select, InputNumber, Input } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const CreateDriverForm = () => {
  const [data, setData] = useState([]);

  const onFinish = (values) => {
    setData({
      ...values,
    });
  };
  console.log(data);

  return (
    <div
      style={{
        textAlign: "left",
      }}
    >
      <Form
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="Name"
          label="name"
          rules={[
            {
              required: true,
              message: "Please enter Driver name",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type driver name" />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              message: "Please enter driver age",
              min: 20,
              max: 60,
            },
          ]}
        >
          <InputNumber
            formatter={(values) =>
              `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="Type age"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please enter Driver phone number",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type driver phone number" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter Driver email address",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input type="email" placeholder="Type driver email address" />
        </Form.Item>

        <Form.Item
          name="driving_license"
          label="Driving License"
          rules={[
            {
              required: true,
              message: "Please enter driving license",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type driver driving license" />
        </Form.Item>

        <Form.Item
          name="years_experience"
          label="Year of experience"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              message: "Please enter years experience",
              min: 0,
              max: 20,
            },
          ]}
        >
          <InputNumber
            formatter={(values) =>
              `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="Type years"
          />
        </Form.Item>

        <Form.Item
          name="driving_status"
          label="Driving Status"
          requiredMark="require"
        >
          <Select placeholder="Select trip Driver code">
            <Select.Option value="on-trip">on-trip</Select.Option>
            <Select.Option value="rest">rest</Select.Option>
            <Select.Option value="ready">ready</Select.Option>
            <Select.Option value="sick">sick</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: false,
            },
            { whitespace: true },
          ]}
        >
          <Input.TextArea
            style={{ height: 120, resize: "none" }}
            placeholder="Type address"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateDriverForm;

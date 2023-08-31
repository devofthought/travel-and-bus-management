import { Form, Button, Select, Input, Upload, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const CreateIncidentForm = () => {
  const [data, setData] = useState([]);
  const onFinish = (values) => {
    console.log({ values });
    setData({
      ...values,
    });
  };

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
          name="bus_code"
          label="Bus Code"
          rules={[
            {
              required: true,
              message: "Please enter Bus code",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type Bus code" />
        </Form.Item>

        <Form.Item
          name="servicing_status"
          label="Servicing status"
          requiredMark="require"
          rules={[
            {
              required: true,
              message: "bus servicing status is required",
            },
          ]}
        >
          <Select placeholder="Select servicing status">
            <Select.Option value="pending">pending</Select.Option>
            <Select.Option value="done">done</Select.Option>
            <Select.Option value="on-servicing">on-servicing</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="seats"
          label="Bus seats"
          requiredMark="require"
          rules={[
            {
              required: true,
              message: "bus seats is required",
            },
          ]}
        >
          <Select placeholder="Select trip Driver code">
            <Select.Option value="30">30 seats bus</Select.Option>
            <Select.Option value="40">40 seats bus</Select.Option>
            <Select.Option value="44">44 seats bus</Select.Option>
            <Select.Option value="48">48 seats bus</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: false,
              message: "description is required",
            },
            { whitespace: true },
          ]}
        >
          <Input.TextArea
            style={{ height: 120, resize: "none" }}
            placeholder="Type description"
          />
        </Form.Item>

        <Form.Item
          name="cost"
          label="Cost"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              message: "Please enter cost of servicing",
              min: 0,
              max: 10000,
            },
          ]}
        >
          <InputNumber
            formatter={(values) =>
              `৳ ${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="Type cost"
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

export default CreateIncidentForm;

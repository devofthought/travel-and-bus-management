import { Form, Button, Input, Select, InputNumber, Space } from "antd";
import { useState } from "react";

const CreateTripForm = () => {
  const [data, setData] = useState([]);
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
        onFinish={(values) => {
          setData(values);
        }}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item name="route_code" label="Route code" requiredMark="require">
          <Select placeholder="Select trip route code">
            <Select.Option value="R-0001">R-0001</Select.Option>
            <Select.Option value="R-0002">R-0002</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="departure_time"
          label="Departure Time"
          rules={[
            {
              required: true,
              message: "Please enter Departure Time",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type Departure Time" />
        </Form.Item>

        <Form.Item
          name="arrival_time"
          label="Arrival Time"
          rules={[
            {
              required: true,
              message: "Please enter Arrival Time",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type Arrival Time" />
        </Form.Item>

        <Form.Item name="bus_code" label="Bus code" requiredMark="require">
          <Select placeholder="Select trip bus code">
            <Select.Option value="B-0001">B-0001</Select.Option>
            <Select.Option value="B-0002">B-0002</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="driver_code"
          label="Driver code"
          requiredMark="require"
        >
          <Select placeholder="Select trip Driver code">
            <Select.Option value="D-0001">D-0001</Select.Option>
            <Select.Option value="D-0002">D-0002</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="ticket_price"
          label="Fare Price"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              message: "Please enter trip fare",
              min: 0,
              max: 10000,
            },
          ]}
        >
          <InputNumber
            formatter={(values) =>
              `৳ ${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(values) => values.replace(/\$\s?|(,*)/g, "")}
            placeholder="Type trip fare"
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

export default CreateTripForm;

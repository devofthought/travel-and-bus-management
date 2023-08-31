import { Form, Button, Select, InputNumber, DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const UpdateTripForm = ({ editingTrip }) => {
  console.log(editingTrip);
  const [form] = Form.useForm(); // Create a form instance

  const [data, setData] = useState([]);

  const onFinish = (values) => {
    // Convert date and time to a single datetime format
    const departureDateTime = dayjs(values.departure_time).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const arrivalDateTime = dayjs(values.arrival_time).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    // Update values with the formatted datetime values
    setData({
      ...values,
      departure_time: departureDateTime,
      arrival_time: arrivalDateTime,
    });
  };

  // Set initial form values from props
  form.setFieldsValue(editingTrip);
  return (
    <div
      style={{
        textAlign: "left",
      }}
    >
      <Form
        form={form} // Pass the form instance
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
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
          label="Departure Time"
          name="departure_time"
          rules={[
            {
              required: true,
              message: "Please enter Departure Time",
            },
          ]}
        >
          <DatePicker showTime placeholder="Select Departure Date" />
        </Form.Item>

        <Form.Item
          label="Arrival Time"
          name="arrival_time"
          rules={[
            {
              required: true,
              message: "Please enter Arrival Time",
            },
          ]}
        >
          <DatePicker showTime placeholder="Select Arrival Date" />
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

export default UpdateTripForm;

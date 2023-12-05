import { Form, Button, Input, InputNumber, Select } from "antd";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useUpdateDriverMutation } from "@/redux/driver/driverApi";

const UpdateDriverForm = ({ editingDriver, resetEditing }) => {
  const [
    updateDriver,
    { data: updateResponse, error: updateError, isLoading: updateIsLoading },
  ] = useUpdateDriverMutation();
  const onFinish = async (values) => {
    await updateDriver({ driver_id: editingDriver?._id, body: values });
  };

  const [form] = Form.useForm();
  form.setFieldsValue(editingDriver);
  useEffect(() => {
    if (updateResponse?.statusCode === 200) {
      resetEditing();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${updateResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (updateError?.status === 400) {
      resetEditing();
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${updateError?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [updateResponse, updateError]);

  return (
    <div
      style={{
        textAlign: "left",
      }}
    >
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="name"
          label="Name"
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
          hasFeedback
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
          hasFeedback
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
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
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
          hasFeedback
        >
          <Input.TextArea
            style={{ height: 120, resize: "none" }}
            placeholder="Type address"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            disabled={updateIsLoading ? true : false}
            block
            type="primary"
            htmlType="submit"
          >
            {updateIsLoading ? "Loading..." : "Submit"}
          </Button>
          <Button className="mt-2" block type="default" onClick={resetEditing}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// TODO: [ankan bhai] need a nice loading for user better interaction

export default UpdateDriverForm;

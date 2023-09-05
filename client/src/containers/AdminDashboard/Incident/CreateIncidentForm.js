import { Form, Button, Select, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { useAddIncidentMutation } from "@/redux/incident/incidentApi";
import Swal from "sweetalert2";
const initialData = {
  bus_code: "",
  servicing_status: "",
  Description: "",
  cost: 0,
};
const CreateIncidentForm = () => {
  const [
    addIncident,
    { data: addResponse, error: addError, isLoading: addIsLoading },
  ] = useAddIncidentMutation();
  const onFinish = async (values) => {
    await addIncident(values);
  };

  useEffect(() => {
    console.log(addResponse);
    console.log(addError);
    if (addResponse?.success) {
      form.setFieldsValue(initialData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${addResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${addError?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [addResponse, addError]);

  const [form] = Form.useForm();
  form.setFieldsValue(initialData);

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
          <Button
            disabled={addIsLoading ? true : false}
            block
            type="primary"
            htmlType="submit"
          >
            {addIsLoading ? "Loading..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateIncidentForm;

import { Form, Button, Input, InputNumber, Select } from "antd";
import Swal from "sweetalert2";
import { useEffect } from "react";
import {
  useGetSingleIncidentDetailsQuery,
  useUpdateIncidentMutation,
} from "@/redux/incident/incidentApi";

const UpdateIncidentForm = ({ editingIncident, resetEditing }) => {
  const {
    data,
    error: currRouteError,
    isLoading: currRouteIsLoading,
  } = useGetSingleIncidentDetailsQuery(editingIncident?._id);
  const [
    updateIncident,
    { data: updateResponse, error: updateError, isLoading: updateIsLoading },
  ] = useUpdateIncidentMutation();
  const onFinish = async (values) => {
    await updateIncident({ route_id: data?.data?._id, body: values });
  };

  const [form] = Form.useForm();
  form.setFieldsValue(data?.data);
  useEffect(() => {
    if (updateResponse?.success) {
      resetEditing();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${updateResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
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
            disabled={updateIsLoading ? true : false}
            block
            type="primary"
            htmlType="submit"
          >
            {updateIsLoading ? "Loading..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateIncidentForm;

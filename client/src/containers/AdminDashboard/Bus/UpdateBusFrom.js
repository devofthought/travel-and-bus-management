import { Form, Button, Input, InputNumber, Select } from "antd";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useUpdateBusMutation } from "@/redux/bus/busApi";

const UpdateBusForm = ({ editingBus, resetEditing }) => {
  const [
    updateBus,
    { data: updateResponse, error: updateError, isLoading: updateIsLoading },
  ] = useUpdateBusMutation();

  const onFinish = async (values) => {
    console.log("bus update info", values);
    await updateBus({ bus_id: editingBus._id, body: values });
  };

  const [form] = Form.useForm();
  form.setFieldsValue(editingBus);
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
        marginTop: "20px",
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
          name="model"
          label="Model"
          rules={[
            {
              required: true,
              message: "Please enter Bus model name",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type model name" />
        </Form.Item>

        <Form.Item
          name="brand_name"
          label="Brand Name"
          rules={[
            {
              required: true,
              message: "Please enter Bus Brand Name",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type bus brand" />
        </Form.Item>
        <Form.Item
          name="total_seats"
          label="Bus seats"
          requiredMark="require"
          rules={[
            {
              required: true,
              message: "bus seats is required",
            },
          ]}
          hasFeedback
        >
          <Select placeholder="Select trip Driver code">
            <Select.Option value="40">40 seats bus</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            disabled={updateIsLoading ? true : false}
            block
            type="primary"
            htmlType="submit"
          >
            {updateIsLoading ? "Loading..." : "Update"}
          </Button>
          <Button className="mt-2" block type="default" onClick={resetEditing}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateBusForm;

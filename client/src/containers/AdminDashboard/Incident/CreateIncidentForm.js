import { Form, Button, Select, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { useAddIncidentMutation } from "@/redux/incident/incidentApi";
import Swal from "sweetalert2";
import MainButton from "@/components/UI/Button";
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
        <label className="text-base font-medium">
          <span className="primary-text">*</span> Bus Code
        </label>
        <Form.Item
          className="mt-2 mb-4"
          name="bus_code"
          rules={[
            {
              required: true,
              message: "Please Enter Bus code",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input className="h-10" placeholder="Type Bus code" />
        </Form.Item>
        <div className="flex flex-col lg:flex-row gap-x-5 justify-between">
          <div className="w-full lg:w-1/2">
            <label className="text-base font-medium">
              <span className="primary-text">*</span> Servicing Status
            </label>
            <Form.Item
              className="mt-2 mb-4"
              name="servicing_status"
              requiredMark="require"
              rules={[
                {
                  required: true,
                  message: "bus servicing status is required",
                },
              ]}
            >
              <Select size="large" placeholder="Select servicing status">
                <Select.Option value="pending">pending</Select.Option>
                <Select.Option value="done">done</Select.Option>
                <Select.Option value="on-servicing">on-servicing</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="w-full lg:w-1/2">
            <label className="text-base font-medium">
              <span className="primary-text">*</span> Cost
            </label>
            <Form.Item
              className="mt-2 mb-4"
              name="cost"
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
                className="h-10 w-full flex items-center"
                formatter={(values) =>
                  `৳ ${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                placeholder="Type cost"
              />
            </Form.Item>
          </div>
        </div>

        <label className="text-base font-medium">Description</label>
        <Form.Item
          className="mt-2 mb-6"
          name="description"
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

        <Form.Item className="mb-2" wrapperCol={{ span: 24 }}>
          {/* <Button
            disabled={addIsLoading ? true : false}
            block
            type="primary"
            htmlType="submit"
          >
            {addIsLoading ? "Loading..." : "Submit"}
          </Button> */}
          <MainButton btnName="Submit" styles="w-full py-3"></MainButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateIncidentForm;

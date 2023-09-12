import { Form, Button, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { useAddRouteMutation } from "@/redux/route/routeApi";
import Swal from "sweetalert2";
const initialData = {
  from: "",
  to: "",
  distance: 0,
};
const CreateRouteForm = () => {
  const [
    AddRoute,
    { data: addResponse, error: addError, isLoading: addIsLoading },
  ] = useAddRouteMutation();
  const onFinish = async (values) => {
    // console.log({ values });
    await AddRoute(values);
  };

  useEffect(() => {
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
          name="from"
          label="From"
          rules={[
            {
              required: true,
              message: "Please enter From of the route",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type From" />
        </Form.Item>

        <Form.Item
          name="to"
          label="To"
          rules={[
            {
              required: true,
              message: "Please enter To of the route",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Type To" />
        </Form.Item>

        <Form.Item
          name="distance"
          label="Distance"
          rules={[
            {
              required: true,
            },
            {
              type: "number",
              message: "Please enter route distance",
              min: 20,
              max: 1600,
            },
          ]}
          hasFeedback
        >
          <InputNumber
            formatter={(values) =>
              `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="Type distance"
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

export default CreateRouteForm;

import { Form, Button, Input, InputNumber } from "antd";
import {
  useGetSingleRouteDetailsQuery,
  useUpdateRouteMutation,
} from "@/redux/route/routeApi";
import Swal from "sweetalert2";
import { useEffect } from "react";

const UpdateRouteForm = ({ editingRoute, resetEditing }) => {
  const {
    data,
    error: currRouteError,
    isLoading: currRouteIsLoading,
  } = useGetSingleRouteDetailsQuery(editingRoute?._id);
  const [
    updateRoute,
    { data: updateResponse, error: updateError, isLoading: updateIsLoading },
  ] = useUpdateRouteMutation();
  const onFinish = async (values) => {
    await updateRoute({ route_id: data?.data?._id, body: values });
  };

  const [form] = Form.useForm();
  form.setFieldsValue(data?.data);

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
    } else if (updateError?.status === 400 || updateError?.status === 406) {
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
        
        <label className="font-small">
          <span className="primary-text">*</span> Distance
        </label>
        <Form.Item
          name="distance"
          className="mt-2 mb-6"
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
            className="h-10 w-full flex items-center"
            formatter={(values) =>
              `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="Type distance"
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

// TODO:[anakan bhai] handle loading button please.

export default UpdateRouteForm;

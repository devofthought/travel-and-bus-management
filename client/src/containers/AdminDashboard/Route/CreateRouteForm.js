import { Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { useAddRouteMutation } from "@/redux/route/routeApi";
import Swal from "sweetalert2";
import MainButton from "@/components/UI/Button";

const initialData = {
  from: "",
  to: "",
  distance: 0,
};


const CreateRouteForm = () => {
  const [form] = Form.useForm();
  // form.setFieldsValue(initialData);

  const [
    AddRoute,
    { data: addResponse, error: addError, isLoading: addIsLoading },
  ] = useAddRouteMutation();
  const onFinish = async (values) => {
    await AddRoute(values);
  };

  useEffect(() => {
      if (addResponse?.statusCode === 200) {
      form.setFieldsValue(initialData);
      console.log('i am here')
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${addResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }  else if (addError?.status === 400 || addError?.status === 406) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${addError?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [addResponse, addError]);

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
          <span className="primary-text">*</span> Form
        </label>
        <Form.Item
          name="from"
          className="mt-2 mb-4"
          rules={[
            {
              required: true,
              message: "Please enter From of the route",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input className="h-10" placeholder="Type From" />
        </Form.Item>
        <label className="text-base font-medium">
          <span className="primary-text">*</span> To
        </label>

        <Form.Item
          name="to"
          className="mt-2 mb-4"
          rules={[
            {
              required: true,
              message: "Please enter To of the route",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input className="h-10" placeholder="Type To" />
        </Form.Item>
        <label className="text-base font-medium">
          <span className="primary-text">*</span> Distance (km)
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

// TODO: [handler submit button with loading]

export default CreateRouteForm;

import { useAddDriverMutation } from "@/redux/driver/driverApi";
import { Form, Select, InputNumber, Input, Button } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LoadingOutlined } from "@ant-design/icons";
import { validateEmail } from "@/utils/helper";
// import MainButton from "@/components/UI/Button";

const initialData = {
  Name: "",
  address: "",
  age: 0,
  driving_license: "",
  driving_status: "",
  email: "",
  phone: "",
  years_experience: 0,
};

const CreateDriverForm = () => {
  const [driverInfo, setDriverInfo] = useState(initialData);
  const [
    AddDriver,
    { data: addResponse, error: addError, isLoading: addIsLoading },
  ] = useAddDriverMutation();

  const onFinish = async (values) => {
    setDriverInfo(values);
    const phoneNumber = values.prefix + values.phone;
    const createData = { ...values, phone: phoneNumber };
    await AddDriver(createData);
  };

  console.log(driverInfo);

  const [form] = Form.useForm();
  form.setFieldsValue(driverInfo);

  useEffect(() => {
    console.log(addError);
    if (addResponse?.statusCode === 200) {
      setDriverInfo(initialData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${addResponse?.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (addError?.status === 400) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${addError?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }, [addResponse, addError]);

  const prefixSelector = (
    <Form.Item name="prefix" initialValue="+880" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="+880">+880</Option>
      </Select>
    </Form.Item>
  );

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
          <InputNumber className="w-full" placeholder="Type age" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          className="w-full"
          rules={[
            { required: true, message: "input phone number!" },
            {
              type: "number",
              message: "Please enter Driver phone number",
              min: 1100000000,
              max: 1999999999,
            },
          ]}
          hasFeedback
        >
          <InputNumber
            addonBefore={prefixSelector}
            className="w-full"
            placeholder="phone number"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter Driver email address",
            },
            {
              validator: validateEmail,
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
              max: 30,
            },
          ]}
          hasFeedback
        >
          <InputNumber
            className="w-full"
            // formatter={(values) =>
            //   `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            // }
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
            disabled={addIsLoading ? true : false}
            block
            icon={addIsLoading ? <LoadingOutlined /> : null}
            type="primary"
            className="w-full bg-[#d84e55] rounded"
            loading={addIsLoading}
            htmlType="submit"
          >
            {addIsLoading ? "Loading..." : "Submit"}
          </Button>
          {/* <MainButton btnName="Submit" styles="w-full py-3"></MainButton> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateDriverForm;

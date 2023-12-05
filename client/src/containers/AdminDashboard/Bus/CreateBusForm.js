import { Form, Select, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAddBusMutation } from "@/redux/bus/busApi";
import MainButton from "@/components/UI/Button";
import Swal from "sweetalert2";

const initialData = {
  model: "",
  brand_name: "",
  bus_image: undefined,
  inner_image: undefined,
  outer_image: undefined,
  total_seats: "",
};

const CreateBusForm = () => {
  const [form] = Form.useForm();
  const [AddBus, { data: busCreateResponse, error, isLoading }] =
    useAddBusMutation();

  const onFinish = async (values) => {
    // console.log(values);
    let formData = new FormData();
    values.bus_image
      ? formData.append("bus_image", values?.bus_image[0]?.originFileObj)
      : formData.append("bus_image", "");
    values.inner_image
      ? formData.append("bus_image", values?.inner_image[0]?.originFileObj)
      : formData.append("bus_image", "");
    values.outer_image
      ? formData.append("bus_image", values?.outer_image[0]?.originFileObj)
      : formData.append("bus_image", "");
    formData.append("brand_name", values.brand_name);
    formData.append("model", values.model);
    formData.append("total_seats", values.total_seats);
    await AddBus(formData);
  };

  useEffect(() => {
    if (busCreateResponse?.statusCode === 200) {
      form.setFieldsValue(initialData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${busCreateResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (
      error?.status === 400 ||
      error?.status === 406 ||
      error?.status === 403
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [busCreateResponse, error]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
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
          label="Bus Image"
          name="bus_image"
          valuePropName="fileList"
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[
            {
              required: false,
              message: "Profile picture",
            },
            {
              validator(_, fileList) {
                return new Promise((resolve, reject) => {
                  if (fileList && fileList[0].size > 2000000) {
                    reject("File size must be under 2MB");
                  } else {
                    resolve("success");
                  }
                });
              },
            },
          ]}
          hasFeedback
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            style={{ width: "100%" }}
            beforeUpload={(file) => {
              return new Promise((resolve, reject) => {
                if (file.size > 2000000) {
                  reject("File size must be under 2MB");
                } else {
                  resolve("success");
                }
              });
            }}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Bus Inner Image"
          name="inner_image"
          valuePropName="fileList"
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[
            {
              required: false,
              message: "Profile picture",
            },
            {
              validator(_, fileList) {
                return new Promise((resolve, reject) => {
                  if (fileList && fileList[0].size > 2000000) {
                    reject("File size must be under 2MB");
                  } else {
                    resolve("success");
                  }
                });
              },
            },
          ]}
          hasFeedback
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={(file) => {
              return new Promise((resolve, reject) => {
                if (file.size > 2000000) {
                  reject("File size must be under 2MB");
                } else {
                  resolve("success");
                }
              });
            }}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Bus Outer Image"
          name="outer_image"
          valuePropName="fileList"
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[
            {
              required: false,
              message: "Profile picture",
            },
            {
              validator(_, fileList) {
                return new Promise((resolve, reject) => {
                  if (fileList && fileList[0].size > 2000000) {
                    reject("File size must be under 2MB");
                  } else {
                    resolve("success");
                  }
                });
              },
            },
          ]}
          hasFeedback
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={(file) => {
              return new Promise((resolve, reject) => {
                if (file.size > 2000000) {
                  reject("File size must be under 2MB");
                } else {
                  resolve("success");
                }
              });
            }}
          >
            {uploadButton}
          </Upload>
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
          <MainButton
            btnName="Submit"
            isLoading={isLoading}
            styles="w-full py-3"
          ></MainButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBusForm;

import { Form, Button, Select, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAddBusMutation } from "@/redux/bus/busApi";
import MainButton from "@/components/UI/Button";

const CreateBusForm = () => {
  const initialData = {
    model: "Vlvo x99",
    brand: "",
    bus_image: "",
    inner_image: "",
    outer_image: "",
    total_seats: "",
    availability_status: "",
  };
  const [form] = Form.useForm();
  form.setFieldsValue(initialData);
  const [AddBus, { BusResponse: response, error, isLoading }] =
    useAddBusMutation();

  // useEffect(() => {
  //   form.setFieldsValue(initialData);
  // }, [BusResponse]);

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
    formData.append("availability_status", values.availability_status);
    formData.append("brand_name", values.brand);
    formData.append("model", values.model);
    formData.append("total_seats", values.total_seats);
    await AddBus(formData);
  };

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
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        // initialValue={initialData} // Set the initial values here
        // form={form}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
        hasFeedback
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
          name="brand"
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
            style={{width: '100%'}}
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
            <Select.Option value="30">30 seats bus</Select.Option>
            <Select.Option value="40">40 seats bus</Select.Option>
            <Select.Option value="44">44 seats bus</Select.Option>
            <Select.Option value="48">48 seats bus</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="availability_status"
          label="Bus status"
          requiredMark="require"
          rules={[
            {
              required: true,
              message: "bus status is required",
            },
          ]}
          hasFeedback
        >
          <Select placeholder="Select bus status">
            <Select.Option value="transit">transit</Select.Option>
            <Select.Option value="discontinue">discontinue</Select.Option>
            <Select.Option value="servicing">servicing</Select.Option>
            <Select.Option value="rest">rest</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <MainButton btnName="Submit" styles="w-full py-3"></MainButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBusForm;

/* 

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

 */

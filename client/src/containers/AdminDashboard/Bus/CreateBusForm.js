import { Form, Button, Select, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { isRejected } from "@reduxjs/toolkit";

const CreateBusForm = () => {
  const [data, setData] = useState([]);
  const onFinish = (values) => {
    console.log({ values });
    setData({
      ...values,
    });
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
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[
            {
              required: true,
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
          label="Bus Inner Image"
          name="inner_image"
          valuePropName="fileList"
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[
            {
              required: true,
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
              required: true,
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
          name="seats"
          label="Bus seats"
          requiredMark="require"
          rules={[
            {
              required: true,
              message: "bus seats is required",
            },
          ]}
        >
          <Select placeholder="Select trip Driver code">
            <Select.Option value="30">30 seats bus</Select.Option>
            <Select.Option value="40">40 seats bus</Select.Option>
            <Select.Option value="44">44 seats bus</Select.Option>
            <Select.Option value="48">48 seats bus</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
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

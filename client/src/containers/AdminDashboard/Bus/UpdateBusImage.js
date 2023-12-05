import React, { useEffect } from "react";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import MainButton from "@/components/UI/Button";
import Swal from "sweetalert2";
import { useUpdateBusImageMutation } from "@/redux/bus/busApi";

const initialData = {
  image: undefined,
};

const UpdateImage = ({ ImageUpdate, resetImageSelect }) => {
  //   console.log(ImageUpdate);
  const [form] = Form.useForm();
  form.setFieldsValue(initialData);

  const [updateImage, { data: updateImageResponse, error, isLoading }] =
    useUpdateBusImageMutation();

  const onFinish = async (values) => {
    // console.log(values);
    let formData = new FormData();
    values.image
      ? formData.append("image", values?.image[0]?.originFileObj)
      : formData.append("bus_image", "");
    formData.append("image_name", ImageUpdate.image_name);

    // console.log(formData);
    await updateImage({ bus_id: ImageUpdate.Bus_id, body: formData });
  };

  useEffect(() => {
    if (updateImageResponse?.statusCode === 200) {
      form.setFieldsValue(initialData);
      resetImageSelect()
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${updateImageResponse?.message}`,
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
  }, [updateImageResponse, error]);

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
    <div className="mx-auto">
      <Image
        src={ImageUpdate?.url || "https://placehold.it/300x300"}
        className="object-cover"
        alt={ImageUpdate?.image_name}
        width={300}
        height={300}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />

      {/* image change form */}
      <div className="mt-10">
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
            label="change this Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(event) => {
              return event?.fileList;
            }}
            rules={[
              {
                required: false,
                message: "please upload a image",
              },
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    if (fileList && fileList[0].size > 2000000) {
                      reject("Image size must be under 2MB");
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
          <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: "0px" }}>
            <MainButton
              btnName="Update Image"
              styles="w-full py-3"
            ></MainButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateImage;

import { Form, Button, Input } from "antd";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useUpgradeMutation } from "@/redux/trip/tripApi";

const UpgradeForm = ({ modalCancel }) => {
  const [
    UpgradeTime,
    { data: updateResponse, error: updateError, isLoading: updateIsLoading },
  ] = useUpgradeMutation();

  const onFinish = async (values) => {
    // console.log(values);
    await UpgradeTime(values);
  };

  const [form] = Form.useForm();
  //   form.setFieldsValue();

  useEffect(() => {
    if (updateResponse?.statusCode === 200) {
      modalCancel();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${updateResponse?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (updateError?.status === 400 || updateError?.status === 406) {
      modalCancel();
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
        <div className="pt-2">
          <label className="font-medium uppercase">Upgrade Password</label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "upgrade password is required!",
              },
            ]}
          >
            <Input.Password className="h-8 mt-1" />
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            disabled={updateIsLoading ? true : false}
            block
            type="primary"
            htmlType="submit"
          >
            {updateIsLoading ? "Loading..." : "Submit"}
          </Button>
          {/* <Button className="mt-2" block type="default" onClick={modalCancel}>
            Cancel
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  );
};

// TODO:[anakan bhai] handle loading button please.

export default UpgradeForm;

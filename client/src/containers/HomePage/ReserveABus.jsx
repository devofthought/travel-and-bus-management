import { Col, Row, Input, Carousel, DatePicker, Select, Form } from "antd";
// import React from "react";
import Image from "next/image";
import moment from "moment";
import SectionTitle from "@/components/Shared/SectionTitle";
import Button from "@/components/UI/Button";
import Swal from "sweetalert2";
import { validateEmail } from "@/utils/helper";
import { useReserveBusMutation } from "@/redux/booking/bookingApi";
import dayjs from "dayjs";
import { useEffect } from "react";

const initialData = {
  busSeats: "",
  busType: "",
  from: "",
  to: "",
  name: "",
  email: "",
  journeyEnd: "",
  journeyDate: "",
};

const ReserveABus = () => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < moment().startOf("day");
  };
  const [form] = Form.useForm();

  const [AddReserveBus, { data, error, isLoading }] = useReserveBusMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    const journeyDateTime = dayjs(values.journeyDate).format(
      "YYYY-MM-DDTHH:mm:ss.sss"
    );
    const journeyEndTime = dayjs(values.journeyEnd).format(
      "YYYY-MM-DDTHH:mm:ss.sss"
    );

    const journeyDateTimePayload = {
      ...values,
      departure_time: journeyDateTime,
      arrival_time: journeyEndTime,
    };
    AddReserveBus(journeyDateTimePayload);
  };

  useEffect(() => {
    if (data?.statusCode === 200) {
      form.setFieldsValue(initialData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data?.message}`,
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
  }, [data, error]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="main-container py-28 lg:py-32" id="reserveBus">
      <SectionTitle
        title={
          <>
            Do You Want To Go Picnic? <br /> Reserve a Full Bus
          </>
        }
      ></SectionTitle>
      <div>
        <Row
          className="flex items-center"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
            <div>
              <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div className="grid grid-cols-2 gap-x-5">
                  <Form.Item
                    className="h-10"
                    name="from"
                    rules={[
                      { required: true, message: "Please input your From!" },
                    ]}
                  >
                    <Input
                      className="h-10 text-lg hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded-[5px]"
                      placeholder="From"
                    />
                  </Form.Item>
                  <Form.Item
                    name="to"
                    rules={[
                      { required: true, message: "Please input your To!" },
                    ]}
                  >
                    <Input
                      className="h-10 text-lg hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded-[5px]"
                      placeholder="To"
                    />
                  </Form.Item>

                  <Form.Item
                    name="bus_type"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Bus Type!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      className=" text-lg w-full hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded-[5px]"
                      placeholder="Bus Type"
                      options={[
                        {
                          value: "ac",
                          label: "AC",
                        },
                        {
                          value: "non-ac",
                          label: "Non AC",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    name="bus_seats"
                    rules={[
                      {
                        required: true,
                        message: "Please select Bus seats!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      className="h-10 text-lg w-full hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded-[5px]"
                      placeholder="Bus Seats"
                      options={[
                        {
                          value: "20",
                          label: "20 Seats",
                        },
                        {
                          value: "26",
                          label: "26 Seats",
                        },
                        {
                          value: "30",
                          label: "30 Seats",
                        },
                        {
                          value: "36",
                          label: "36 Seats",
                        },
                        {
                          value: "40",
                          label: "40 Seats",
                        },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    name="journeyDate"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Journey Date!",
                      },
                    ]}
                  >
                    <DatePicker
                      className="h-10 text-lg w-full hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded-[5px]"
                      placeholder="Journey Date"
                      disabledDate={disabledDate}
                      format={dateFormatList}
                    />
                  </Form.Item>

                  <Form.Item
                    name="journeyEnd"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Journey Date!",
                      },
                    ]}
                  >
                    <DatePicker
                      className="h-10 text-lg w-full hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded-[5px]"
                      placeholder="Journey End Date"
                      disabledDate={disabledDate}
                      format={dateFormatList}
                    />
                  </Form.Item>

                  <Form.Item
                    className="h-10"
                    name="name"
                    rules={[
                      { required: true, message: "Please input your Name!" },
                    ]}
                  >
                    <Input
                      className="h-10 text-lg hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded-[5px]"
                      placeholder="Your name"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your valid Email!",
                      },
                      {
                        validator: validateEmail,
                      },
                    ]}
                  >
                    <Input
                      className="h-10 text-lg hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded-[5px]"
                      placeholder="Your email"
                    />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button
                    btnName="Reserving Request"
                    styles="w-full py-3"
                  ></Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
            <Carousel dotPosition="right" fade autoplay>
              <div>
                <Image
                  src="https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-7900-S-Charge-front45?size=1280,720&scl=1"
                  alt="Description of the image"
                  className="w-full"
                  width={550}
                  height={250}
                />
              </div>
              <div>
                <h3>
                  <Image
                    src="https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-8900-front45?size=1280,720&scl=1"
                    alt="Description of the image"
                    className="w-full"
                    width={500}
                    height={250}
                  />
                </h3>
              </div>
              <div>
                <Image
                  src="https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-7900-Electric-front45?size=1280,720&scl=1"
                  alt="Description of the image"
                  className="w-full"
                  width={550}
                  height={250}
                />
              </div>
              <div>
                <Image
                  src="https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-9700DD-front45?size=1280,720&scl=1"
                  alt="Description of the image"
                  className="w-full"
                  width={550}
                  height={250}
                />
              </div>
            </Carousel>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReserveABus;

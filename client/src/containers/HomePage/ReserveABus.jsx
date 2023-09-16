import { Col, Row, Input, Carousel, DatePicker, Select, Form } from "antd";
import Image from "next/image";
import moment from "moment";
import SectionTitle from "@/components/Shared/SectionTitle";
import Button from "@/components/UI/Button";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const disabledDate = (current) => {
  // Can not select days before today
  return current && current < moment().startOf("day");
};
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ReserveABus = () => {
  return (
    <div className="main-container my-32 lg:my-36" id="reserveBus">
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
                    <Input className="h-10 text-lg" placeholder="From" />
                  </Form.Item>
                  <Form.Item
                    name="to"
                    rules={[
                      { required: true, message: "Please input your To!" },
                    ]}
                  >
                    <Input className="h-10 text-lg" placeholder="To" />
                  </Form.Item>

                  <Form.Item
                    name="busType"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Bus Type!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      className=" text-lg w-full"
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
                    name="journeyDate"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Journey Date!",
                      },
                    ]}
                  >
                    <DatePicker
                      className="h-10 text-lg w-full"
                      placeholder="Journey Date"
                      disabledDate={disabledDate}
                      format={dateFormatList}
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

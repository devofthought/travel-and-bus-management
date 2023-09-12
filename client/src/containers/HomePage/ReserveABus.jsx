import { Col, Row, Input, Carousel, DatePicker, Select,Form, Button } from "antd";
import Image from "next/image";
import moment from "moment";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const disabledDate = (current) => {
  // Can not select days before today
  return current && current < moment().startOf("day");
};
// const handleChange = (value) => {
//   console.log(value);
// };
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ReserveABus = () => {
  return (
    <div className="main-container py-10">
      <div className=" mb-10">
        <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">
          Do You Want To Go Picnic? <br /> Reserve a Full Bus
        </h1>
        <div className="h-[2px] md:h-1 w-[160px] bg-[#d84e55] mx-auto mt-[10px]"></div>
      </div>
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
                  rules={[{ required: true, message: 'Please input your From!' }]}
                  >
                    <Input className="h-10 text-lg" placeholder="From" />
                  </Form.Item>
                  <Form.Item
                  name="to"
                  rules={[{ required: true, message: 'Please input your To!' }]}
                  >
                    <Input className="h-10 text-lg" placeholder="To" />
                  </Form.Item>
                  
                  <Form.Item 
                  name="busType"
                  rules={[{ required: true, message: 'Please select your Bus Type!' }]}
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
                  rules={[{ required: true, message: 'Please select your Journey Date!' }]}
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
                  htmlType="submit"
                  className="border-none h-14 bg-[#d84e55] cursor-pointer text-center w-full mt-2 rounded-lg text-lg text-white"
                >
                  Reserving Request
                </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
            <Carousel autoplay>
              <div>
                <Image
                  src="/bus-2546383_1280.jpg"
                  alt="Description of the image"
                  className="w-full"
                  width={550}
                  height={250}
                />
              </div>
              <div>
                <h3>
                  <Image
                    src="/bus-2546383_1280.jpg"
                    alt="Description of the image"
                    className="w-full"
                    width={500}
                    height={250}
                  />
                </h3>
              </div>
              <div>
                <Image
                  src="/bus-2546383_1280.jpg"
                  alt="Description of the image"
                  className="w-full"
                  width={550}
                  height={250}
                />
              </div>
              <div>
                <Image
                  src="/bus-2546383_1280.jpg"
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

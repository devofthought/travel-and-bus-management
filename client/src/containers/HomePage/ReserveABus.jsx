import { Col, Row, Select, Input, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import Image from "next/image";
dayjs.extend(customParseFormat);

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const disabledDate = (current) => {
  console.log(current, dayjs().endOf("day"));
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const contentStyle = {
  height: "300px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
};

const ReserveABus = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="container w-11/12 mx-auto">
      <div className=" mb-10">
        <h1 className="font-bold text-center text-5xl">
          Do You Want To Go Picnic? <br /> Reserve a Full Bus
        </h1>
        <div className="h-1 w-[200px] secondary-bg mx-auto mt-2"></div>
      </div>
      <div>
        <Row
          className="flex items-center"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
            <div>
              <form>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Input className="h-16 text-lg" placeholder="From" />
                  </div>
                  <div>
                    <Input className="h-16 text-lg" placeholder="To" />
                  </div>
                  <div>
                    <Input className="h-16 text-lg" placeholder="Bus Type" />
                    {/* <Select
                      defaultValue="non-ac"
                      className="h-16 text-lg"
                      placeholder="To"
                      prefix={<UserOutlined />}
                      onChange={handleChange}
                      options={[
                        {
                          value: "ac",
                          label: "AC",
                        },
                        {
                          value: "non-ac",
                          label: "Non-AC",
                        },
                        ,
                      ]}
                    /> */}
                  </div>
                  <div>
                    <DatePicker
                      className="h-16 text-lg w-full"
                      placeholder="Journey Date"
                      disabledDate={disabledDate}
                      // defaultValue={dayjs("01/01/2015", dateFormatList[0])}
                      format={dateFormatList}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="h-16 secondary-bg text-center w-full mt-5 rounded-lg text-lg text-white"
                >
                  Reserving Request
                </button>
              </form>
            </div>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
            <Carousel autoplay>
              <div>
                <Image
                  src="/bus-2546383_1280.jpg"
                  alt="Description of the image"
                  width={650}
                  height={200}
                />
              </div>
              <div>
                <h3>
                  <Image
                    src="/bus-2546383_1280.jpg"
                    alt="Description of the image"
                    width={600}
                    height={200}
                  />
                </h3>
              </div>
              <div>
                <Image
                  src="/bus-2546383_1280.jpg"
                  alt="Description of the image"
                  width={650}
                  height={200}
                />
              </div>
              <div>
                <Image
                  src="/bus-2546383_1280.jpg"
                  alt="Description of the image"
                  width={650}
                  height={200}
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

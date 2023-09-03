import { Col, Row, Input, Carousel, DatePicker } from "antd";
import Image from "next/image";
import moment from "moment";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const disabledDate = (current) => {
  // Can not select days before today
  return current && current < moment().startOf("day");
};

const ReserveABus = () => {
  return (
    <div className="main-container py-10">
      <div className=" mb-10">
        <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">
          Do You Want To Go Picnic? <br /> Reserve a Full Bus
        </h1>
        <div className="h-[2px] md:h-1 w-[160px] secondary-bg mx-auto mt-2"></div>
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
                  </div>
                  <div>
                    <DatePicker
                      className="h-16 text-lg w-full"
                      placeholder="Journey Date"
                      disabledDate={disabledDate}
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

import { Col, Row } from "antd";
import { AiOutlineSafety } from "react-icons/ai";
import { FiSmartphone, FiAward } from "react-icons/fi";
import { BsCardChecklist } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { MdOutlineDiscount } from "react-icons/md";
const offerData = [
  {
    id: 1,
    icon: <FiSmartphone className="" size={48}></FiSmartphone>,
    title: "Online Booking",
    des: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum nemo distinctio dignissimos animi magnam, facere iste earum voluptatem labore corporis? Praesentium dolor ad facilis nisi",
  },
  {
    id: 2,
    icon: <MdOutlineDiscount className="" size={48}></MdOutlineDiscount>,
    title: "Discount & Promo",
    style: "md:-mt-10 text-white secondary-bg",
    des: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum nemo distinctio dignissimos animi magnam, facere iste earum voluptatem labore corporis? Praesentium dolor ad facilis nisi",
  },
  {
    id: 3,
    icon: <FiAward className="" size={48}></FiAward>,
    title: "Professional Staff",
    des: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum nemo distinctio dignissimos animi magnam, facere iste earum voluptatem labore corporis? Praesentium dolor ad facilis nisi",
  },
  {
    id: 4,
    icon: <BsCardChecklist className="" size={48}></BsCardChecklist>,
    title: "Schedule On Time",
    des: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum nemo distinctio dignissimos animi magnam, facere iste earum voluptatem labore corporis? Praesentium dolor ad facilis nisi",
  },
  {
    id: 5,
    icon: <AiOutlineSafety className="" size={48}></AiOutlineSafety>,
    title: "Safety Guarantee",
    style: "md:-mt-10 text-white secondary-bg",
    des: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum nemo distinctio dignissimos animi magnam, facere iste earum voluptatem labore corporis? Praesentium dolor ad facilis nisi",
  },
  {
    id: 6,
    icon: <BiSupport className="" size={48}></BiSupport>,
    title: "24/7 Support",
    des: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum nemo distinctio dignissimos animi magnam, facere iste earum voluptatem labore corporis? Praesentium dolor ad facilis nisi",
  },
];

const WhatWeOffer = () => {
  return (
    <div className="">
      <div className="main-container">
        <div className=" mb-10 md:mb-28">
          <h1 className="font-bold text-center text-5xl">
            What We Offer For You
          </h1>
          <div className="h-1 w-[200px] secondary-bg mx-auto mt-2"></div>
        </div>
        <div>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            {offerData.map((data) => (
              <Col
                key={data.id}
                className="gutter-row "
                xs={24}
                sm={24}
                md={12}
                lg={8}
              >
                <div
                  className={`p-10 mb-8 rounded-2xl shadow-xl bg-white secondary-bg-hover ${data?.style}`}
                >
                  <div className="">{data?.icon}</div>
                  <h1 className="text-2xl font-bold mt-6 ">{data?.title}</h1>
                  <p className="text-base opacity-90 mt-4 font-medium">
                    {data?.des}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;

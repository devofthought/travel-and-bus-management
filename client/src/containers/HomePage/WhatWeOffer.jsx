import { Col, Row } from "antd";
import { AiOutlineSafety } from "react-icons/ai";
import { FiSmartphone, FiAward } from "react-icons/fi";
import { BsCardChecklist } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import SectionTitle from "@/components/Shared/SectionTitle";
import { useState } from "react";
import MainModal from "@/components/UI/Modal";

const offerData = [
  {
    id: 1,
    icon: <FiSmartphone className="" size={48}></FiSmartphone>,
    title: "Online Booking",
    des: "Booking bus tickets online has become increasingly popular due to the numerous advantages and conveniences it offers over traditional in-person booking methods. The modern world thrives on digital advancements, and the travel industry has fully embraced this shift by providing online platforms for travelers to book their bus tickets effortlessly.",
  },
  {
    id: 2,
    icon: <MdOutlineDiscount className="" size={48}></MdOutlineDiscount>,
    title: "Discount & Promo",
    style: "lg:-mt-10 lg:bg-custom-gradient lg:text-white",
    des: "Discounts and promotions are a boon for customers, offering a multitude of benefits that enhance their shopping experience. At the core, these incentives translate into tangible cost savings, allowing customers to make purchases at a reduced price, thereby achieving value for their hard-earned money.",
  },
  {
    id: 3,
    icon: <FiAward className="" size={48}></FiAward>,
    title: "Professional Staff",
    des: "A professional staff within an organization is the cornerstone of its success and effectiveness. The term professional encompasses individuals who have acquired a specific set of skills, expertise, and knowledge in their respective domains. These professionals bring a high level of competence and dedication to their roles, contributing significantly to the organization's objectives and overall growth.",
  },
  {
    id: 4,
    icon: <BsCardChecklist className="" size={48}></BsCardChecklist>,
    title: "Schedule On Time",
    des: "Maintaining a punctual and reliable schedule is of paramount importance for a bus service company as it directly impacts the efficiency, effectiveness, and reputation of the service. A well-maintained schedule on time is a commitment to passengers, promoting a sense of trust, reliability, and professionalism.",
  },
  {
    id: 5,
    icon: <AiOutlineSafety className="" size={48}></AiOutlineSafety>,
    title: "Safety Guarantee",
    style: "lg:-mt-10 lg:bg-custom-gradient lg:text-white",
    des: "A safety guarantee is a paramount commitment made by a bus service company to prioritize and ensure the safety of its passengers, staff, and the community at large. It serves as a foundational element, illustrating the company's dedication to creating a secure environment and mitigating risks associated with transportation.",
  },
  {
    id: 6,
    icon: <BiSupport className="" size={48}></BiSupport>,
    title: "24/7 Support",
    des: "In the fast-paced world of business, the significance of 24/7 support cannot be overstated. Companies now operate on a global scale, reaching customers at all hours across various time zones. A 24/7 support framework exemplifies a company's unwavering commitment to its customer base, ensuring that help is always within reach.",
  },
];

const WhatWeOffer = () => {
  const [cardData, setCardData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (data) => {
    setIsModalOpen(true);
    setCardData(data);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-container mt-28 lg:mt-32">
      <SectionTitle title="What We Offer For You" mb={20}></SectionTitle>
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
            <>
              <Col
                key={data.id}
                className="gutter-row"
                xs={24}
                sm={24}
                md={12}
                lg={8}
              >
                <div
                  className={`p-10 mt-10 h-96 rounded-2xl border border-solid border-gray-200 shadow-xl ${data?.style} hover:bg-custom-gradient hover:text-white `}
                >
                  <div className="">{data?.icon}</div>
                  <h1 className="text-2xl font-bold mt-6 ">{data?.title}</h1>
                  <p className="text-base opacity-90 mt-4 font-medium">
                    {data?.des.slice(0, 190) + "..."}
                  </p>

                  <p
                    onClick={() => showModal(data)}
                    className="text-base font-semibold opacity-90 mt-4 flex items-center cursor-pointer"
                  >
                    Read More{" "}
                    <FaArrowRight
                      size={12}
                      className="ml-1 mt-[3px] font-bold"
                    ></FaArrowRight>
                  </p>
                </div>
              </Col>
            </>
          ))}
        </Row>
      </div>
      <MainModal
        title={cardData?.title}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        description={cardData?.des}
      ></MainModal>
    </div>
  );
};

export default WhatWeOffer;

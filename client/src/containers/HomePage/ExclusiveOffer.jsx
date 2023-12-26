import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import { Button } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Segmented } from "antd";
import Button from "@/components/UI/Button";

const ExclusiveOffer = () => {
  const segmentOptions = ["Tour & Travel", "Booking Bus"];
  const [selectedOption, setSelectedOption] = useState("Tour & Travel");

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="main-container mb-28 lg:mb-32">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <p className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl">
            NOW, <span className="font-bold">GET MORE THAN JUST BUS</span>{" "}
            TICKETS WITH DHRUTO!
          </p>

          <div className="mt-10">
            <Segmented
              size="large"
              block
              options={segmentOptions}
              className="custom-segmented-button" // Add this line to apply the custom class
              onChange={(value) => setSelectedOption(value)}
            />

            {selectedOption === "Tour & Travel" && (
              <div className="md:absolute main-container flex flex-col-reverse md:flex-row justify-between">
                <div
                  data-aos="fade-right"
                  // data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                  className=""
                >
                  <p className="mt-6 text-base	md:text-xl">
                    Rent Cabs, Tempo Travellers & Buses with best drivers
                  </p>
                  <h1 className="text-base md:text-xl mt-3">Outstation</h1>
                  <h1 className="text-base md:text-xl mt-3">Hourly Rental</h1>
                  <h1 className="text-base md:text-xl mt-3">
                    Airport Transfers
                  </h1>
                  <Button
                    btnName="Buy Bus Tickets"
                    styles="w-1/2 mt-6 py-2 "
                  ></Button>
                </div>
                <div data-aos="zoom-in" className="md:-mt-20">
                  <Image
                    src="/rydePop.svg"
                    alt="Description of the image"
                    width={670}
                    height={400}
                    layout="responsive"
                  />
                </div>
              </div>
            )}
            {selectedOption === "Booking Bus" && (
              <div className="md:absolute main-container flex flex-col-reverse md:flex-row justify-between">
                <div
                  data-aos="fade-right"
                  // data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                  className=""
                >
                  <p className="md:mt-6 text-base	md:text-xl">
                    Book IRCTC Train Tickets on redRail simple & super fast
                    <br />
                    booking process with no service fee + no payment gateway
                    charge.
                  </p>
                  <h1 className="text-base md:text-xl mt-3">
                    Authorised IRCTC Partner
                  </h1>
                  <h1 className="text-base md:text-xl mt-3">
                    Instant refunds on UPI payments
                  </h1>
                  <h1 className="text-base mt-3">
                    Hassle- free customer support
                  </h1>
                  <Button
                    btnName="Buy Train Tickets"
                    styles="w-1/2 mt-6 py-2 "
                  ></Button>
                </div>
                <div
                  data-aos="zoom-in"
                  className="md:h-[634px] md:w-[612px] md:-mt-36"
                >
                  <Image
                    src="/railPop.svg"
                    alt="Description of the image"
                    width={634}
                    height={612}
                    layout="responsive"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full hidden md:block h-[580px] md:w-1/2 bg-[url('/aboutUsImg.svg')] bg-no-repeat bg-right"></div>
      </div>
    </div>
  );
};

export default ExclusiveOffer;

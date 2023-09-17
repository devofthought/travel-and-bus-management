import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const OurExclusiveOffer = () => {
  const [toggleButton, setToggleButton] = useState(true);
  const [smallDevice, setSmallDevice] = useState(true);
  useEffect(() => {
    AOS.init();
  }, []);

  const handleButtonToggle = () => {
    setToggleButton(false);
    console.log(toggleButton);
  };

  return (
    <div className="main-container mb-36 lg:mb-44">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <p className="text-2xl text-center md:text-left md:text-5xl">
            NOW, <span className="font-bold">GET MORE THAN JUST BUS</span>{" "}
            TICKETS WITH DHRUTO!
          </p>

          <div className="mt-10">
            <Tabs>
              <TabList className="flex flex-col md:flex-row items-center cursor-pointer">
                <Tab
                  onClick={handleButtonToggle}
                  className="text-lg md:text-2xl font-bold  bg-[#EDEEF9] outline-none  focus:primary-text rounded-md py-3 px-5"
                >
                  Book Bus Tickets
                </Tab>
                <Tab className="text-lg md:text-2xl font-bold  bg-[#EDEEF9] outline-none  focus:primary-text rounded-md py-3 px-5 mt-6 md:mt-0 md:ml-6">
                  Book Train Tickets
                </Tab>
              </TabList>

              <TabPanel className="">
                <div className="md:absolute main-container flex flex-col-reverse md:flex-row justify-between">
                  <div
                    data-aos="fade-right"
                    // data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    className=""
                  >
                    <p className="mt-6 text-xl">
                      Rent Cabs, Tempo Travellers & Buses with best drivers
                    </p>
                    <h1 className="text-xl mt-4">Outstation</h1>
                    <h1 className="text-xl mt-4">Hourly Rental</h1>
                    <h1 className="text-xl mt-4">Airport Transfers</h1>

                    <Button
                      className="mt-6 py-6 px-14 text-center text-lg md:text-xl flex primary-bg items-center"
                      type="primary"
                    >
                      Buy Bus Tickets
                    </Button>
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
              </TabPanel>

              <TabPanel className="">
                <div className="md:absolute main-container flex flex-col-reverse md:flex-row justify-between">
                  <div
                    data-aos="fade-right"
                    // data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    className=""
                  >
                    <p className="md:mt-6 text-xl">
                      Book IRCTC Train Tickets on redRail simple & superfast{" "}
                      <br />
                      booking process with no service fee + no payment gateway
                      charge.
                    </p>
                    <h1 className="text-xl mt-4">Authorised IRCTC Partner</h1>
                    <h1 className="text-xl mt-4">
                      Instant refunds on UPI payments
                    </h1>
                    <h1 className="text-xl mt-4">
                      Hassle- free customer support
                    </h1>
                    <Button
                      className="mt-6 py-6 px-14 text-center text-lg md:text-xl flex primary-bg items-center"
                      type="primary"
                    >
                      Buy Train Tickets
                    </Button>
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
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className="w-full hidden md:block h-[628px] md:w-1/2 bg-[url('/aboutUsImg.svg')] bg-no-repeat bg-right"></div>
      </div>
    </div>
  );
};

export default OurExclusiveOffer;

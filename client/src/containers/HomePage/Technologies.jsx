import React from "react";
import { Image } from "antd";
import Slider from "react-slick";
import SectionTitle from "@/components/Shared/SectionTitle";

const Technologies = () => {
  const icons = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="main-container my-32 lg:my-36">
      <SectionTitle title="Technologies Used"></SectionTitle>
      <div>
        <ul className="container">
          <Slider {...settings}>
            {icons.map((icon, index) => (
              <div
                className="flex justify-center items-center rounded-xl cursor-auto"
                key={index}
              >
                <Image
                  src={icon}
                  alt={icon}
                  className="w-16 md:w-24 rounded-xl "
                  preview={false}
                />
              </div>
            ))}
          </Slider>
        </ul>
      </div>
    </div>
  );
};

export default Technologies;

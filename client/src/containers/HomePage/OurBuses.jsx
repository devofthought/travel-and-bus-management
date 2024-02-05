import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import SectionTitle from "@/components/Shared/SectionTitle";

const reviewData = [
  "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-7900-S-Charge-front45?size=1280,720&scl=1",
  "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-8900-front45?size=1280,720&scl=1",
  "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-7900-Electric-front45?size=1280,720&scl=1",
  "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-9700DD-front45?size=1280,720&scl=1",
];

const OurBuses = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="main-container my-28 lg:my-32">
      <SectionTitle title={"Our Top Buses"}></SectionTitle>
      <div className="mb-10 px-2 md:px-0">
        <Slider {...settings}>
          {reviewData.map((data, index) => (
            <div key={index} className="">
              <Image
                src={data}
                className="object-contain w-[80%] h-full mx-auto rounded-xl"
                height={380}
                width={700}
                alt="bus image"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OurBuses;

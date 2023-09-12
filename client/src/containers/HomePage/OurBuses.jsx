import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

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
    slidesToShow: 2,
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
    <div className="main-container py-10">
      <div className=" mb-6">
        <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl">
          Our Top Buses
        </h1>
        <div className="h-[2px] md:h-1 w-[160px] bg-[#d84e55] mx-auto mt-[10px] "></div>
      </div>
      <div className="mb-10 px-2 md:px-0">
        <Slider {...settings}>
          {reviewData.map((data, index) => (
            <div key={index} className="">
              <Image
                src={data}
                className="object-contain w-[80%] h-full mx-auto rounded-xl"
                height={700}
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

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate } from "antd";
import { BiSolidUserCircle } from "react-icons/bi";
import SectionTitle from "@/components/Shared/SectionTitle";

const reviewData = [
  {
    review:
      "I appreciated the company's commitment to passenger safety. They strictly adhered to safety protocols, ensuring a secure travel environment. This attention to safety added an extra layer of confidence for me!",
    name: "Terry Hang",
    designation: "Traveler",
    ratings: 5,
  },
  {
    review:
      "Dhruto Travel excelled in communication. Clear instructions were provided before and during the journey. Announcements were made promptly, keeping passengers informed about upcoming stops and any relevant information!",
    name: "Luci Jeny",
    designation: "Businessman",
    ratings: 3.5,
  },
  {
    review:
      "The bus provided a comfortable and clean environment. The seats were spacious, and the air conditioning was well-regulated. It was evident that the company prioritizes passenger comfort!",
    name: "Mick Lrsa",
    designation: "Singer",
    ratings: 4.5,
  },
  {
    review:
      "The ticket prices were reasonable, offering good value for the services provided. I found the cost to be competitive, especially considering the quality of the journey!",
    name: "Tom Herry",
    designation: "Designer",
    ratings: 5,
  },
  {
    review:
      "Dhruto Travel impressed me with their commitment to punctuality. The bus arrived on time, and the entire journey adhered to the schedule. This reliability made planning my trip much smoother!",
    name: "Samu Fika",
    designation: "Traveler",
    ratings: 4,
  },
];

const Review = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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
    <div className="main-container my-32 lg:my-36">
      <SectionTitle title={"What Our Client Say"}></SectionTitle>
      <div className="px-2 md:px-0">
        <Slider {...settings}>
          {reviewData.map((data, index) => (
            <div key={index}>
              <div className="shadow-xl my-10 md:mx-4 h-64 rounded-xl p-8">
                <p>{data?.review}</p>

                <Rate disabled allowHalf defaultValue={data?.ratings} />
                <div className="flex items-center mt-4">
                  <div>
                    <BiSolidUserCircle size={48}></BiSolidUserCircle>
                  </div>
                  <div className="ml-5">
                    <h3 className="font-medium text-black">{data?.name}</h3>
                    <h6 className="opacity-80 text-sm">{data?.designation}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Review;

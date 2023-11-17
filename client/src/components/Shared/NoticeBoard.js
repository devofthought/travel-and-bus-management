import Marquee from "react-fast-marquee";
const NoticeBoard = () => {
  return (
    <div className="bg-[#1b4965]">
      <Marquee speed={80}>
        <p className="text-xl text-white">
          Here, on bug/issue in the backend. Currently backend is under
          maintenance and this website is run on the local fake data. So, dynamically function is now available now.
        </p>
      </Marquee>
    </div>
  );
};

export default NoticeBoard;

import Marquee from "react-fast-marquee";
const NoticeBoard = () => {
  return (
    <div className="bg-[#1b4965]">
      <Marquee speed={80}>
        <p className="text-xl text-white">
          Here, on bug/issue in the backend. currently backend is under
          maintenance. Currently this website is run on the local fake data.
        </p>
      </Marquee>
    </div>
  );
};

export default NoticeBoard;

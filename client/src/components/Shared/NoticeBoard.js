import Marquee from "react-fast-marquee";
const NoticeBoard = () => {
  return (
    <div className="bg-[#1b4965]">
      <Marquee speed={80}>
        <p className="text-xl text-white">
          We're addressing a backend issue/bug, and the site is running on
          local/fake-data during maintenance. So, Some dynamic functions may be
          temporarily unavailable. Thank you.
        </p>
      </Marquee>
    </div>
  );
};

export default NoticeBoard;

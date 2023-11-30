import Image from "next/image";

const SeatType = ({ seat_name, seat_src }) => {

  return (
    <li className="flex flex-col lg:flex-row justify-between items-center gap-2">
      <span>
        <Image
          className="w-auto mx-auto md:mr-auto"
          src={seat_src}
          alt="logo"
          width={28}
          height={28}
        />
      </span>
      <span className="lg:ms-2 font-semibold text-gray-400">{seat_name}</span>
    </li>
  );
};
export default SeatType;

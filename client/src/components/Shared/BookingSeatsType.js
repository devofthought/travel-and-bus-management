import React from "react";
import SeatType from "../UI/Seat";

const seats = [
  { seat_name: "Available", seat_src: "/seats/available_seats.svg" },
  { seat_name: "Booked", seat_src: "/seats/booked_seats.svg" },
  { seat_name: "Selected", seat_src: "/seats/selected_seats.svg" },
  { seat_name: "Sold", seat_src: "/seats/sold_seats.svg" },
];

const BookingSeatsType = () => {
  return (
    <ul className="flex flex-wrap justify-around items-center gap-2 text-xs">
      {seats?.map((seat, index) => (
        <SeatType
          key={index}
          seat_name={seat.seat_name}
          seat_src={seat.seat_src}
        />
      ))}
    </ul>
  );
};

export default BookingSeatsType;

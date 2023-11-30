import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import Button from "@/components/UI/Button";
import Banner from "@/containers/Banner";
import React, { useEffect, useState } from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { useRouter } from "next/router";
import {
  useGetBusSeatStatusMutation,
  useGetTripsByUsersMutation,
} from "@/redux/trip/tripApi";
import { todayChecker } from "@/utils/helper";
import dayjs from "dayjs";
import { useGetMyProfileQuery } from "@/redux/user/userApi";

const Trip = () => {
  const router = useRouter();
  const from = router.query.from;
  const to = router.query.to;
  const date = router.query.date;

  const [selectedBusId, setSelectedBusId] = useState("");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });
  console.log(getMyProfile);

  /*  */
  const [
    GetBusSeatStatus,
    {
      data: seatStatus,
      error: seatStatusError,
      isLoading: seatStatusIsLoading,
    },
  ] = useGetBusSeatStatusMutation();

  const handleSelectBus = (id) => {
    GetBusSeatStatus({ trip_id: id });
    setSelectedBusId(id);
  };

  const getAllTrip = [
    {
      id: "BUS123",
      bus_id: "BUS123",
      bus_model: "Volvo B7R",
      driver_id: "DRV456",
      traveling_date: "2023-09-15",
      departure_time: "08:00 AM",
      arrival_time: "03:30 PM",
      from: "City A",
      to: "City B",
      fare: 1500,
      seat_type: "AC",
      available_seat: 10,
      total_seat: 40,
    },
    {
      id: "BUS456",
      bus_id: "BUS456",
      bus_model: "Scania K360",
      driver_id: "DRV789",
      traveling_date: "2023-09-16",
      departure_time: "10:30 AM",
      arrival_time: "06:00 PM",
      from: "City B",
      to: "City C",
      fare: 1200,
      seat_type: "AC",
      available_seat: 20,
      total_seat: 50,
    },
    {
      id: "BUS789",
      bus_id: "BUS789",
      bus_model: "Mercedes-Benz Tourismo",
      driver_id: "DRV123",
      traveling_date: "2023-09-17",
      departure_time: "09:00 AM",
      arrival_time: "05:30 PM",
      from: "City C",
      to: "City D",
      fare: 1800,
      seat_type: "nonAC",
      available_seat: 5,
      total_seat: 35,
    },
    {
      id: "BUS234",
      bus_id: "BUS234",
      bus_model: "MAN Lion's Coach",
      driver_id: "DRV234",
      traveling_date: "2023-09-18",
      departure_time: "07:30 AM",
      arrival_time: "04:00 PM",
      from: "City D",
      to: "City A",
      fare: 1350,
      seat_type: "AC",
      available_seat: 15,
      total_seat: 45,
    },
    {
      id: "BUS567",
      bus_id: "BUS567",
      bus_model: "Iveco Crossway",
      driver_id: "DRV567",
      traveling_date: "2023-09-21",
      departure_time: "11:00 AM",
      arrival_time: "07:30 PM",
      from: "City B",
      to: "City D",
      fare: 1100,
      seat_type: "nonAC",
      available_seat: 25,
      total_seat: 30,
    },
    {
      id: "BUS890",
      bus_id: "BUS890",
      bus_model: "Neoplan Skyliner",
      driver_id: "DRV890",
      traveling_date: "2023-09-21",
      departure_time: "08:45 AM",
      arrival_time: "06:15 PM",
      from: "City A",
      to: "City C",
      fare: 1600,
      seat_type: "AC",
      available_seat: 8,
      total_seat: 50,
    },
    {
      id: "BUS345",
      bus_id: "BUS345",
      bus_model: "Setra S431 DT",
      driver_id: "DRV345",
      traveling_date: "2023-09-21",
      departure_time: "09:15 AM",
      arrival_time: "05:45 PM",
      from: "City D",
      to: "City B",
      fare: 1250,
      seat_type: "AC",
      available_seat: 30,
      total_seat: 40,
    },
  ];

  const getSingleTrip = {
    id: "BUS123",
    bus_id: "BUS123",
    bus_model: "Volvo B7R",
    driver_id: "DRV456",
    traveling_date: "2023-09-15",
    departure_time: "08:00 AM",
    arrival_time: "03:30 PM",
    from: "City A",
    to: "City B",
    fare: 1500,
    seat_type: "AC",
    available_seat: 10,
    total_seat: 40,
    seats: [
      { name: "A1", isAvailable: true },
      { name: "A2", isAvailable: true },
      { name: "A" },
      { name: "A3", isAvailable: true },
      { name: "A4", isAvailable: true },
      { name: "B1", isAvailable: false },
      { name: "B2", isAvailable: true },
      { name: "B" },
      { name: "B3", isAvailable: true },
      { name: "B4", isAvailable: true },
      { name: "C1", isAvailable: true },
      { name: "C2", isAvailable: true },
      { name: "C" },
      { name: "C3", isAvailable: false },
      { name: "C4", isAvailable: false },
      { name: "D1", isAvailable: false },
      { name: "D2", isAvailable: false },
      { name: "D" },
      { name: "D3", isAvailable: true },
      { name: "D4", isAvailable: true },
      { name: "E1", isAvailable: false },
      { name: "E2", isAvailable: false },
      { name: "E" },
      { name: "E3", isAvailable: true },
      { name: "E4", isAvailable: true },
      { name: "F1", isAvailable: true },
      { name: "F2", isAvailable: true },
      { name: "F" },
      { name: "F3", isAvailable: true },
      { name: "F4", isAvailable: true },
      { name: "G1", isAvailable: true },
      { name: "G2", isAvailable: true },
      { name: "G" },
      { name: "G3", isAvailable: true },
      { name: "G4", isAvailable: true },
      { name: "H1", isAvailable: true },
      { name: "H2", isAvailable: true },
      { name: "H" },
      { name: "H3", isAvailable: true },
      { name: "H4", isAvailable: true },
      { name: "I1", isAvailable: true },
      { name: "I2", isAvailable: true },
      { name: "I" },
      { name: "I3", isAvailable: true },
      { name: "I4", isAvailable: true },
      { name: "J1", isAvailable: true },
      { name: "J2", isAvailable: true },
      { name: "J" },
      { name: "J3", isAvailable: true },
      { name: "J4", isAvailable: true },
    ],
    reviews: [
      { rating: 4.5, review: "" },
      { rating: 4.7, review: "" },
    ],
  };

  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSelectSeat = (seat) => {
    if (selectedSeats?.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    }
    if (!selectedSeats?.includes(seat) && selectedSeats?.length < 4) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // const filterTripData = getAllTrip?.filter(
  //   (trip, index) =>
  //     trip?.from.toLocaleLowerCase().includes(from?.toLocaleLowerCase()) &&
  //     trip?.to.toLocaleLowerCase().includes(to?.toLocaleLowerCase()) &&
  //     trip?.traveling_date === date
  // );

  /* get all the trip for server */
  const [
    getTripSearchByUser,
    {
      data: availableTrip,
      error: availableTripError,
      isLoading: availableTripIsLoading,
    },
  ] = useGetTripsByUsersMutation();

  useEffect(() => {
    getTripSearchByUser({
      departure_time: todayChecker(date),
      from: from,
      to: to,
    });
  }, [date, to, from]);

  const handlePaymentPageMove = (e) => {
    e.preventDefault();
    router.push("/payment");
  };

  return (
    <div className=" bg-gray-100">
      <Navbar />
      <Banner />

      {availableTrip?.data?.length > 0 ? (
        availableTrip?.data?.map((trip, index) => (
          <div
            className="main-container border border-[#5b2192] rounded-md"
            style={{
              marginTop: "20px",
            }}
          >
            <div className="bg-white rounded-md">
              <ul className="flex items-center justify-between px-4 py-2 rounded-md">
                <li className="w-[50%] md:w-[30%] lg:w-[25%] pr-7 border-t-0 border-l-0 border-b-0 border-r border-dashed">
                  <div>
                    <div className="search_bus-name__AN5TP">
                      <h6 className="text-sm md:text-lg lg:text-xl text-[#5b2192] font-semibold uppercase">
                        {trip?.bus_id?.brand_name}&nbsp;
                        {trip?.bus_id?.model}
                      </h6>
                      <p className="flex gap-1">
                        <span className="hidden lg:inline-flex">
                          {trip?.bus_id?.bus_code}
                        </span>{" "}
                        <span className="text-xs sm:text-sm md:text-md">
                          Non AC{/* {trip?.bus_id?.seat_type} */}
                        </span>
                      </p>
                    </div>
                    <div className="my-2 text-sm text-gray-500 flex flex-wrap md:block md:gap-0">
                      <p className="flex flex-col sm:flex-row gap-1">
                        <span className="hidden md:inline-block">
                          Starting Point:
                        </span>{" "}
                        <span className="text-[#5b2192] capitalize">
                          {trip?.route_id?.from}
                        </span>
                      </p>
                      <span className="inline-flex md:hidden px-1">to</span>
                      <p className="flex flex-col sm:flex-row gap-1">
                        <span className="hidden md:inline-block">
                          End Point:
                        </span>{" "}
                        <span className="text-[#5b2192] capitalize">
                          {trip?.route_id?.to}{" "}
                        </span>
                      </p>
                    </div>
                    <div className="flex lg:hidden gap-2">
                      <h6 className="uppercase text-xs lg:text-sm text-gray-500 font-semibold">
                        Seats Available
                      </h6>
                      <p className="text-[#5b2192] text-xs lg:text-sm">
                        {trip?.seats_available}
                      </p>
                    </div>
                    <div className="flex md:hidden gap-2 mt-4">
                      <p className="text-[#5b2192] font-semibold">
                        {/* {trip?.departure_time} */}
                        <span className="block">
                          {dayjs(trip?.departure_time).format("hh:mm A")}
                        </span>
                      </p>
                      <p className="text-[#5b2192] font-semibold">
                        {/* {trip?.arrival_time} */}

                        <span className="block">
                          {dayjs(trip?.arrival_time).format("hh:mm A")}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
                <li className="w-[20%] lg:w-[15%] p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden md:block">
                  <div className="search_item-content__ydL0p">
                    <h6 className="uppercase text-sm text-gray-500 font-semibold">
                      Departure time
                    </h6>
                    <p className="text-[#5b2192] font-semibold">
                      {/* {trip?.departure_time} */}
                      <span className="block">
                        {dayjs(trip?.departure_time).format("YYYY-MM-DD")}
                      </span>
                      <span className="block">
                        {dayjs(trip?.departure_time).format("hh:mm A")}
                      </span>
                    </p>
                  </div>
                </li>
                <li className="w-[20%] lg:w-[15%] p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden md:block">
                  <div className="search_item-content__ydL0p">
                    <h6 className="uppercase text-sm text-gray-500 font-semibold">
                      Arrival time
                    </h6>
                    <p className="text-[#5b2192] font-semibold">
                      {/* {trip?.arrival_time} */}
                      <span className="block">
                        {dayjs(trip?.arrival_time).format("YYYY-MM-DD")}
                      </span>
                      <span className="block">
                        {dayjs(trip?.arrival_time).format("hh:mm A")}
                      </span>
                    </p>
                  </div>
                </li>
                <li className="w-[15%] p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden lg:block">
                  <div className="search_item-content__ydL0p">
                    <h6 className="uppercase text-sm text-gray-500 font-semibold">
                      Seats Available
                    </h6>
                    <p className="text-[#5b2192] font-semibold">
                      {" "}
                      {trip?.seats_available}
                    </p>
                  </div>
                </li>
                <li className="flex-1 p- text-right justify-end">
                  <h3 className="text-lg md:text-xl lg-text-2xl font-semibold text-[#5b2192] mb-2">
                    ৳{trip?.ticket_price}
                  </h3>
                  <div
                    className="flex justify-end"
                    onClick={() => handleSelectBus(trip?.id)}
                  >
                    <Button
                      styles={`w-32 px-2 py-[2px] md:px-3 md:py-1 font-semibold border-2 rounded-md primary-bg text-white`}
                      textStyle={`btn-text px-2`}
                      btnName="View Seats"
                    />
                  </div>
                  <a className="text-xs italic">Cancellation Policy</a>
                </li>
              </ul>
              <div></div>
              {selectedBusId === trip?.id && (
                <div className="border-l-0 border-r-0 border-b-0 border-t border-dashed border-[90%] mt-6 pt-6">
                  <ul className="flex flex-wrap justify-around items-center gap-2 text-xs">
                    <li className="flex flex-col lg:flex-row justify-between items-center gap-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 100 100"
                        >
                          <rect
                            x="10"
                            y="10"
                            width="80"
                            height="80"
                            rx="3"
                            ry="3"
                            fill="#fff"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="4"
                            y="76"
                            width="93"
                            height="20"
                            rx="5"
                            ry="5"
                            fill="#fff"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="2"
                            y="30"
                            width="16"
                            height="65"
                            rx="5"
                            ry="5"
                            fill="#fff"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="83"
                            y="30"
                            width="16"
                            height="65"
                            rx="5"
                            ry="5"
                            fill="#fff"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </svg>
                      </span>
                      <span className="lg:ms-2 font-semibold text-gray-400">
                        Available
                      </span>
                    </li>
                    <li className="flex flex-col lg:flex-row justify-between items-center gap-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 100 100"
                        >
                          <rect
                            x="10"
                            y="10"
                            width="80"
                            height="80"
                            rx="3"
                            ry="3"
                            fill="#97a5c2"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="4"
                            y="76"
                            width="93"
                            height="20"
                            rx="5"
                            ry="5"
                            fill="#97a5c2"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="2"
                            y="30"
                            width="16"
                            height="65"
                            rx="5"
                            ry="5"
                            fill="#97a5c2"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="83"
                            y="30"
                            width="16"
                            height="65"
                            rx="5"
                            ry="5"
                            fill="#97a5c2"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </svg>
                      </span>
                      <span className="lg:ms-2 font-semibold text-[#97a5c2]">
                        Booked
                      </span>
                    </li>
                    <li className="flex flex-col lg:flex-row justify-between items-center gap-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 100 100"
                        >
                          <rect
                            x="10"
                            y="10"
                            width="80"
                            height="80"
                            rx="3"
                            ry="3"
                            fill="#22C55E"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="4"
                            y="76"
                            width="93"
                            height="20"
                            rx="5"
                            ry="5"
                            fill="#22C55E"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="2"
                            y="30"
                            width="16"
                            height="65"
                            rx="5"
                            ry="5"
                            fill="#22C55E"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="83"
                            y="30"
                            width="16"
                            height="65"
                            rx="5"
                            ry="5"
                            fill="#22C55E"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </svg>
                      </span>
                      <span className="lg:ms-2 font-semibold text-[#22C55E]">
                        Selected
                      </span>
                    </li>
                    <li className="flex flex-col lg:flex-row justify-between items-center gap-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 100 100"
                        >
                          <rect
                            x="10"
                            y="10"
                            width="80"
                            height="80"
                            rx="3"
                            ry="3"
                            fill="#ff9090"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="4"
                            y="76"
                            width="93"
                            height="20"
                            rx="5"
                            ry="5"
                            fill="#ff9090"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="2"
                            y="30"
                            width="16"
                            height="65"
                            rx="5"
                            ry="5"
                            fill="#ff9090"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <rect
                            x="83"
                            y="30"
                            width="16"
                            height="65"
                            rx="5"
                            ry="5"
                            fill="#ff9090"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </svg>
                      </span>
                      <span className="lg:ms-2 font-semibold text-[#ff9090]">
                        Sold
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-col md:flex-row sm:p-4 mt-4 mx-0 sm:mx-20">
                    <div
                      className="rounded-sm p-2 w-[240px] h-[434px] mx-auto"
                      style={{ border: "1px solid lightgray" }}
                    >
                      <div className="flex justify-end p-2 border-b border-[90%] mb-4">
                        <GiSteeringWheel className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="w-full grid grid-cols-5 gap-2">
                        {getSingleTrip?.seats?.map((seat, index) => {
                          if (
                            seat?.name === "A" ||
                            seat?.name === "B" ||
                            seat?.name === "C" ||
                            seat?.name === "D" ||
                            seat?.name === "E" ||
                            seat?.name === "F" ||
                            seat?.name === "G" ||
                            seat?.name === "H" ||
                            seat?.name === "I" ||
                            seat?.name === "J"
                          ) {
                            return <span key={index}></span>;
                          } else {
                            return (
                              <button
                                key={index}
                                className={`flex items-center justify-center border-none bg-white ${
                                  seat?.isAvailable === false
                                    ? "cursor-not-allowed"
                                    : ` ${
                                        !!seatStatus?.data?.find(
                                          (s) => s?.booking_seat === seat?.name
                                        )
                                          ? "cursor-not-allowed"
                                          : "cursor-pointer rounded-lg"
                                      }`
                                }`}
                                disabled={
                                  (!!seatStatus?.data?.find(
                                    (s) => s?.booking_seat === seat?.name
                                  )
                                    ? true
                                    : false) ||
                                  (seat?.isAvailable === false && true)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="28"
                                  height="28"
                                  viewBox="0 0 100 100"
                                  onClick={() => handleSelectSeat(seat?.name)}
                                  className={`${
                                    seat?.isAvailable
                                      ? `${
                                          selectedSeats[0] === seat?.name ||
                                          selectedSeats[1] === seat?.name ||
                                          selectedSeats[2] === seat?.name ||
                                          selectedSeats[3] === seat?.name
                                            ? "text-[#9cd27c]"
                                            : "text-gray-400"
                                        }`
                                      : "text-[#ff9090]"
                                  }`}
                                >
                                  <rect
                                    x="10"
                                    y="10"
                                    width="80"
                                    height="80"
                                    rx="3"
                                    ry="3"
                                    fill={`${
                                      seat?.isAvailable
                                        ? `${
                                            selectedSeats[0] === seat?.name ||
                                            selectedSeats[1] === seat?.name ||
                                            selectedSeats[2] === seat?.name ||
                                            selectedSeats[3] === seat?.name
                                              ? "#22C55E"
                                              : ` ${
                                                  !!seatStatus?.data?.find(
                                                    (s) =>
                                                      s?.booking_seat ===
                                                      seat?.name
                                                  )
                                                    ? "#97a5c2"
                                                    : "#fff"
                                                }`
                                          }`
                                        : "#ff9090"
                                    }`}
                                    stroke="#000"
                                    stroke-width="1"
                                  />
                                  <rect
                                    x="4"
                                    y="76"
                                    width="93"
                                    height="20"
                                    rx="5"
                                    ry="5"
                                    fill={`${
                                      seat?.isAvailable
                                        ? `${
                                            selectedSeats[0] === seat?.name ||
                                            selectedSeats[1] === seat?.name ||
                                            selectedSeats[2] === seat?.name ||
                                            selectedSeats[3] === seat?.name
                                              ? "#22C55E"
                                              : ` ${
                                                  !!seatStatus?.data?.find(
                                                    (s) =>
                                                      s?.booking_seat ===
                                                      seat?.name
                                                  )
                                                    ? "#97a5c2"
                                                    : "#fff"
                                                }`
                                          }`
                                        : "#ff9090"
                                    }`}
                                    stroke="#000"
                                    stroke-width="1"
                                  />
                                  <rect
                                    x="2"
                                    y="30"
                                    width="16"
                                    height="65"
                                    rx="5"
                                    ry="5"
                                    fill={`${
                                      seat?.isAvailable
                                        ? `${
                                            selectedSeats[0] === seat?.name ||
                                            selectedSeats[1] === seat?.name ||
                                            selectedSeats[2] === seat?.name ||
                                            selectedSeats[3] === seat?.name
                                              ? "#22C55E"
                                              : ` ${
                                                  !!seatStatus?.data?.find(
                                                    (s) =>
                                                      s?.booking_seat ===
                                                      seat?.name
                                                  )
                                                    ? "#97a5c2"
                                                    : "#fff"
                                                }`
                                          }`
                                        : "#ff9090"
                                    }`}
                                    stroke="#000"
                                    stroke-width="1"
                                  />
                                  <rect
                                    x="83"
                                    y="30"
                                    width="16"
                                    height="65"
                                    rx="5"
                                    ry="5"
                                    fill={`${
                                      seat?.isAvailable
                                        ? `${
                                            selectedSeats[0] === seat?.name ||
                                            selectedSeats[1] === seat?.name ||
                                            selectedSeats[2] === seat?.name ||
                                            selectedSeats[3] === seat?.name
                                              ? "#22C55E"
                                              : ` ${
                                                  !!seatStatus?.data?.find(
                                                    (s) =>
                                                      s?.booking_seat ===
                                                      seat?.name
                                                  )
                                                    ? "#97a5c2"
                                                    : "#fff"
                                                }`
                                          }`
                                        : "#ff9090"
                                    }`}
                                    stroke="#000"
                                    stroke-width="1"
                                  />
                                </svg>
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <div className="flex-1 mt-10 sm:mt-0 sm:p-4">
                      <h4 className="text-[#5b2192] text-2xl font-semibold text-center">
                        SEAT INFORMATION:
                      </h4>
                      <table className="w-10/12 lg:w-1/2 mx-auto mt-5">
                        <thead className="bg-gray-100">
                          <tr className="text-gray-600 border-b-4">
                            <th align="left" className="px-2 py-1">
                              Seats
                            </th>
                            <th
                              className="d-none d-sm-table-cell px-2 py-1"
                              align="left"
                            >
                              Class
                            </th>
                            <th align="left" className="px-2 py-1">
                              Fare
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedSeats?.map((seat, index) => (
                            <tr key={index}>
                              <td className="py-2">{seat}</td>
                              <td className="d-none d-sm-table-cell py-2">
                                E-Class
                              </td>
                              <td className="py-2">৳ {trip?.ticket_price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>
                        <h4 className="text-center mt-4 text-lg font-semibold ">
                          Total: ৳ {selectedSeats?.length * trip?.ticket_price}
                        </h4>
                      </div>
                      <div className="border rounded-lg mt-10 w-10/12 lg:w-1/2 mx-auto">
                        <form
                          onSubmit={(e) => handlePaymentPageMove(e)}
                          className="flex flex-col gap-4"
                        >
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="border border-gray-400 w-full rounded-md px-2 h-10"
                          />
                          <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="border border-gray-400 w-full rounded-md px-2 h-10"
                            required={true}
                          />
                          <Button
                            styles={`w-full px-2 md:px-3 py-2 font-semibold border-2 rounded-lg primary-bg text-white`}
                            textStyle={`btn-text px-2`}
                            btnName="Proceed to pay"
                            required={true}
                            type="submit"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="min-h-[200px]">
          <p className="text-3xl text-center m-auto  rounded-3xl w-fit p-5 bg-red-400 text-white">
            No trip found on that day
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Trip;

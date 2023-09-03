import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import Button from "@/components/UI/Button";
import Banner from "@/containers/Banner";
import React, { useState } from "react";
import { MdChair } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { useRouter } from "next/router";

const Trip = () => {
  const router = useRouter();
  const from = router.query.from;
  const to = router.query.to;
  const date = router.query.date;

  const [selectedBusId, setSelectedBusId] = useState("");

  const handleSelectBus = (id) => {
    setSelectedBusId(id);
    console.log(id);
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

  const filterTripData = getAllTrip?.filter(
    (trip, index) =>
      trip?.from.toLocaleLowerCase().includes(from?.toLocaleLowerCase()) &&
      trip?.to.toLocaleLowerCase().includes(to?.toLocaleLowerCase()) &&
      trip?.traveling_date === date
  );
  console.log(selectedBusId);
  console.log(filterTripData);

  return (
    <div className=" bg-gray-100">
      <Navbar />
      <Banner />

      {filterTripData &&
        filterTripData?.length > 0 &&
        filterTripData?.map((trip, index) => (
          <div
            className="main-container border border-[#5b2192] rounded-md"
            style={{
              marginTop: "50px",
            }}
          >
            <div className="bg-white rounded-md">
              <ul className="flex items-center justify-between p-4 rounded-md">
                <li className="w-[50%] md:w-[30%] lg:w-[25%] pr-7 border-t-0 border-l-0 border-b-0 border-r border-dashed">
                  <div>
                    <div className="search_bus-name__AN5TP">
                      <h6 className="text-md md:text-lg lg:text-xl text-[#5b2192] font-semibold uppercase">
                        {trip?.bus_model}
                      </h6>
                      <p className="flex gap-1">
                        <span className="hidden lg:inline-flex">
                          {trip?.bus_id}
                        </span>{" "}
                        <span className="text-xs sm:text-sm md:text-md">
                          {trip?.seat_type}
                        </span>
                      </p>
                    </div>
                    <div className="my-2 text-sm text-gray-500 flex flex-wrap md:block md:gap-0">
                      <p className="flex flex-col sm:flex-row gap-1">
                        <span className="hidden md:inline-block">
                          Starting Point:
                        </span>{" "}
                        <span className="text-[#5b2192]">{trip?.from}</span>
                      </p>
                      <span className="inline-flex md:hidden px-1">to</span>
                      <p className="flex flex-col sm:flex-row gap-1">
                        <span className="hidden md:inline-block">
                          End Point:
                        </span>{" "}
                        <span className="text-[#5b2192]">{trip?.to} </span>
                      </p>
                    </div>
                    <div className="flex lg:hidden gap-2">
                      <h6 className="uppercase text-xs lg:text-sm text-gray-500 font-semibold">
                        Seats Available
                      </h6>
                      <p className="text-[#5b2192] text-xs lg:text-sm">
                        {trip?.available_seat}
                      </p>
                    </div>
                    <div className="flex md:hidden gap-2">
                      <p className="text-xs text-[#5b2192] font-semibold">
                        {trip?.departure_time} -{" "}
                      </p>
                      <p className="text-xs text-[#5b2192] font-semibold">
                        {trip?.arrival_time}
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
                      {trip?.departure_time}
                    </p>
                  </div>
                </li>
                <li className="w-[20%] lg:w-[15%] p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden md:block">
                  <div className="search_item-content__ydL0p">
                    <h6 className="uppercase text-sm text-gray-500 font-semibold">
                      Arrival time
                    </h6>
                    <p className="text-[#5b2192] font-semibold">
                      {trip?.arrival_time}
                    </p>
                  </div>
                </li>
                <li className="w-[15%] p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden lg:block">
                  <div className="search_item-content__ydL0p">
                    <h6 className="uppercase text-sm text-gray-500 font-semibold">
                      Seats Available
                    </h6>
                    <p>{trip?.available_seat}</p>
                  </div>
                </li>
                <li className="flex-1 p-7 text-right justify-end">
                  <h3 className="text-lg md:text-xl lg-text-2xl font-semibold text-[#5b2192] mb-2">
                    ৳{trip?.fare}
                  </h3>
                  <div
                    className="flex justify-end"
                    onClick={() => handleSelectBus(trip?.id)}
                  >
                    <Button
                      styles={`w-32 px-2 py-[2px] md:px-3 md:py-1 font-semibold border-2 rounded-lg primary-bg text-white`}
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
                        <MdChair className="w-8 h-8 text-[#686666]" />
                      </span>
                      <span className="ms-2 font-semibold text-[#686666]">
                        Blocked
                      </span>
                    </li>
                    <li className="flex flex-col lg:flex-row justify-between items-center gap-2">
                      <span>
                        <MdChair className="w-8 h-8 text-gray-400" />
                      </span>
                      <span className="ms-2 font-semibold text-gray-400">
                        Available
                      </span>
                    </li>
                    <li className="flex flex-col lg:flex-row justify-between items-center gap-2">
                      <span>
                        <MdChair className="w-8 h-8 text-[#9cd27c]" />
                      </span>
                      <span className="ms-2 font-semibold text-[#9cd27c]">
                        Selected
                      </span>
                    </li>
                    <li className="flex flex-col lg:flex-row justify-between items-center gap-2">
                      <span>
                        <MdChair className="w-8 h-8 text-[#ff9090]" />
                      </span>
                      <span className="ms-2 font-semibold text-[#ff9090]">
                        Sold
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-col md:flex-row p-4 mt-4">
                    <div
                      className="rounded-sm p-2 w-[280px] sm:w-[300px] md:w-[320px] mx-auto"
                      style={{ border: "1px solid lightgray" }}
                    >
                      <div className="flex justify-end p-4 border-b border-[90%] mb-4">
                        <GiSteeringWheel className="w-10 h-10 text-gray-400" />
                      </div>
                      <div className="w-full grid grid-cols-4 gap-2">
                        <span></span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span></span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>

                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span></span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                        <span className="flex justify-center items-center">
                          <MdChair className="w-10 h-10 mx-auto text-gray-400 cursor-pointer" />
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <h4 className="text-[#5b2192] text-2xl font-semibold text-center">
                        SEAT INFORMATION:
                      </h4>
                      <table class="w-10/12 lg:w-1/2 mx-auto mt-5">
                        <thead className="bg-gray-100">
                          <tr className="text-gray-600 border-b-4">
                            <th align="left" className="px-2 py-1">
                              Seats
                            </th>
                            <th
                              class="d-none d-sm-table-cell px-2 py-1"
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
                          <tr>
                            <td className="py-2">B-3</td>
                            <td class="d-none d-sm-table-cell py-2">E-Class</td>
                            <td className="py-2">৳ 680.00</td>
                          </tr>
                          <tr>
                            <td className="py-2">B-2</td>
                            <td class="d-none d-sm-table-cell py-2">E-Class</td>
                            <td className="py-2">৳ 680.00</td>
                          </tr>
                        </tbody>
                      </table>
                      <div>
                        <h4 className="text-center mt-4 text-lg font-semibold ">
                          Total: ৳ 1360.00
                        </h4>
                      </div>
                      <div className="border p-4 rounded-lg mt-10 w-full md:w-10/12 mx-auto">
                        <form className="flex flex-col gap-4">
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
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      <Footer />
    </div>
  );
};

export default Trip;

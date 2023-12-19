import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import Button from "@/components/UI/Button";
// import Banner from "@/containers/Banner";
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
import { getSingleTrip } from "@/data/tripSearchResult";
import BookingSeatsType from "@/components/Shared/BookingSeatsType";
import { IoSearchOutline, IoWarning } from "react-icons/io5";
import Loader from "@/components/UI/Loader";
import TripBanner from "@/components/Shared/TripBanner";
import duration from "dayjs/plugin/duration";
import { useInsertBookingMutation } from "@/redux/booking/bookingApi";
import Tooltip from "@/components/UI/Tooltip";
import TripStatusDetails from "./tripStatusDetails";
import { notification } from "antd";
dayjs.extend(duration);

const Trip = () => {
  const router = useRouter();
  const from = router.query.from;
  const to = router.query.to;
  const date = router.query.date;
  const [api, contextHolder] = notification.useNotification();
  const [bookingErrorShow, setBookingErrorShow] = useState(null);

  const [selectedBusId, setSelectedBusId] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });
  // console.log(getMyProfile?.data);

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
    setSelectedSeats([]);
    setBookingErrorShow(null);
  };

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

  const [
    insertBooking,
    {
      data: bookingReqResponse,
      error: bookingReqError,
      isLoading: bookingReqLoading,
      isSuccess: insertBookingIsSuccess,
    },
  ] = useInsertBookingMutation();

  const handleSubmitBooking = (e, tripId) => {
    e.preventDefault();
    const body = {
      user_id: {
        name: getMyProfile?.data?.traveler_id?.name
          ? getMyProfile?.data?.traveler_id?.name
          : e.target.name.value,
        email: getMyProfile?.data?.email
          ? getMyProfile?.data?.email
          : e.target.email.value,
      },
      trip_id: tripId,
      booking_seat: selectedSeats,
    };
    insertBooking(body);
  };

  useEffect(() => {
    getTripSearchByUser({
      departure_time: todayChecker(date),
      from: from,
      to: to,
    });
  }, [date, to, from]);

  useEffect(() => {
    // console.log(bookingReqResponse, bookingReqError);
    if (bookingReqResponse?.statusCode === 201) {
      api.success({
        message: `${bookingReqResponse?.message}`,
        description: (
          <div>
            you have 5 min for complete payment other wise booking will be
            cancel
          </div>
        ),
        placement: "bottomLeft",
      });

      //** redirect to the payment page
      const timer = setTimeout(() => {
        router.push("/payment");
      }, 3000);
      return () => clearTimeout(timer);
    } else if (
      bookingReqError?.status === 400 ||
      bookingReqError?.status === 404 ||
      bookingReqError?.status === 406
    ) {
      setBookingErrorShow({
        status: true,
        message: bookingReqError?.data?.message,
      });
      api.error({
        message: `${bookingReqError?.data?.message}`,
        description: (
          <div>One user can book maximum 4 seats in a single trip</div>
        ),
        placement: "bottomLeft",
      });
    }
  }, [bookingReqResponse, bookingReqError]);

  return (
    <div className=" bg-gray-100">
      {contextHolder}
      <Navbar />
      <TripBanner />
      {availableTripIsLoading ? (
        <Loader />
      ) : availableTrip?.data?.length > 0 ? (
        availableTrip?.data?.map((trip, index) => (
          <div
            className="main-container border border-[#5b2192] rounded-md"
            style={{
              marginTop: "20px",
            }}
          >
            <div className="bg-white rounded-md">
              <TripStatusDetails
                trip={trip}
                selectedBusId={selectedBusId}
                handleSelectBus={handleSelectBus}
              />
              {selectedBusId === trip?.id && (
                <div className="border-l-0 border-r-0 border-b-0 border-t border-dashed border-[90%] mt-6 pt-6">
                  <BookingSeatsType />
                  <div className="flex flex-col md:flex-row py-4 lg:pl-[12%] mt-4 mx-0 sm:mx-20">
                    <div>
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
                                <Tooltip title={seat?.name}>
                                  <button
                                    key={index}
                                    className={`flex items-center justify-center border-none bg-white ${
                                      seat?.isAvailable === false
                                        ? "cursor-not-allowed"
                                        : ` ${
                                            !!seatStatus?.data?.find(
                                              (s) =>
                                                s?.booking_seat === seat?.name
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
                                      onClick={() =>
                                        handleSelectSeat(seat?.name)
                                      }
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
                                                  ? !!seatStatus?.data?.find(
                                                      (s) =>
                                                        s?.booking_seat ===
                                                          seat?.name &&
                                                        s?.status ===
                                                          "completed"
                                                    )
                                                    ? "#ff9090"
                                                    : "#97a5c2"
                                                  : "#fff"
                                              }`
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
                                                  ? !!seatStatus?.data?.find(
                                                      (s) =>
                                                        s?.booking_seat ===
                                                          seat?.name &&
                                                        s?.status ===
                                                          "completed"
                                                    )
                                                    ? "#ff9090"
                                                    : "#97a5c2"
                                                  : "#fff"
                                              }`
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
                                                  ? !!seatStatus?.data?.find(
                                                      (s) =>
                                                        s?.booking_seat ===
                                                          seat?.name &&
                                                        s?.status ===
                                                          "completed"
                                                    )
                                                    ? "#ff9090"
                                                    : "#97a5c2"
                                                  : "#fff"
                                              }`
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
                                                  ? !!seatStatus?.data?.find(
                                                      (s) =>
                                                        s?.booking_seat ===
                                                          seat?.name &&
                                                        s?.status ===
                                                          "completed"
                                                    )
                                                    ? "#ff9090"
                                                    : "#97a5c2"
                                                  : "#fff"
                                              }`
                                        }`}
                                        stroke="#000"
                                        stroke-width="1"
                                      />
                                    </svg>
                                  </button>
                                </Tooltip>
                              );
                            }
                          })}
                        </div>
                      </div>
                      {selectedSeats?.length >= 4 && (
                        <div
                          className="w-[240px] text-red-500 mx-auto border border-red-300 rounded-sm p-2 mt-4 flex items-center gap-2"
                          style={{ border: "1px solid" }}
                        >
                          <IoWarning />
                          <p className="text-xs">
                            Maximum 4 seats can be booked.
                          </p>
                        </div>
                      )}
                      {bookingErrorShow?.status === true && (
                        <div
                          className="w-[240px] text-red-500 mx-auto border border-red-300 rounded-sm p-2 mt-4 flex items-center gap-2"
                          style={{ border: "1px solid" }}
                        >
                          <IoWarning />
                          <p className="text-xs capitalize">
                            {bookingErrorShow?.message}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 mt-10 md:mt-0 sm:px-4 sm:pb-4">
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
                      <div className="w-10/12 lg:w-1/2 mx-auto mt-5">
                        <h4 className="text-right mt-4 text-lg font-semibold ">
                          Total: ৳ {selectedSeats?.length * trip?.ticket_price}
                        </h4>
                      </div>
                      <div className="border rounded-lg mt-10 w-10/12 lg:w-1/2 mx-auto">
                        <form
                          onSubmit={(e) => {
                            handleSubmitBooking(e, trip?.id);
                          }}
                          className="flex flex-col gap-4"
                        >
                          {!!getMyProfile?.data?.email || (
                            <>
                              <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="border border-gray-400 w-full rounded-md px-2 h-10"
                              />
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="border border-gray-400 w-full rounded-md px-2 h-10"
                                required={true}
                              />
                            </>
                          )}
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
        <div className="min-h-[30vh]  flex justify-center items-center">
          <div>
            <div className="flex justify-center items-center">
              <IoSearchOutline size={72} color="#d84e55" />
            </div>
            <p className="text-xl md:text-3xl text-center mt-2 font-semibold primary-text">
              No trip found on that day :(
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Trip;

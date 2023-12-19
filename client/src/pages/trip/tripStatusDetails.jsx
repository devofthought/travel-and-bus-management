import dayjs from "dayjs";
import { formatDuration } from "@/utils/helper";

const TripStatusDetails = ({ trip, selectedBusId, handleSelectBus }) => {
  return (
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
              <span className="hidden md:inline-block">Starting Point:</span>{" "}
              <span className="text-[#5b2192] capitalize">
                {trip?.route_id?.from}
              </span>
            </p>
            <span className="inline-flex md:hidden px-1">to</span>
            <p className="flex flex-col sm:flex-row gap-1">
              <span className="hidden md:inline-block">End Point:</span>{" "}
              <span className="text-[#5b2192] capitalize">
                {trip?.route_id?.to}{" "}
              </span>
            </p>
          </div>
          <div className="flex md:hidden gap-2">
            <h6 className="uppercase text-xs lg:text-sm text-gray-500 font-semibold">
              Seats Available
            </h6>
            <p className="text-[#5b2192] text-xs lg:text-sm">
              {trip?.seats_available}
            </p>
          </div>
          <div className="text-[#5b2192] font-semibold flex md:hidden gap-2 mt-4">
            <p>
              {/* {trip?.departure_time} */}
              <span className="block">
                {dayjs(trip?.departure_time).format("hh:mm A")}
              </span>
            </p>{" "}
            -
            <p>
              {/* {trip?.arrival_time} */}
              <span className="block">
                {dayjs(trip?.arrival_time).format("hh:mm A")}
              </span>
            </p>
          </div>
        </div>
      </li>
      <li className="w-[20%] lg:w-[15%] p-3 lg:p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden md:block">
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
      <li className="w-[20%] lg:w-[15%] p-3 lg:p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden md:block">
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
      <li className="w-[20%] lg:w-[15%] p-3 lg:p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden lg:block">
        <div className="search_item-content__ydL0p">
          <h6 className="uppercase text-sm text-gray-500 font-semibold">
            tour durations
          </h6>
          <p className="text-[#5b2192] font-semibold">
            {trip?.departure_time && trip?.arrival_time && (
              <span>
                {formatDuration(
                  dayjs.duration(
                    dayjs(trip.arrival_time).diff(dayjs(trip.departure_time))
                  )
                )}
              </span>
            )}
          </p>
        </div>
      </li>
      <li className="w-[15%] p-3 lg:p-7 border-t-0 border-l-0 border-b-0 border-r border-dashed hidden md:block">
        <div className="search_item-content__ydL0p">
          <h6 className="uppercase text-sm text-gray-500 font-semibold">
            Seats Available
          </h6>
          <p className="text-[#5b2192] font-semibold">
            {trip?.seats_available}
          </p>
        </div>
      </li>
      <li className="flex-1 p-3 lg:p-7 text-right justify-end">
        <h3 className="text-lg md:text-xl lg-text-2xl font-semibold text-[#5b2192] mb-2">
          ৳{trip?.ticket_price}
        </h3>
        <div className="flex justify-end">
          <button
            className={`w-32 px-2 py-[2px] md:px-3 md:py-1 font-semibold border-2 rounded-md text-white primary-bg  border-none cursor-pointer text-center  ${
              trip?.id === selectedBusId ? "bg-gray-500" : "primary-bg"
            } `}
            onClick={() => handleSelectBus(trip?.id)}
            disabled={trip?.id === selectedBusId ? true : false}
          >
            View Seats
          </button>
        </div>
        <span className="text-xs italic">Cancellation Policy</span>
      </li>
    </ul>
  );
};

export default TripStatusDetails;

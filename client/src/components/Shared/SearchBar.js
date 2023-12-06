import React from "react";
import { DatePicker, Input } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { MdSwapHoriz } from "react-icons/md";
import { BsCalendarDate, BsBusFront } from "react-icons/bs";
import { TbBusStop } from "react-icons/tb";

const SearchBar = () => {
  const disabledDate = (current) => {
    // Disable dates before today after 5 days
    const today = moment().startOf("day");
    const sevenDaysAhead = moment().add(4, "days").endOf("day");

    return current && (current < today || current > sevenDaysAhead);
  };

  const router = useRouter();
  let from = "";
  let to = "";
  let date = "";
  const handleSearchTrip = (e) => {
    e.preventDefault();
    from = e.target.from.value;
    to = e.target.to.value;
    date = e.target.date.value;
    console.log(from, to, date);
    if (from.length > 0 && to.length > 0 && date.length > 0) {
      router.push(`/trip?from=${from}&to=${to}&date=${date}`);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={(e) => handleSearchTrip(e)}>
        <div
          className="w-11/12 sm:w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center bg-white p-5 lg:p-0 lg:shadow-lg lg:h-[112px]"
          style={{ borderRadius: "36px" }}
        >
          <div className="relative w-full h-full p-5 lg:p-0">
            <Input
              name="from"
              size="large"
              className="py-3 w-full rounded-none h-full border-0 sm:pl-0 lg:pl-8  sm:pr-10 lg:pr-20 text-gray-900 placeholder:text-gray-400 sm:text-lg font-semibold sm:leading-6 lg:rounded-l-[36px] cursor-pointer"
              placeholder="From"
              prefix={<BsBusFront className="text-2xl text-gray-500 mr-2" />}
            />
            <div
              className="w-8 h-8 p-1 absolute -bottom-2 right-[42%] sm:top-[28px] sm:-right-[17px] lg:top-[42px] bg-white z-10 text-gray-500 flex items-center justify-center rounded-full cursor-pointer hover:shadow-lg"
              style={{ border: "1px solid lightgray" }}
            >
              <MdSwapHoriz className="text-2xl " />
            </div>
          </div>
          <div className="relative w-full h-full ">
            <Input
              size="large"
              name="to"
              className="py-3 w-full h-full border-y-0 border-x-0 sm:border-x sm:border-r-0 lg:border-r sm:border-r-slate-200 lg:border-x-slate-200  pl-8 sm:pr-10 lg:pr-20 text-gray-900  rounded-none  placeholder:text-gray-400 sm:text-lg font-semibold sm:leading-6 cursor-pointer "
              placeholder="To"
              prefix={<TbBusStop className="text-2xl text-gray-500 mr-2" />}
            />
          </div>
          <div className="relative w-full h-full p-5 lg:p-0">
            <DatePicker
              input
              name="date"
              placeholder="Date"
              className="py-3 w-full h-full border-0 sm:pl-0 lg:pl-8 sm:pr-10 lg:pr-20 text-gray-900 placeholder:text-gray-400  font-semibold sm:leading-6 rounded-none cursor-pointer "
              disabledDate={disabledDate}
              suffixIcon={
                <BsCalendarDate className="text-2xl text-gray-500 " />
              }
            />
          </div>
          <button
            className="border-none p-3 h-full text-lg sm:text-xl  primary-bg sm:font-bold  rounded-2xl lg:rounded-none lg:rounded-r-[36px] text-white cursor-pointer leading-6 "
            type="submit"
          >
            SEARCH BUSES
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import { DatePicker, Input } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { MdOutlineLocationOn, MdSwapHoriz } from "react-icons/md";
import { BsCalendarDate, BsBusFront } from "react-icons/bs";
import { TbBusStop } from "react-icons/tb";
import dayjs from "dayjs";
import { Select } from "antd";

const deptFrom = ["Dhaka", "Sylhet", "Cumilla"];
const ArrTo = ["Dhaka", "Sylhet", "Cumilla", "Rajshahi"];

const SearchBar = () => {
  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().startOf("day");
  };

  const router = useRouter();
  const [fromData, setFromData] = useState("");
  const [toData, setToData] = useState("");
  function handleChangeFrom(value) {
    setFromData(value);
  }

  function handleChange(value) {
    setToData(value);
  }

  const { Option } = Select;
  // let from = "";
  // let to = "";
  let date = "";
  const handleSearchTrip = (e) => {
    e.preventDefault();
    // from = e.target?.from?.value;
    // to = e.target?.to?.value;
    date = e.target.date.value;
    // console.log("date:", date);
    /* if date today then send search time also  */

    // Get the current date and time
    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month = currentDate.getMonth() + 1;
    // const day = currentDate.getDate();

    // // Format the date as a string (optional)
    // const todayDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    //   day < 10 ? "0" : ""
    // }${day}`;

    // if (todayDate === date) {
    //   const arrivalDateTime = dayjs(currentDate).format(
    //     "YYYY-MM-DDTHH:mm:ss.sss"
    //   );
    //   console.log(fromData, toData, arrivalDateTime);
    // } else {
    //   console.log(fromData, toData, date);
    // }

    if (fromData.length > 0 && toData.length > 0 && date.length > 0) {
      router.push(`/trip?from=${fromData}&to=${toData}&date=${date}`);
    }
  };
  return (
    <div className="search-bar">
      <form onSubmit={(e) => handleSearchTrip(e)}>
        <div
          className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center bg-white p-5 lg:p-0 lg:shadow-lg lg:h-[112px]"
          style={{ borderRadius: "36px" }}
        >
          <div className="relative w-full h-full p-5 lg:p-0">
            <div className="relative w-full h-full flex items-center ps-8 ">
              <BsBusFront className="text-2xl text-gray-500 mr-2" />
              <Select
                showSearch
                bordered={false}
                placeholder="From"
                size="large"
                onChange={handleChangeFrom}
                className="w-[80%]"
              >
                {deptFrom?.map((rt, index) => (
                  <Option key={index} value={rt}>
                    {rt}
                  </Option>
                ))}
              </Select>
            </div>
            <div
              className="w-8 h-8 p-1 absolute -bottom-2 right-[42%] sm:top-[28px] sm:-right-[22px] lg:top-[40px] bg-white z-10 text-gray-500 flex items-center justify-center rounded-full cursor-pointer hover:shadow-lg"
              style={{ border: "1px solid lightgray" }}
            >
              <MdSwapHoriz className="text-2xl" />
            </div>
          </div>
          <div className="relative w-full h-full flex items-center ps-8 ">
            <TbBusStop className="text-2xl text-gray-500 mr-2" />
            <Select
              showSearch
              bordered={false}
              placeholder="To"
              size="large"
              onChange={handleChange}
              className="w-[80%]"
            >
              {/* Options go here */}
              {ArrTo?.map((rt, index) => (
                <Option key={index} value={rt}>
                  {rt}
                </Option>
              ))}
            </Select>
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

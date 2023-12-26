import React, { useState } from "react";
import { DatePicker, message } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { MdSwapHoriz } from "react-icons/md";
import { BsCalendarDate, BsBusFront } from "react-icons/bs";
import { TbBusStop } from "react-icons/tb";
import { Select } from "antd";

const deptFrom = ["Dhaka", "Sylhet"];
const ArrTo = ["Sylhet", "Dhaka", "Brahmanbaria", "Bogora"];

const SearchBarV2 = () => {
  const disabledDate = (current) => {
    // Disable dates before today after 5 days
    const today = moment().startOf("day");
    const sevenDaysAhead = moment().add(4, "days").endOf("day");

    return current && (current < today || current > sevenDaysAhead);
  };

  const router = useRouter();
  const [fromData, setFromData] = useState(null);
  const [toData, setToData] = useState(null);
  function handleChangeFrom(value) {
    setFromData(value);
  }

  function handleChange(value) {
    setToData(value);
  }

  function handleFromToSwitcher() {
    const value = fromData;
    setFromData(toData);
    setToData(value);
  }
  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select;
  const handleSearchTrip = (e) => {
    e.preventDefault();
    const date = e.target.date.value;

    // Error handle if search field is empty!
    if (!fromData || !toData || !date) {
      messageApi.open({
        type: "error",
        content: "From, To, Date can't be empty!",
      });
      return;
    }
    // after successfully redirecting if fields have proper value.
    if (fromData.length > 0 && toData.length > 0 && date.length > 0) {
      router.push(`/trip?from=${fromData}&to=${toData}&date=${date}`);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="search-bar">
        <form onSubmit={(e) => handleSearchTrip(e)}>
          <div
            className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center bg-white p-5 lg:p-0 lg:shadow-lg lg:h-[100px]"
            style={{ borderRadius: "36px" }}
          >
            <div className="relative w-full h-full p-5 lg:p-0">
              <div className="relative w-full h-full flex items-center lg:ps-8 ">
                <BsBusFront className="text-2xl text-gray-500 mr-2" />
                <Select
                  showSearch
                  bordered={false}
                  placeholder="From"
                  size="large"
                  onChange={handleChangeFrom}
                  className="w-[80%]"
                  value={fromData}
                >
                  {deptFrom?.map((rt, index) => (
                    <Option key={index} value={rt}>
                      {rt}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="hidden lg:block">
                <div
                  className="w-8 h-8 p-1 absolute -bottom-2 right-[42%] sm:top-[28px] sm:-right-[22px] lg:top-[34px] bg-white z-10 text-gray-500 flex items-center justify-center rounded-full cursor-pointer hover:shadow-lg"
                  style={{ border: "1px solid lightgray" }}
                  onClick={handleFromToSwitcher}
                >
                  <MdSwapHoriz className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="relative w-[80%] md:w-full h-full flex items-center lg:ps-8 ">
              <TbBusStop className="text-2xl text-gray-500 mr-2" />
              <Select
                showSearch
                bordered={false}
                placeholder="To"
                size="large"
                onChange={handleChange}
                className="w-[80%]"
                value={toData}
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
                size="large"
                className="py-3 w-full h-full border-0 sm:pl-0 lg:pl-8 sm:pr-10 lg:pr-20 text-gray-900 placeholder:text-gray-400  font-semibold sm:leading-6 rounded-none cursor-pointer"
                disabledDate={disabledDate}
                suffixIcon={
                  <BsCalendarDate className="text-2xl text-gray-500 " />
                }
              />
            </div>
            <button
              className="border-none p-3 lg:h-full text-lg sm:text-xl hover:opacity-90 primary-bg sm:font-bold  rounded-xl lg:rounded-none lg:rounded-r-[36px] text-white cursor-pointer leading-6 "
              type="submit"
            >
              SEARCH BUSES
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBarV2;

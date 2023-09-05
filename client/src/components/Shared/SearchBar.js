import React from "react";
import { Col, DatePicker, Row, Input } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { MdOutlineLocationOn, MdSwapHoriz } from "react-icons/md";

const SearchBar = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().startOf("day");
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

    // console.log(from, to, date);
    if (from.length > 0 && to.length > 0 && date.length > 0) {
      router.push(`/trip?from=${from}&to=${to}&date=${date}`);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={(e) => handleSearchTrip(e)}>
        {/* <Row className="bg-indigo-400 p-4 z-50 rounded-lg" gutter={[16, 16]}>
          <Col span={6}>
            <Input name="from" className="p-2" placeholder="From" required />
          </Col>
          <Col span={6}>
            <Input name="to" className="p-2" placeholder="To" required />
          </Col>
          <Col span={6}>
            <DatePicker
              name="date"
              className="p-2"
              onChange={onChange}
              disabledDate={disabledDate}
            />
          </Col>
          <Col span={6}>
            <button
              className="w-full h-full bg-blue-950 hover:bg-blue-400 hover:text-slate-950 border border-blue-400 font-semibold rounded-md text-white"
              type="submit"
            >
              Search
            </button>
          </Col>
        </Row> */}
        <div className="w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-5 justify-between bg-white rounded-lg p-8 shadow-lg">
          <div class="relative rounded-md shadow-sm w-full h-full">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">
                <MdOutlineLocationOn />
              </span>
            </div>
            <input
              type="text"
              name="from"
              id="from"
              className="py-3 block w-full h-full rounded-md border-0 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="From"
              required
            />
            <div
              className="w-7 h-7 p-1 pointer-events-none absolute -bottom-6 right-[42%] sm:top-[6px] sm:-right-[24px] lg:top-[10px] bg-white  z-10 text-green-500 flex items-center justify-center rounded-full"
              style={{ border: "1px solid lightgray" }}
            >
              <MdSwapHoriz />
            </div>
          </div>
          <div class="relative rounded-md shadow-sm w-full h-full">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">
                <MdOutlineLocationOn />
              </span>
            </div>
            <input
              type="text"
              name="to"
              id="to"
              className="py-3 block w-full h-full rounded-md border-0 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="To"
              required
            />
          </div>
          <div class="relative rounded-md shadow-sm w-full h-full">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class="text-gray-500 sm:text-sm">
                <MdOutlineLocationOn />
              </span>
            </div>
            <DatePicker
              input
              name="date"
              placeholder="Select date"
              className="py-3 rounded-md w-full h-full"
              disabledDate={disabledDate}
            />
          </div>
          <button
            className="border-[1px] border-gray-200 p-3 h-full bg-blue-400 font-semibold rounded-md text-white"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

import React from "react";
import { Col, DatePicker, Row, Input } from "antd";
import moment from "moment";
import { useRouter } from "next/router";

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
        <Row className="bg-indigo-400 p-4 rounded-lg w-full" gutter={[16, 16]}>
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
        </Row>
      </form>
    </div>
  );
};

export default SearchBar;

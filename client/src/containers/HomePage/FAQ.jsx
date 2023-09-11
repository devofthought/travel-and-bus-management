import React, { useState } from "react";
import CollapseComponent from "@/components/UI/Collapse";
import {
  CancellationFQA,
  GeneralFQA,
  InsuranceFQA,
  PaymentFQA,
  RefundFQA,
  TicketFQA,
} from "@/utils/data/faqData";

const FAQ = () => {
  const [selectedOption, setSelectedOption] = useState("General");

  const options = [
    "General",
    "Ticket-related",
    "Payment",
    "Cancellation",
    "Refund",
    "Insurance",
  ];

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  const renderOptions = () => {
    return options.map((option) => (
      <label
        key={option}
        className={`flex-1 text-center py-4 cursor-pointer mb-6 ${
          selectedOption === option
            ? "bg-[#d84e55] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:border-b-4 hover:border-indigo-500"
        }`}
        onClick={() => handleChange(option)}
      >
        {option}
      </label>
    ));
  };

  const faqDataMap = {
    General: GeneralFQA,
    Payment: PaymentFQA,
    "Ticket-related": TicketFQA,
    Cancellation: CancellationFQA,
    Refund: RefundFQA,
    Insurance: InsuranceFQA,
  };

  return (
    <div className="main-container">
      <div className="mb-10">
        <h1 className="break-words font-montserrat font-normal mb-4 text-4xl leading-7 text-gray-700">
          Frequently Asked Questions
        </h1>
        <div className="h-[2px] md:h-1 w-[160px] bg-[#d84e55] mx-right mt-[10px]"></div>
      </div>
      <div className="flex">{renderOptions()}</div>
      <CollapseComponent data={faqDataMap[selectedOption]} />
    </div>
  );
};

export default FAQ;

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
import SectionTitle from "@/components/Shared/SectionTitle";

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
        className={`px-4 py-2 cursor-pointer ${
          selectedOption === option
            ? "primary-bg text-white"
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
    <div className="main-container my-28 lg:my-32">
      <SectionTitle title={"Frequently Asked Questions"}></SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-2 mb-4">
        {renderOptions()}
      </div>
      <CollapseComponent data={faqDataMap[selectedOption]} />
    </div>
  );
};

export default FAQ;

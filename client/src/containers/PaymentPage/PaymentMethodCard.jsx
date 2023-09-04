import { useState } from "react";
import { Select } from "antd";

const PaymentMethodCard = () => {
  const data = {
    id: "1",
    name: "abc",
    price: 1600,
    phone: 19333333,
    quantity: 2,
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value) => {
    setSelectedValue(value);
    setIsButtonDisabled(false);
  };
  const handleSslcommerz = () => {
    fetch("http://localhost:5000/api/v1/payment/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.replace(result.url);
      });
  };
  const handleStripe = () => {
    fetch("http://localhost:5000/api/v1/payment/stripe/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: [data],
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.replace(result.url);
      });
  };

  return (
    <div className="bg-gray-200 p-5 rounded-lg">
      <h2 className="text-2xl font-semibold secondary-text">
        Select Payment Method :
      </h2>
      <div>
        <Select
          size="large"
          className="w-full  mt-4"
          placeholder="Choose your payment method"
          onChange={handleChange}
          options={[
            {
              value: "sslcommerz",
              label: "SSLCOMMERZ",
            },
            {
              value: "stripe",
              label: "STRIPE",
            },
          ]}
        />

        <button
          onClick={
            selectedValue === "sslcommerz" ? handleSslcommerz : handleStripe
          }
          disabled={isButtonDisabled}
          className={`w-full text-lg text-white mt-7 text-center h-12 ${
            isButtonDisabled ? "bg-blue-300 cursor-not-allowed" : "secondary-bg"
          } rounded`}
        >
          Proceed To Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodCard;

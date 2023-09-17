const PaymentDetailsCard = (data) => {
  const { seatFare, serviceCharge, paymentDue } = data.data;
  return (
    <div>
      <div className="secondary-bg p-5 rounded-lg">
        <h1 className="text-2xl font-semibold primary-text">
          Payment Details Onward:
        </h1>
        <div className="bg-white p-3 mt-3 rounded-lg">
          <div className="text-lg">
            <div className="flex mb-1">
              <span className="w-36 font-medium opacity-70 ">Seat Fare</span>
              <span className="flex-grow font-bold">: {seatFare}</span>
            </div>
            <div className="flex mb-1">
              <span className="w-36 font-medium opacity-70 ">
                Service Charge
              </span>
              <span className="flex-grow font-bold">: {serviceCharge}</span>
            </div>
            <div className="flex mb-1">
              <span className="w-36 font-medium opacity-70 ">Payment Due</span>
              <span className="flex-grow font-bold">: {paymentDue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;

import Footer from "@/components/Shared/Footer";
import BookingDetailsCard from "@/containers/PaymentPage/BookingDetailsCard";
import PassengerDetailsCard from "@/containers/PaymentPage/PassengerDetailsCard";
import PaymentDetailsCard from "@/containers/PaymentPage/PaymentDetailsCard";
import PaymentMethodCard from "@/containers/PaymentPage/PaymentMethodCard";
import RootLayout from "@/layouts/RootLayout";

//! fake data for payment page
const data = {
  bus: "Desh Travel",
  journeyDate: "12-09-2023",
  journey: "Dhaka - Cox's Bazar",
  boardingPoint: "Arambag Counter",
  droppingPoint: "Jhawtala Counter",
  departureTime: "7:20 AM",
  seats: ["A1", "A2", "A3", "A4"],
  totalSeats: 4,
  name: "Dr. Mickel",
  phone: "+019473836288",
  email: "drmickel@gmail.com",
  seatFare: "3200 BDT",
  serviceCharge: "150 BDT",
  paymentDue: "3350 BDT",
};

const Payment = () => {
  return (
    <>
      <div className="main-container">
        <div className=" my-10">
          <h1 className="font-bold text-center text-4xl">
            Preview Your Booking Information
          </h1>
          <div className="h-1 w-[200px] primary-bg mx-auto mt-3"></div>
        </div>
        <BookingDetailsCard data={data}></BookingDetailsCard>
        <div className="mt-8 flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[40%]">
            <PassengerDetailsCard data={data}></PassengerDetailsCard>
          </div>
          <div className="w-full md:w-[30%]">
            <PaymentDetailsCard data={data}></PaymentDetailsCard>
          </div>
          <div className="w-full md:w-[30%]">
            <PaymentMethodCard></PaymentMethodCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

Payment.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

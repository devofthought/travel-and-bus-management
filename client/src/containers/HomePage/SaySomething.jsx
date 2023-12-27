import Button from "@/components/UI/Button";
import { useAddSupportConnectionMutation } from "@/redux/feedback/feedbackApi";
import { Input } from "antd";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SaySomething = () => {
  const { TextArea } = Input;
  const [AddSupportConnection, { data, error, isSuccess, isError }] =
    useAddSupportConnectionMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    let first_name = e.target.first_name.value;
    let last_name = e.target.last_name.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;
    let subject = e.target.subject.value;
    let message = e.target.message.value;

    const body = { first_name, last_name, email, phone, subject, message };
    console.log(first_name, last_name, email, phone, subject, message);
    AddSupportConnection(body);

    e.target.first_name.value = "";
    e.target.last_name.value = "";
    e.target.email.value = "";
    e.target.phone.value = "";
    e.target.subject.value = "";
    e.target.message.value = "";
  };

  useEffect(() => {
    if (data?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (
      error?.status === 400 ||
      error?.status === 406 ||
      error?.status === 403
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${error?.data?.errorMessage[0]?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [data, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your message was successfully sent!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  return (
    <div className="main-container my-28 lg:my-32">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-14" id="ContactUs">
        <div className="w-full md:w-[50%] md:px-4">
          <h1 className="break-words font-montserrat font-semibold mb-4 text-4xl leading-7 text-gray-800">
            Let's stay connected
          </h1>
          <p className="text-gray-600 text-md mt-4 lg:mt-6 mb-8 lg:mb-10">
            We are always looking for new opportunities to work together. We are
            always looking for new opportunities to work together.
          </p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-6"
          >
            <div className="flex justify-between gap-4">
              <input
                type="text"
                id="first_name"
                placeholder="First Name"
                className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
                required
              />
              <input
                type="text"
                id="last_name"
                placeholder="Last Name"
                className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              />
            </div>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              required
            />
            <div className="flex justify-between gap-4">
              <input
                type="text"
                id="phone"
                placeholder="Phone"
                className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              />
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="font-sans appearance-none border-2 border-gray-400 border-t-gray-100 border-l-gray-50 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              />
            </div>
            <textarea
              id="message"
              className="font-sans resize-y rounded-md w-full min-h-[150px] p-3 border-2 border-gray-400  text-gray-700 leading-tight focus:outline-[#d84e55] focus:shadow-outline"
              placeholder="Type Your Message"
              required
            ></textarea>
            <Button btnName="Send Message" styles="w-full py-3"></Button>
          </form>
        </div>
        <div className="w-full md:w-[50%] flex flex-col justify-center gap-6 text-gray-800">
          <div className="py-6" style={{ borderBottom: "1px solid lightgray" }}>
            <div
              className="border-l-red-500 px-4"
              style={{ borderLeft: "4px solid" }}
            >
              <p>Email Us:</p>
              <h4 className="text-xl font-bold mt-2">Info@dhrutotravel.com</h4>
            </div>
          </div>
          <div className="py-6" style={{ borderBottom: "1px solid lightgray" }}>
            <div
              className="border-l-gray-500 px-4"
              style={{ borderLeft: "4px solid" }}
            >
              <p>Call Us:</p>
              <h4 className="text-xl font-bold mt-2">(406) 555-0120</h4>
            </div>
          </div>
          <div className="py-6" style={{ borderBottom: "1px solid lightgray" }}>
            <div
              className="border-l-red-500 px-4"
              style={{ borderLeft: "4px solid" }}
            >
              <p>Office Address:</p>
              <h4 className="text-xl font-bold mt-2">
                Gulshan, Dhaka-1212, Bangladesh
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaySomething;

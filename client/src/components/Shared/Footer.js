import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import { IoMdMail, IoLogoYoutube } from "react-icons/io";
import { MailOutlined } from "@ant-design/icons";
import { Button, Input, Form } from "antd";
import Link from "next/link";
import Swal from "sweetalert2";

const Footer = () => {
  const year = new Date().getFullYear();
  const [form] = Form.useForm();

  const handleSubscribe = (values) => {
    console.log(values);
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Subscribe Successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    form.resetFields();
  };
  return (
    <div className="secondary-bg mt-5">
      <footer className="main-container relative pt-8 pb-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap text-left gap-y-5 lg:text-left">
            <div className="w-full md:w-6/12 lg:w-3/12">
              <h4 className="text-3xl font-semibold text-gray-900">
                Dhruto Travel
              </h4>
              <h5 className="text-lg my-2 text-gray-800">
                Book with Ease, Travel with Speed
              </h5>
              <h5 className="text-base my-2 italic text-gray-700">
                Note: Bus Authority has the right to cancel any bus schedule at
                any time.
              </h5>
            </div>
            <div className="w-full flex lg:justify-center md:w-6/12 lg:w-3/12">
              <div className="flex flex-wrap ">
                <div className="w-full">
                  <span className="block uppercase text-gray-800 text-base font-bold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="text-gray-700 font-semibold block pb-2 text-sm"
                        href="/"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-gray-700 font-semibold block pb-2 text-sm"
                        href="/blog"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-gray-700 font-semibold block pb-2 text-sm"
                        href="/"
                      >
                        Bus
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-gray-700 font-semibold block pb-2 text-sm"
                        href="#reserveBus"
                      >
                        Reserve Bus
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 flex  lg:justify-center">
              <div className="">
                <span className="block uppercase text-gray-800 text-base font-bold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className="text-gray-700 font-semibold block pb-2 text-sm"
                      href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                      target="_blank"
                    >
                      Our License
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 font-semibold block pb-2 text-sm"
                      href="https://creative-tim.com/terms?ref=njs-profile"
                      target="_blank"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 font-semibold block pb-2 text-sm"
                      href="https://creative-tim.com/privacy?ref=njs-profile"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 font-semibold block pb-2 text-sm"
                      href="#ContactUs"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 flex justify-start lg:justify-center">
              <div>
                <span className="block uppercase text-gray-800 text-base font-bold mb-2">
                  Weekly Newsletter
                </span>
                <div>
                  <span className="text-gray-700 font-semibold block pb-2 text-sm">
                    Get our offers and discount via email.
                  </span>
                  <Form form={form} onFinish={handleSubscribe}>
                    <Form.Item
                      name="email"
                      className="mb-0"
                      rules={[
                        { required: true, message: "Please enter your email!" },
                      ]}
                    >
                      <Input
                        size="large"
                        allowClear
                        className="hover:border-red-500 border-2 focus:border-red-500 focus-within:border-red-500 rounded"
                        placeholder="Enter Your Email"
                        prefix={<MailOutlined />}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        className="w-full mt-3 rounded bg-[#d84e55] hover:bg-red-400 duration-200 font-semibold"
                      >
                        Subscribe
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-3 border-solid border-gray-800" />
          <div className="flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="w-full text-center md:text-left md:w-6/12">
              <div className="text-sm text-gray-700 font-semibold py-1">
                All Rights Reserved &copy; Dhruto Travel Online Service{" "}
                <span id="get-current-year">{year}</span>
              </div>
            </div>
            {/* social icons */}
            <div className=" flex justify-center mb-4 md:mb-0 md:justify-end w-full md:w-6/12">
              <button
                className="cursor-pointer border-none bg-white text-black hover:text-[#0080F7] duration-300 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-md outline-none focus:outline-none mr-2"
                type="button"
              >
                <IoMdMail className="w-full h-full p-2" />
              </button>
              <button
                className="cursor-pointer border-none bg-white text-black hover:text-[#1877F2] duration-300 text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-md outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaFacebookSquare className="w-full h-full p-2" />
              </button>
              <button
                className="cursor-pointer border-none bg-white text-black hover:text-[#CD201F] duration-300 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-md outline-none focus:outline-none mr-2"
                type="button"
              >
                <IoLogoYoutube className="w-full h-full p-2" />
              </button>
              <button
                className="cursor-pointer border-none bg-white text-black hover:text-[#0077b5] duration-300 text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-md outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaLinkedin className="w-full h-full p-[6px]" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

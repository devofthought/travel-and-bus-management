import { Button, Divider } from "antd";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div>
      <Button
        type="text"
        className="w-full border-2 text-lg flex justify-center items-center py-4 font-medium text-center border-gray-200"
      >
        <BsGoogle className="mr-3" size={24}></BsGoogle> Sign in with Google
      </Button>
      <Button
        type="text"
        className="w-full border-2 text-lg flex justify-center items-center py-4 font-medium text-center border-gray-200 mt-5"
      >
        <FaFacebook className="mr-3" size={24}></FaFacebook> Sign in with
        Facebook
      </Button>
      <Divider>Or</Divider>
    </div>
  );
};

export default SocialLogin;

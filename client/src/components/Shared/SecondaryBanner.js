import { Button, Card, Modal } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import Image from "next/image";
import SearchBarV2 from "./SearchBarV2";
import UserProfileMainContainer from "@/containers/UserDashboard/UserProfile/UserProfileMainContainer";

const previousData = {
  name: "",
  email: "",
  image: "",
  age: "",
  phone: "",
};

const SecondaryBanner = ({ openDashboard, setOpenDashboard }) => {
  const [userProfile, setUserProfile] = useState(previousData);
  // USER PROFILE GET
  const { data } = useGetMyProfileQuery();
  // console.log(data);

  // PROFILE UPDATE MODAL
  const [searchModal, setSearchModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    const user = {
      name: data?.data.traveler_id?.name,
      email: data?.data.traveler_id?.email,
      image: data?.data.traveler_id?.image?.avatar,
      age: data?.data.traveler_id?.age,
      phone:
        data?.data.traveler_id?.phone &&
        data?.data.traveler_id?.phone.substring(4),
      phone_full:
        data?.data.traveler_id?.phone && data?.data.traveler_id?.phone,
    };
    setUserProfile({ ...user });
  }, [data]);

  // console.log(userProfile);
  const handleCancel = () => {
    setOpen(false);
  };
  // TRIP SEARCH MODAL
  const showTripSearchModal = () => {
    setSearchModal(true);
  };
  const closedTripSearchModal = () => {
    setSearchModal(false);
  };
  const [confirmLoadingTripSearchModal, setConfirmLoadingTripSearchModal] =
    useState(false);

  return (
    <Card
      className="bg-center bg-cover sm:bg-contain lg:bg-cover bg-no-repeat z-10 text-gray-700 text-center py-12 pt-32 h-[520px]"
      style={{
        backgroundImage: `url("/images/HomeBannerImg.png")`,
        inset: "0px",
        borderRadius: "10px",
      }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Welcome to Our Bus Booking App</h1>
        <p className="mt-4 text-lg">
          Discover comfortable and convenient bus journeys for your travels.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center w-2/3 mx-auto mt-8 backdrop-blur-xl opacity-100 border-2 border-solid border-white  p-5 rounded-3xl">
          <div className="flex items-center">
            <div className="relative w-16">
              <Image
                alt="avatar"
                className={`w-16 h-16 rounded-full p-[2px] bg-white cursor-pointer`}
                src={
                  userProfile?.image
                    ? userProfile?.image
                    : "/images/user-avatar.png"
                }
                decoding="async"
                loading="lazy"
                width={300}
                height={300}
              />
              <Button
                type="primary"
                className="absolute bottom-0 right-0 bg-gray-400 flex justify-center items-center"
                shape="circle"
                size="small"
                onClick={showModal}
                icon={<EditOutlined />}
              />
            </div>
            <div className="text-left ml-3">
              <h3 className="text-slate-900 capitalize">{userProfile?.name}</h3>
              <p className="text-slate-900">{userProfile?.email}</p>
            </div>
          </div>
          <button
            className="primary-bg text-white border-none mt-3 md:mt-0 w-2/3 md:w-auto rounded-[5px] cursor-pointer text-center py-2 px-3"
            onClick={showTripSearchModal}
          >
            Trip Search
          </button>
        </div>
      </div>

      {/* PROFILE UPDATE MODAL */}
      <Modal
        title="User Profile"
        open={open}
        centered
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <UserProfileMainContainer userProfile={userProfile} />
      </Modal>

      {/* TRIP SEARCH MODAL */}
      <Modal
        open={searchModal}
        className="tripModal"
        centered
        confirmLoading={confirmLoadingTripSearchModal}
        onCancel={closedTripSearchModal}
        footer={null}
        closable={false}
        width={1000}
      >
        <SearchBarV2 />
      </Modal>
    </Card>
  );
};

export default SecondaryBanner;

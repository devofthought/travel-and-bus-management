import React from "react";
import Image from "next/image";

const Profile = ({ userProfile }) => {

  return (
    <div>
      <div className="flex items-center">
        <div className="border border-solid border-gray-300 mb-5 rounded-md">
          <Image
            src={userProfile.image}
            className="object-cover"
            width={200}
            height={200}
          />
        </div>
        <div className="ml-10">
          <p
            style={{
              borderBottom: "2px",
              borderBottomStyle: "solid",
              borderColor: "#D0D0D0",
            }}
            className=" mb-2 text-lg font-semibold"
          >
            <span>Name - </span>
            {userProfile.name}
          </p>
          <p
            style={{
              borderBottom: "2px",
              borderBottomStyle: "solid",
              borderColor: "#D0D0D0",
            }}
            className=" mb-2 text-lg font-medium text-gray-600"
          >
            <span>Email - </span>
            {userProfile.email}
          </p>
          <p
            style={{
              borderBottom: "2px",
              borderBottomStyle: "solid",
              borderColor: "#D0D0D0",
            }}
            className=" mb-2 text-lg font-medium text-gray-600"
          >
            <span>Age - </span>
            {userProfile.age}
          </p>
          <p
            style={{
              borderBottom: "2px",
              borderBottomStyle: "solid",
              borderColor: "#D0D0D0",
            }}
            className=" mb-2 text-lg font-medium text-gray-600"
          >
            <span>Phone - </span>
            {userProfile.phone_full}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

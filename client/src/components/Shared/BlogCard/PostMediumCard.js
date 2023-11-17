import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dateFormate } from "@/utils/helper";
import { Avatar } from "antd";

export const PostMediumCard = ({ cardData }) => {
  return (
    <div className="relative max-h-[406px] rounded-md shadow">
      {/* Card Image */}
      <div className="h-full max-w-full">
        <Image
          width={1216}
          height={406}
          src={
            cardData?.featuredmedia?.sourceUrl || "https://placehold.it/800x450"
          }
          alt={cardData?.featuredmedia?.alt || "post-thumb"}
          className="rounded-md w-full object-cover"
        />
      </div>
      <div className="card-body p-2 md:p-6 absolute bottom-0 w-full z-20">
        <div className="flex flex-wrap items-center gap-1.5">
          {cardData?.category?.map((categoryData, index) => (
            <Link href={``} key={index}>
              <div className="px-2 py-1 bg-[#d84e55] text-white border-0 rounded">
                {categoryData?.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <h3>
            <Link
              href={`/blog/${cardData?.slug}`}
              className="text-white line-clam-3 font-semibold text-xl md:text-2xl hover:text-primary transition hover:duration-500"
            >
              {cardData?.title ||
                `The Impact of Technology on the Workplace: How Technology is Changing`}
            </Link>
          </h3>
        </div>
        <div className="mt-5 flex items-center gap-5">
          <div className=" flex items-center gap-3">
            {/* user avatar  */}
            <Avatar
              size="large"
              icon={
                <Image
                  src={cardData?.avatar || "https://placehold.it/100x100"}
                  alt="author"
                  width={100}
                  height={100}
                />
              }
            />
            <h5>
              <Link
                href={``}
                className="text-white font-medium hover:text-primary transition hover:duration-300"
              >
                {cardData?.author}
              </Link>
            </h5>
          </div>
          <p className="text-white">{dateFormate(cardData?.publishTime)}</p>
        </div>
      </div>

      {/*  overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
    </div>
  );
};

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { dateFormate } from "@/utils/helper";
import { Avatar } from "antd";

export const PostListCard = ({ cardData }) => {
  return (
    <div className="px-4 lg:px-0">
      <div className="p-0 rounded-xl w-fit">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex-none !block h-[240px] w-[300px]">
            <Link href={`/blog/${cardData?.slug}`}>
              <Image
                src={
                  cardData?.featuredmedia?.sourceUrl ||
                  "https://placehold.it/320x240"
                }
                alt={cardData?.featuredmedia?.alt || "post-thumb"}
                className="rounded-md object-cover w-full"
                width={320}
                height={240}
              />
            </Link>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              {cardData?.category?.map((categoryData, index) => (
                <Link href={``} key={index}>
                  <div className="px-2 py-1 bg-[#d84e55] text-white border-0 rounded">
                    {categoryData?.name}
                  </div>
                </Link>
              ))}
            </div>
            <div
              className="mt-4"
              style={{
                margin: "auto 0px",
                overflow: "hidden",
                WebkitLineClamp: "2",
                display: "-webkit-box",
                color: "text.secondary",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
              }}
            >
              <Link
                href={`/blog/${cardData?.slug}`}
                className="line-clam-2 font-semibold text-xl md:text-2xl text-base-content leading-7 hover:text-primary transition hover:duration-300 overflow-hidden"
              >
                {cardData?.title || (
                  <h3>
                    `The Art of Traveling: Tips and Tricks for a Memorable
                    Journey`
                  </h3>
                )}
              </Link>
            </div>

            <p className="mt-4 font-serif text-base text-base-content/70">
              Traveling can be a thrilling and enriching experience, but it also
              requires careful planning and preparation...
            </p>

            <div className="mt-6 flex items-center gap-5 text-base-content/60">
              <div className="flex items-center gap-2">
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
                    href=""
                    className="text-sm font-medium hover:text-primary transition hover:duration-300 whitespace-nowrap"
                  >
                    {cardData?.author || "unknown"}
                  </Link>
                </h5>
              </div>
              <p className="text-sm whitespace-nowrap">
                {dateFormate(cardData?.publishTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

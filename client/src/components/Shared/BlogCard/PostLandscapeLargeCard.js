import Link from "next/link";
import Image from "next/image";
import { dateFormate } from "@/utils/helper";
import { Avatar } from "antd";

export const PostLandscapeLargeCard = ({ cardData }) => {
  return (
    <div className="relative min-h-[370px] sm:min-h-[320px] rounded-md shadow overflow-hidden">
      {/* Card Image */}
      <div className="h-[370px] sm:h-[320px] max-w-full rounded-md shadow">
        <Image
          src={
            cardData?.featuredmedia?.sourceUrl || "https://placehold.it/700x700"
          }
          alt={cardData?.featuredmedia?.alt || "post-thumb"}
          className={`rounded-md w-full h-full object-cover`}
          width={700}
          height={700}
        />
      </div>
      <div className="gap-0 absolute bottom-0 rounded-md w-full z-20 p-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {cardData?.category?.slice(0, 3)?.map((categoryData, index) => (
            <Link href={``} key={index}>
              <div className="px-2 py-1 bg-[#d84e55] text-white bg-primary border-0 rounded-md">
                {" "}
                {categoryData?.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link href={`/blog/${cardData?.slug}`}>
            <h2 className="text-lg text-white sm:text-xl line-clam-3 lg:text-2xl font-semibold text-neutral-content hover:text-primary transition hover:duration-300 line-clamp-3">
              {cardData?.title ||
                `The Impact of Technology on the Workplace: How Technology is Changing`}
            </h2>
          </Link>
        </div>
        {/* user info and date  */}
        <div className="mt-6 flex items-center gap-5">
          <div className=" flex items-center gap-3">
            {/* USER AVATAR  */}
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
                className="text-white capitalize font-medium hover:text-primary transition hover:duration-300"
              >
                {cardData?.author || "unknown"}
              </Link>
            </h5>
          </div>
          <p className="text-neutral-content text-white">
            {dateFormate(cardData?.publishTime)}
          </p>
        </div>
      </div>

      {/*  OVERLAY EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-md"></div>
    </div>
  );
};

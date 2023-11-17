import Link from "next/link";
import Image from "next/image";
import { dateFormate } from "@/utils/helper";
import { Avatar } from "antd";

export const PostLargeCard = ({ cardData }) => {
  return (
    <div className="relative min-h-[370px] sm:min-h-[660px] rounded-md shadow overflow-hidden">
      {/* CARD & IMAGE */}
      <div className="h-full max-w-full rounded-md shadow">
        <Image
          src={
            cardData?.featuredmedia?.sourceUrl || "https://placehold.it/700x700"
          }
          alt={cardData?.featuredmedia?.alt || "post-thumb"}
          className={`w-full object-cover rounded-md`}
          width={660}
          height={660}
        />
      </div>

      {/* CARD CONTENT */}
      <div className="gap-0 absolute bottom-0 rounded-xl w-full z-20 p-5 sm:p-10">
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
          <Link href={`/blog/${cardData?.slug}`}>
            <h2 className="text-lg text-white sm:text-xl line-clam-3 md:text-3xl lg:text-4xl font-semibold text-neutral-content hover:text-primary transition hover:duration-300 line-clamp-3">
              {cardData?.title}
            </h2>
          </Link>
        </div>
        {/* user info and date  */}
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
                className="text-neutral-content text-white font-medium hover:text-primary transition hover:duration-300"
              >
                {cardData?.author}
              </Link>
            </h5>
          </div>
          <p className="text-neutral-content text-white">
            {dateFormate(cardData?.publishTime)}
          </p>
        </div>
      </div>

      {/*  OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
    </div>
  );
};

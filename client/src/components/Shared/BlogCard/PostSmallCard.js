import React from "react";
import Link from "next/link";
import Image from "next/image";

export const PostSmallCard = ({ cardData }) => {
  return (
    <div className="min-h-[320px] relative rounded-md shadow overflow-hidden">
      {/* Card Image */}
      <div className="h-full max-w-full rounded-md shadow">
        <Image
          src={
            cardData?.featuredmedia?.sourceUrl || "https://placehold.it/700x700"
          }
          alt={cardData?.featuredmedia?.alt || "post-thumb"}
          className={`rounded-md w-full object-cover`}
          width={320}
          height={320}
        />
      </div>
      <div className="gap-0 absolute bottom-0 rounded-md w-full z-20 p-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {cardData?.category?.map((categoryData, index) => (
            <Link href={``} key={index}>
              <div className="px-2 py-1 bg-[#d84e55] text-white border-0 rounded-md">
                {categoryData?.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-3">
          <Link href={`/blog/${cardData?.slug}`}>
            <h2 className="text-lg text-white font-semibold line-clam-3 text-neutral-content hover:text-primary transition hover:duration-300 line-clamp-3">
              {cardData?.title ||
                "The Impact of Technology on the Workplace: How Technology is Changing"}
            </h2>
          </Link>
        </div>
      </div>
      {/*  overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-md"></div>
    </div>
  );
};

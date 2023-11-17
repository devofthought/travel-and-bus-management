import Link from "next/link";
import React from "react";
import Image from "next/image";
import { dateFormate } from "@/utils/helper";

export const PostListSmallCard = ({ cardData }) => {
  return (
    <div className="border border-solid border-slate-300 py-6 px-8 rounded-md w-fit shadow">
      <div className="flex items-center justify-center gap-4">
        <div className="flex-none">
          <Link href={`/blog/${cardData?.slug}`}>
            <Image
              src={
                cardData?.featuredmedia?.sourceUrl ||
                "https://placehold.it/110x90"
              }
              alt={cardData?.featuredmedia?.alt || "post-thumb"}
              className="rounded-md w-28 h-28"
              width={110}
              height={190}
            />
          </Link>
        </div>
        <div>
          <h5>
            <Link
              href={`/blog/${cardData?.slug}`}
              className="line-clam-2 font-semibold text-base text-base-content leading-5 hover:text-primary transition hover:duration-300 line-clam-2"
            >
              {cardData?.title ||
                `All the Stats, Facts, and Data You will Ever Need to Know`}
            </Link>
          </h5>
          <p className="mt-2.5 text-base-content/60 text-sm">
            {dateFormate(cardData?.publishTime)}
          </p>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dateFormate } from "@/utils/helper";

export const SidebarPopularPost = ({ cardData }) => {
  return (
    <div className="">
      {/* card body section  */}
      <div className="p-0">
        <div className="flex items-center gap-4">
          <div className="flex-none!block">
            <Link href={`/blog/${cardData?.slug}`}>
              <Image
                src={
                  cardData?.featuredmedia?.sourceUrl ||
                  "https://placehold.it/320x240"
                }
                alt={cardData?.featuredmedia?.alt || "post-thumb"}
                className="rounded-md object-cover w-[100px] h-[100px]"
                width={320}
                height={240}
              />
            </Link>
          </div>

          <div>
            <h5>
              <Link
                href={`/blog/${cardData.slug}`}
                className="line-clam-2 font-semibold text-base text-base-content leading-5 hover:text-primary transition hover:duration-300"
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
    </div>
  );
};

import { PostListSmallCard } from "@/components/Shared/BlogCard/PostListSmallCard";
import { PostMediumCard } from "@/components/Shared/BlogCard/PostMediumCard";
import React from "react";

export const PostSecondBanner = ({ data }) => {
  const postData = data && data?.length > 0 ? data : [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="blog-container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 sm:px-0">
      {postData?.slice(0, 1).map((item, index) => (
        <PostMediumCard cardData={item} key={index} />
      ))}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 items-center gap-5">
        {postData?.slice(2, 8).map((postData, index) => (
          <PostListSmallCard cardData={postData} key={index} />
        ))}
      </div>
    </div>
  );
};

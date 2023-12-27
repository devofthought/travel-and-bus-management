import { PostLandscapeLargeCard } from "@/components/Shared/BlogCard/PostLandscapeLargeCard";
import { PostLargeCard } from "@/components/Shared/BlogCard/PostLargeCard";
import { PostSmallCard } from "@/components/Shared/BlogCard/PostSmallCard";

export const PostMainBanner = ({ data }) => {
  const postData = data?.length > 0 ? data : [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <div className="main-container mx-auto flex flex-col md:flex-row gap-5	px-5 sm:px-0">
        <div className="w-full md:w-6/12">
          {postData?.slice(0, 1).map((item, index) => (
            <PostLargeCard cardData={item} key={index} />
          ))}
        </div>
        <div className="w-full md:w-6/12 flex flex-col gap-5">
          {postData?.slice(1, 2).map((item, index) => (
            <PostLandscapeLargeCard cardData={item} key={index} />
          ))}
          <div className="w-full flex flex-col sm:flex-row gap-5">
            {postData?.slice(2, 4).map((item, index) => (
              <PostSmallCard cardData={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

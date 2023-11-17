import { PostListCard } from "@/components/Shared/BlogCard/PostListCard";


export const PostListSingleColCard = ({ data }) => {
  const postData = data && data?.length > 0 ? data : [1, 2, 3, 4, 5, 6];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-5">
        {postData?.slice(0, 6)?.map((item, index) => (
          <div
            className={`pb-5 ${
              index === postData?.length - 1
                ? ""
                : "border-b border-base-content/10"
            }`}
            key={index}
          >
            <PostListCard cardData={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

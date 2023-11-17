import { SidebarPopularPost } from "@/components/Shared/BlogCard/SidebarPopularPost";

const RecentBlogSideBar = ({ data }) => {
  const postData = data && data?.length > 0 ? data : [1, 2, 3, 4, 5, 6];

  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 justify-center order-last lg:order-none">
      <div className="p-8 border border-base-content/10 rounded-xl w-full">
        <h5 className="text-base-content font-bold text-2xl">
          Latest Post
        </h5>
        <div className="grid grid-cols-1 gap-6 mt-8 border border-solid border-slate-300 p-3 rounded-md">
          {postData?.slice(0, 6)?.map((item, index) => (
            <SidebarPopularPost cardData={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default RecentBlogSideBar;

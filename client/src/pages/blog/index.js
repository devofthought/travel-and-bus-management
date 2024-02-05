import React from "react";
import RootLayout from "@/layouts/RootLayout";
import { PostMainBanner } from "@/containers/Blog/PostMainBanner";
import { postsData } from "@/data/posts/allPostData";
import { PostSecondBanner } from "@/containers/Blog/PostSecondBanner";
import { PostListSingleColCard } from "@/containers/Blog/PostListSingleColCard";
import RecentBlogSideBar from "@/containers/Blog/RecentBlogSideBar";
import PageTitle from "@/components/Shared/PageTitle";

const Blog = () => {
  return (
    <div className="py-10">
      {/* Page Title */}
      <PageTitle title={"Blogs"} />
      <section>
        <PostMainBanner data={postsData} />
      </section>

      {/* Editor Pick */}
      <section className="main-container py-10">
        <div className="flex items-center justify-between mb-8">
          <h5 className="text-base-content text-2xl font-bold">Editor Pick</h5>
        </div>
        <PostSecondBanner data={postsData} />
      </section>

      {/* HORIZONTAL CARD */}
      <section className="main-container py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h5 className="text-base-content text-2xl font-bold">
                More Post
              </h5>
            </div>
            <PostListSingleColCard data={postsData} />
          </div>
          {/*  Sidebar Component */}
          <RecentBlogSideBar data={postsData} />
        </div>
      </section>
    </div>
  );
};

export default Blog;

Blog.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

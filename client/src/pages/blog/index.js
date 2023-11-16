import React from "react";
import RootLayout from "@/layouts/RootLayout";

const Blog = () => {
  return <div>blogs page</div>;
};

export default Blog;

Blog.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
  };
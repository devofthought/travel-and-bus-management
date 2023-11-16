import React from "react";
import RootLayout from "@/layouts/RootLayout";
import { useRouter } from "next/router";

const BlogSingle = () => {
  const router = useRouter();
  return <div>blog single page :{router.query.slug}</div>;
};

export default BlogSingle;

BlogSingle.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

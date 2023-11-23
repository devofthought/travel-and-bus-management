import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Dhruto Travel</title>
    </Helmet>
  );
};

export default PageTitle;

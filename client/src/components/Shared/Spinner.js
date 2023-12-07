import { Spin } from "antd";
import React from "react";

const Spinner = () => {
  const spinStyle = {
    margin: "20px 0",
    marginBottom: "20px",
    padding: "30px 50px",
    textAlign: "center",
    height: "350px",
    background: "rgba(0, 0, 0, 0.04)",
    borderRadius: "4px",
  };

  return (
    <Spin tip="Loading...">
      <div style={spinStyle} />
    </Spin>
  );
};

export default Spinner;

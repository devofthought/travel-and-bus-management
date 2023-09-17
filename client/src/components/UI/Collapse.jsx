import { CaretRightOutlined } from "@ant-design/icons";
import React from "react";
import { Collapse, theme } from "antd";

const CollapseComponent = ({ data }) => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 16,
    background: "rgb(243, 244, 249)",
    color: "rgb(29, 29, 29)",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <div>
      <Collapse
        accordion
        bordered={true}
        // defaultActiveKey={["1"]}
        ghost={true}
        size={"large"}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            style={{ fontSize: "18px", marginTop: "5px" }}
            rotate={isActive ? 90 : 0}
          />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={data(panelStyle)}
      />
    </div>
  );
};

export default CollapseComponent;

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import SideBar from "@/components/Shared/SideBar";
import DashboardRightBarDropDown from "@/components/Shared/DashboardRightBarDropDown";
import Footer from "@/components/UI/Footer";
const { Header, Sider, Content } = Layout;

const AdminDashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      {/************************************* sideBar *****************************************/}
      <Sider
        width={200}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
        }}
      >
        {collapsed || (
          <div className="flex justify-center items-center h-16 rounded-xl mx-2 my-3 shadow-md duration-700">
            <h3 className="text-2xl">Dhruto Travel</h3>
          </div>
        )}
        <SideBar />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 55,
              height: 55,
            }}
          />
          <DashboardRightBarDropDown />
        </Header>
        <Content
          style={{
            margin: "24px 16px 5px 16px" /* top | right | bottom | left */,
            padding: 24,
            minHeight: "calc(100vh - 185px)",
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default AdminDashboardLayout;

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import SideBar from "@/components/Shared/SideBar";
import DashboardRightBarDropDown from "@/components/Shared/DashboardRightBarDropDown";
import Footer from "@/components/UI/Footer";
import Link from "next/link";
import TopLoader from "@/components/Shared/TopLoader";
// import NoticeBoard from "@/components/Shared/NoticeBoard";
const { Header, Sider, Content } = Layout;
import withAuth from "@/utils/withAuth";
import dynamic from "next/dynamic";

const AdminDashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      {/************************************* sideBar *****************************************/}
      <Sider
        width={280}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#001529",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {collapsed || (
          <div className="flex justify-center items-center h-10 rounded-xl mx-2 my-3 duration-700">
            <Link href={"/"} className="text-white text-2xl">
              Dhruto Travel
            </Link>
          </div>
        )}
        <SideBar />
      </Sider>
      <Layout>
        {/* <NoticeBoard /> */}
        <TopLoader />
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
            margin: "24px 16px 5px 16px",
            padding: "24px 10px",
            minHeight: "calc(100vh - 185px)",
            background: colorBgContainer,
            overflowY: "scroll" 
          }}
          className="overflow-x-scroll md:overflow-x-hidden"
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
// export default AdminDashboardLayout;
export default dynamic(() => Promise.resolve(withAuth(AdminDashboardLayout, ["admin"])), { ssr: true });

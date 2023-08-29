import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Avatar } from "antd";
const { Header, Sider, Content } = Layout;

const AdminDashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items1 = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );
  return (
    <Layout className="h-screen">
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
          <div
            className="flex justify-center items-center h-16 rounded-xl mx-2 my-3 shadow-md duration-700"
             
          >
            <h3 className="text-2xl">Druto Travel</h3>
          </div>
        )}
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            borderRight: 0,
          }}
          items={items2}
        />
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
          <Avatar
            className="mr-5 flex justify-center items-center"
            size="large"
            icon={<UserOutlined />}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminDashboardLayout;

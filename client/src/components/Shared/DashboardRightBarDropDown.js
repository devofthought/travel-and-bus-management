import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { BiBus, BiLogOut } from "react-icons/bi";
import { MdCreate, MdUpdate } from "react-icons/md";
import { SiCompilerexplorer } from "react-icons/si";

function getItem(label, key, path, icon, children) {
  return {
    key,
    path,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Traveler", "1", "traveler-list", <PieChartOutlined />),
  getItem("Bus", "2", "dashboard/all-bus", <BiBus />),
  getItem("trip", "3", "dashboard/trip-list", "", [
    getItem("create", "4", "dashboard/create-trip", <MdCreate />),
    getItem("update", "5", "dashboard/update-trip", <MdUpdate />),
    getItem("complete", "6", "dashboard/complete-trip", <SiCompilerexplorer />),
  ]),
  getItem("logout", "99", "logout", <BiLogOut />),
];

function DashboardRightBarDropDown() {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = router.pathname;
    setSelectedKeys([pathName]);
  }, [router.pathname]);

  const menu = (
    <Menu
      theme="light"
      defaultSelectedKeys={["1"]}
      mode="inline"
      onClick={(item) => {
        router.push(item?.key);
      }}
      items={items}
      selectedKeys={[selectedKeys]}
    >
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} className="font-semibold">
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow>
      <Avatar
        className="mr-5 flex justify-center items-center cursor-pointer"
        size="large"
        icon={<UserOutlined />}
      />
    </Dropdown>
  );
}

export default DashboardRightBarDropDown;

import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { rightSubMenus } from "@/utils/tools/rightSubMenu";

function renderMenuItems(items) {
  return items.map((item) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.path} icon={item.icon} title={item.label}>
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link href={item.path} passHref>
            {item.label}
          </Link>
        </Menu.Item>
      );
    }
  });
}

function DashboardRightBarDropDown() {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = router.pathname;
    setSelectedKeys([pathName]);
  }, [router.pathname]);

  const filterMenus = rightSubMenus?.filter((rt) =>
    rt?.permission?.includes("admin")
  );

  const menu = (
    <Menu
      theme="light"
      defaultSelectedKeys={["1"]}
      mode="inline"
      selectedKeys={[selectedKeys]}
    >
      {renderMenuItems(filterMenus)}
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

import { Menus } from "@/utils/tools/menu";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

function SideBar() {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = router.pathname;
    setSelectedKeys([pathName]);
  }, [router.pathname]);

  const filterMenus = Menus.filter((rt) => rt?.permission?.includes("admin"));

  return (
    <Menu
      theme="light"
      defaultSelectedKeys={["1"]}
      mode="inline"
      selectedKeys={[selectedKeys]}
    >
      {renderMenuItems(filterMenus)}
    </Menu>
  );
}

export default SideBar;

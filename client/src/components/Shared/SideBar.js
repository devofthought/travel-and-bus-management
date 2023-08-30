import { Menus } from "@/utils/tools/menu";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      onClick={(item) => {
        router.push(item.key);
      }}
      items={filterMenus}
      selectedKeys={[selectedKeys]}
    />
  );
}
export default SideBar;

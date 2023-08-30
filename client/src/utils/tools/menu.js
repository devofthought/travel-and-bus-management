import { AppstoreOutlined } from "@ant-design/icons";
import { BiBus, BiListOl, BiTrip, BiUser } from "react-icons/bi";
import { BsBusFront } from "react-icons/bs";
import { GiBusStop } from "react-icons/gi";
import {
  MdCreate,
  MdOutlineDriveFileRenameOutline,
  MdTravelExplore,
  MdUpdate,
} from "react-icons/md";
import { SiCompilerexplorer } from "react-icons/si";

export const Menus = [
  {
    label: "Dashbaord",
    icon: <AppstoreOutlined />,
    key: "/dashboard",
    permission: ["admin"],
  },
  {
    label: "Trip",
    icon: <BiTrip />,
    permission: ["admin"],
    children: [
      {
        label: "Trip List",
        key: "/dashboard/trip-list",
        icon: <BiListOl />,
      },
      {
        label: "Create Trip",
        key: "/dashboard/create-trip",
        icon: <MdCreate />,
      },
      {
        label: "Update Trip",
        key: "/dashboard/update-trip",
        icon: <MdUpdate />,
      },
      {
        label: "Completed Trip",
        key: "/dashboard/complete-trip",
        icon: <SiCompilerexplorer />,
      },
    ],
  },
  {
    label: "Traveler",
    icon: <MdTravelExplore />,
    permission: ["admin"],
    children: [
      {
        label: "Traveler List",
        key: "/dashboard/traveler-list",
        icon: <BiListOl />,
      },
    ],
  },
  {
    label: "Driver",
    icon: <BiUser />,
    permission: ["admin"],
    children: [
      {
        label: "create Driver",
        key: "/dashboard/create-driver",
        icon: <MdOutlineDriveFileRenameOutline />,
      },
      {
        label: "All Driver",
        key: "/dashboard/all-drivers",
        icon: <BiListOl />,
      },
    ],
  },
  {
    label: "Bus",
    icon: <BiBus />,
    permission: ["admin"],
    children: [
      {
        label: "create Bus",
        key: "/dashboard/create-bus",
        icon: <BsBusFront />,
      },
      {
        label: "All Bus",
        key: "/dashboard/all-bus",
        icon: <GiBusStop />,
      },
    ],
  },
];

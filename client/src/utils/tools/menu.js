import { AppstoreOutlined } from "@ant-design/icons";
import { AiOutlinePullRequest } from "react-icons/ai";
import { BiBus, BiListOl, BiTrip, BiUser } from "react-icons/bi";
import { BsBusFront, BsBusFrontFill, BsCardChecklist } from "react-icons/bs";
import { FaRoad } from "react-icons/fa";
import { GiAutoRepair, GiBusStop, GiMountainRoad,GiUpgrade } from "react-icons/gi";
import {
  MdCreate,
  MdOutlineAddRoad,
  MdOutlineDriveFileRenameOutline,
  MdOutlineRssFeed,
  MdTravelExplore,
  MdUpdate,
} from "react-icons/md";
import { SiCompilerexplorer } from "react-icons/si";
import { TbBrandFeedly } from "react-icons/tb";

export const Menus = [
  {
    label: "Dashbaord",
    key: "7943gh2qg",
    icon: <AppstoreOutlined />,
    path: "/dashboard",
    permission: ["admin"],
  },
  {
    label: "Trip",
    key: "r3gh9g9h3",
    icon: <BiTrip />,
    permission: ["admin"],
    children: [
      {
        label: "Trip List",
        key: "84030831hn",
        path: "/dashboard/trip/trip-list",
        icon: <BiListOl />,
      },
      {
        label: "Create Trip",
        key: "803yg083gh",
        path: "/dashboard/trip/create-trip",
        icon: <MdCreate />,
      },
      {
        label: "Update Trip",
        key: "3894uj08g23j5",
        path: "/dashboard/trip/update-trip",
        icon: <MdUpdate />,
      },
      {
        label: "Completed Trip",
        key: "493uj92g3j",
        path: "/dashboard/trip/complete-trip",
        icon: <SiCompilerexplorer />,
      },
    ],
  },
  {
    label: "Traveler",
    key: "34uj0g30h798",
    icon: <MdTravelExplore />,
    permission: ["admin"],
    children: [
      {
        label: "Traveler List",
        key: "43uyg803hg8",
        path: "/dashboard/traveler/traveler-list",
        icon: <BiListOl />,
      },
    ],
  },
  {
    label: "Driver",
    key: "843h80g3h80",
    icon: <BiUser />,
    permission: ["admin"],
    children: [
      {
        label: "create Driver",
        key: "9835g8093",
        path: "/dashboard/driver/create-driver",
        icon: <MdOutlineDriveFileRenameOutline />,
      },
      {
        label: "All Driver",
        key: "904ut3290u",
        path: "/dashboard/driver/all-drivers",
        icon: <BiListOl />,
      },
    ],
  },
  {
    label: "Bus",
    key: "380gj803d",
    icon: <BiBus />,
    permission: ["admin"],
    children: [
      {
        label: "create Bus",
        key: "349jgj938hj",
        path: "/dashboard/bus/create-bus",
        icon: <BsBusFront />,
      },
      {
        label: "All Bus",
        key: "8034ug890u35u",
        path: "/dashboard/bus/all-bus",
        icon: <GiBusStop />,
      },
    ],
  },
  {
    label: "Route",
    key: "dat3i43nnt",
    icon: <FaRoad />,
    permission: ["admin"],
    children: [
      {
        label: "create Route",
        key: "8034uni6oh83gh7",
        path: "/dashboard/route/create-route",
        icon: <MdOutlineAddRoad />,
      },
      {
        label: "All Route",
        key: "4hn7932gh9",
        path: "/dashboard/route/all-route",
        icon: <GiMountainRoad />,
      },
    ],
  },
  // {
  //   label: "Incident",
  //   key: "380gj803d",
  //   icon: <GiAutoRepair />,
  //   permission: ["admin"],
  //   children: [
  //     {
  //       label: "All incident",
  //       key: "349jgj938hj",
  //       path: "/dashboard/incident/all-incident",
  //       icon: <BsCardChecklist />,
  //     },
  //     {
  //       label: "create incident",
  //       key: "349jgj938hj",
  //       path: "/dashboard/incident/create-incident",
  //       icon: <MdOutlineDriveFileRenameOutline />,
  //     },
  //   ],
  // },
  {
    label: "Reserve Bus",
    key: "adsf234f234",
    icon: <BsBusFrontFill />,
    permission: ["admin"],
    children: [
      {
        label: "Reserve Request",
        key: "3214gf124f",
        path: "/dashboard/reserve-bus/pending",
        icon: <AiOutlinePullRequest />,
      },
      {
        label: "Reserve history",
        key: "4325234f23f",
        path: "/dashboard/reserve-bus/history",
        icon: <BiListOl />,
      },
    ],
  },
  // {
  //   label: "Support",
  //   key: "380gj803d",
  //   icon: <MdOutlineRssFeed />,
  //   permission: ["admin"],
  //   children: [
  //     {
  //       label: "Support All",
  //       key: "349jgj938hj",
  //       path: "/dashboard/support",
  //       icon: <TbBrandFeedly />,
  //     },
  //   ],
  // },
  {
    label: "Upgrade",
    key: "34262effgs",
    icon: <GiUpgrade />,
    permission: ["admin"],
    children: [
      {
        label: "system time",
        key: "349jgj938hj",
        path: "/dashboard/system-time",
        icon: <GiUpgrade />,
      },
    ],
  },
  /* driver menubar */
  {
    label: "profile",
    key: "adsf234f234",
    icon: <BsBusFrontFill />,
    permission: ["driver"],
    children: [
      {
        label: "Profile",
        key: "3214gf124f",
        path: "/dashboard/driver/profile",
        icon: <AiOutlinePullRequest />,
      },
      {
        label: "Trip History",
        key: "4325234f23f",
        path: "/dashboard/driver/trip-history",
        icon: <BiListOl />,
      },
      {
        label: "Trip Upcoming",
        key: "4325234f23f",
        path: "/dashboard/driver/trip-upcoming",
        icon: <BiListOl />,
      },
    ],
  },
];

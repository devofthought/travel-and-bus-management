import { BiListOl, BiUser } from "react-icons/bi";
import {
  MdOutlineDriveFileRenameOutline,
  MdTravelExplore,
} from "react-icons/md";

export const rightSubMenus = [
  {
    label: "Traveler List",
    key: "84030831hn",
    path: "/dashboard/trip/traveler-list",
    icon: <BiListOl />,
    permission: ["admin"],
  },
  {
    label: "Bus",
    key: "34uj0g30h798",
    icon: <MdTravelExplore />,
    permission: ["admin"],
    children: [
      {
        label: "All Bus",
        key: "43uyg803hg8",
        path: "/dashboard/bus/all-bus",
        icon: <BiListOl />,
      },
    ],
  },
  {
    label: "Trip",
    key: "843h80g3h80",
    icon: <BiUser />,
    permission: ["admin"],
    children: [
      {
        label: "create Trip",
        key: "9835g8093",
        path: "/dashboard/trip/create-trip",
        icon: <MdOutlineDriveFileRenameOutline />,
      },
      {
        label: "Update Trip",
        key: "904ut3290u",
        path: "/dashboard/trip/update-trip",
        icon: <BiListOl />,
      },
    ],
  },
];

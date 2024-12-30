import {
  CreditCard,
  Home,
  MessageSquare,
  PanelRight,
  Settings2,
  Users,
} from "lucide-react";

export const SIDE_BAR_MENU = [
  {
    label: "Panels",
    icon: <PanelRight />,
    path: "panels",
  },
  {
    label: "People",
    icon: <Users />,
    path: "people",
  },
  {
    label: "Comments",
    icon: <MessageSquare />,
    path: "comments",
  },
  {
    label: "Admin",
    icon: <Settings2 />,
    path: "admin",
  },
];

export const LANDING_PAGE_MENU = [
  {
    id: 0,
    label: "Home",
    icon: <Home />,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Pricing",
    icon: <CreditCard />,
    path: "#pricing",
    section: true,
  },
];

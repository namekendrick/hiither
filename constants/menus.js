import { CreditCard, Home, PanelRight, Settings2 } from "lucide-react";

export const SIDE_BAR_MENU = [
  {
    label: "Panels",
    icon: <PanelRight />,
    path: "panels",
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

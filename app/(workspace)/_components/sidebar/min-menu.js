import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

import { MenuItem } from "./menu-item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SIDE_BAR_MENU } from "@/constants/menus";
import { useCurrentUser } from "@/features/auth/hooks";
import { DomainsMenu } from "@/features/domains/components/domains-menu";

export const MinMenu = ({ onExpand, current, onSignOut }) => {
  const user = useCurrentUser();
  const path = usePathname();

  return (
    <div className="flex h-full flex-col items-center px-5 py-[25px]">
      <span className="animate-fade-in cursor-pointer opacity-0 delay-300 fill-mode-forwards">
        <Menu onClick={onExpand} />
      </span>
      <div className="flex h-full animate-fade-in flex-col justify-between pt-10 opacity-0 delay-300 fill-mode-forwards">
        <div className="flex flex-col items-center">
          <DomainsMenu onExpand={onExpand} min />
          {!path.includes("account") &&
            SIDE_BAR_MENU.map((menu, key) => (
              <MenuItem size="min" {...menu} key={key} current={current} />
            ))}
        </div>
        <div className="flex flex-col items-center">
          <MenuItem
            size="min"
            label="Account"
            icon={
              <Avatar className="h-8 w-8">
                {user?.image ? (
                  <AvatarImage src={user?.image} />
                ) : (
                  <AvatarFallback className="h-11 w-11 bg-slate-200">
                    <FaUser className="h-7 w-7" />
                  </AvatarFallback>
                )}
              </Avatar>
            }
            path="account"
            options
          />
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </div>
  );
};

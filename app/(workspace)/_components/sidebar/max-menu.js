import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

import { MenuItem } from "./menu-item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SIDE_BAR_MENU } from "@/constants/menus";
import { useCurrentUser } from "@/features/auth/hooks";
import { DomainsMenu } from "@/features/domains/components/domains-menu";

export const MaxMenu = ({ current, onShrink, onSignOut }) => {
  const user = useCurrentUser();
  const path = usePathname();

  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <Image
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          className="animate-fade-in opacity-0 delay-300 fill-mode-forwards"
          style={{
            width: "85px",
            height: "auto",
          }}
          width={0}
          height={0}
        />
        <Menu
          className="animate-fade-in cursor-pointer opacity-0 delay-300 fill-mode-forwards"
          onClick={onShrink}
        />
      </div>
      <div className="flex h-full animate-fade-in flex-col justify-between pt-10 opacity-0 delay-300 fill-mode-forwards">
        {path.includes("account") ? (
          <Link
            href="/workspace"
            className="my-1 flex items-center gap-2 rounded-lg border px-2 py-2 text-black shadow hover:bg-white"
          >
            <LayoutDashboard /> Workspace
          </Link>
        ) : (
          <div className="flex flex-col">
            <DomainsMenu />
            <p className="mb-3 text-xs text-gray-500">MENU</p>
            {SIDE_BAR_MENU.map((menu, key) => (
              <MenuItem size="max" {...menu} key={key} current={current} />
            ))}
          </div>
        )}
        <div className="flex flex-col">
          <p className="mb-3 text-xs text-gray-500">OPTIONS</p>
          <MenuItem
            size="max"
            label="Account"
            icon={
              <Avatar className="h-6 w-6">
                {user?.image ? (
                  <AvatarImage src={user?.image} />
                ) : (
                  <AvatarFallback className="h-8 w-8 bg-slate-200">
                    <FaUser className="h-5 w-5" />
                  </AvatarFallback>
                )}
              </Avatar>
            }
            path="account"
            options
          />
          <MenuItem
            size="max"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </div>
  );
};

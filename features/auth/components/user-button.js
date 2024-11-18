"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { useCurrentUser } from "@/features/auth/hooks";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback className="bg-slate-200">
            <FaUser className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex w-full min-w-72 flex-col gap-y-2"
        align="end"
      >
        <Link href={"/profile/edit"}>
          <div className="flex items-center px-3 text-sm font-semibold transition-all hover:rounded-md hover:bg-slate-300/20">
            <div className="flex items-center gap-x-4 truncate py-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-slate-200">
                  <FaUser className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="w-48 truncate">{user?.name ?? user?.email}</div>
            </div>
          </div>
        </Link>
        <Separator className="m-auto w-[90%]" />
        <Link href="/workspace">
          <div className="flex items-center p-3 text-sm font-semibold transition-all hover:rounded-md hover:bg-slate-300/20">
            Publisher workspace
          </div>
        </Link>
        <Separator className="m-auto w-[90%]" />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <div className="px-1 text-muted-foreground">Sign out</div>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

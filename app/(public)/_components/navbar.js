"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks";
import { UserButton } from "@/features/auth/components/user-button";

export const Navbar = ({ domain, panelId }) => {
  const router = useRouter();
  const path = usePathname();
  const user = useCurrentUser();
  const { status } = useSession();

  if (status === "loading") return null;

  return (
    <nav className="sticky top-0 z-10 flex flex-col">
      <div className="flex w-full items-center justify-between px-4 py-3">
        <div className="relative h-8 w-8 sm:h-10 sm:w-10">
          {path.includes("/p/") ? (
            <Button
              className="px-2"
              onClick={() => router.push(`/c/${domain.id}`)}
              variant="secondary"
            >
              <ArrowLeft />
            </Button>
          ) : (
            <Image
              alt="Domain logo"
              src={domain.logo ?? `/images/owl.png`}
              className="rounded-md object-cover"
              fill
            />
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <Button
            className="bg-indigo-600 font-bold hover:bg-indigo-500"
            onClick={() => {
              panelId
                ? router.push(`/c/${domain.id}/join?p=${panelId}`)
                : router.push(`/c/${domain.id}/join`);
            }}
          >
            Join in
          </Button>
        )}
      </div>
    </nav>
  );
};

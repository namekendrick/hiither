"use client";

import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";

export const NavBar = () => {
  const { data, status } = useSession();

  if (status === "loading") return null;

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between p-5">
      <div className="my-auto flex justify-center gap-1.5 self-stretch text-2xl tracking-tighter text-neutral-700">
        <Image
          src="/images/logo.png"
          alt="Hiither logo"
          sizes="100vw"
          style={{
            width: "85px",
            height: "auto",
          }}
          width={0}
          height={0}
        />
      </div>
      {data?.user ? (
        <UserButton />
      ) : (
        <Link href="/auth/sign-in">
          <Button className="flex gap-2">
            <LogIn className="h-5 w-5" /> Sign in
          </Button>
        </Link>
      )}
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const NavBar = () => {
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
      <Link href="/auth/sign-in">
        <Button className="flex gap-2">
          <LogIn className="h-5 w-5" /> Sign in
        </Button>
      </Link>
    </div>
  );
};

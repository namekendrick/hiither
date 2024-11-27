import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <div className="flex flex-col items-start gap-y-5 md:items-center md:gap-y-5">
      <h1 className="text-left text-[35px] font-semibold leading-tight md:text-center md:text-[55px] lg:text-[70px] xl:text-[80px]">
        Convert your traffic
        <br />
        the <span className="text-indigo-500">human way</span>.
      </h1>
      <p className="text-left text-base text-muted-foreground md:text-center">
        Hiither converts your visitors into engaged community members by{" "}
        <a
          href={process.env.NEXT_PUBLIC_LP_HREF}
          className="font-medium text-primary underline hover:decoration-indigo-500"
        >
          leveling up your links
        </a>
        .
        <br className="hidden md:block" /> Get started with just a single line
        of code and a free panel to see instant results.
      </p>
      <div className="mt-5 flex w-full flex-col gap-5 md:flex-row md:justify-center">
        <Link href={process.env.NEXT_PUBLIC_LP_HREF}>
          <Button variant="outline" className="w-full text-base">
            See example
          </Button>
        </Link>
        <Link href="auth/sign-in">
          <Button className="flex w-full gap-x-2 text-base">
            Get started for free <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

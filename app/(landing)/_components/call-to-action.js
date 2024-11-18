import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <div className="flex flex-col items-start gap-y-5 md:items-center md:gap-y-5">
      <h1 className="text-left text-[35px] font-semibold leading-tight md:text-center md:text-[55px] lg:text-[70px] xl:text-[80px]">
        Grow your email list
        <br />
        without being annoying.
      </h1>
      <p className="text-left text-base text-muted-foreground md:text-center">
        Hiither turns your visitors into community members with{" "}
        <span className="font-medium text-primary">
          embeddable social threads
        </span>
        , <br className="hidden md:block" /> triggered via any button or link on
        your website... like{" "}
        <a
          href={process.env.NEXT_PUBLIC_LP_HREF}
          className="underline hover:text-primary hover:decoration-yellow-400"
        >
          this one
        </a>
        .
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

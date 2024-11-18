import Image from "next/image";
import Link from "next/link";

export const Header = ({ label }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Hiither logo"
          sizes="100vw"
          style={{
            width: "100px",
            height: "auto",
          }}
          width={0}
          height={0}
        />
      </Link>

      <h2 className="text-md text-muted-foreground">{label}</h2>
    </div>
  );
};

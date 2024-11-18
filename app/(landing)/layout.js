import { NavBar } from "@/app/(landing)/_components/navbar";

export default function LandingPageLayout({ children }) {
  return (
    <div className="flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}

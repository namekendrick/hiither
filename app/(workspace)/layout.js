import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { SideBar } from "@/app/(workspace)/_components/sidebar/sidebar";
import { InfoBar } from "@/app/(workspace)/_components/infobar/infobar";

export default async function WorkspaceLayout({ children }) {
  const session = await auth();

  return (
    // TODO: Revisit issue with only placing session provider in MainLayout
    <SessionProvider session={session}>
      <div className="flex h-screen w-full overflow-hidden">
        <SideBar />
        <div className="flex h-screen w-full flex-col overflow-auto px-5 pl-[88px] md:px-5">
          <InfoBar />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}

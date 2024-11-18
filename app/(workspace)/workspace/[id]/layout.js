import { redirect } from "next/navigation";

import { getCurrentDomainByDomainId } from "@/db/domain";

export default async function WorkspaceIdLayout({ children, params }) {
  const domain = await getCurrentDomainByDomainId(params.id);
  if (!domain || !domain.isMine) redirect("/workspace");

  return <>{children}</>;
}

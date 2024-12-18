// "use client";

// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// import { Navbar } from "@/app/(public)/_components/navbar";
// import { Button } from "@/components/ui/button";
// import { useCurrentUser } from "@/features/auth/hooks";
// import { useGetPublicDomainByDomainId } from "@/features/domains/hooks/use-get-domain";
// import { JoinForm } from "@/features/panel/components/join-form";
// import { PublicPanelList } from "@/features/panels/components/public-panel-list";
// import { useGetPublicPanels } from "@/features/panels/hooks/use-get-panels";

// const CommunityPage = ({ params }) => {
//   const domainId = params.id;
//   const user = useCurrentUser();
//   const router = useRouter();
//   const { status } = useSession();

//   const { data: domain, isLoading: isLoadingDomain } =
//     useGetPublicDomainByDomainId(domainId);
//   const { data: panels, isLoading: isLoadingPanels } =
//     useGetPublicPanels(domainId);

//   if (isLoadingDomain || isLoadingPanels || status === "loading") return null;

//   return (
//     <div className="min-h-full">
//       <Navbar domain={domain} />
//       <div className="mx-auto max-w-[1100px] p-4 pt-20">
//         <div className="mx-auto grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-4">
//           <div className="col-span-2 flex flex-col gap-y-4">
//             <PublicPanelList panels={panels} />
//           </div>
//           <div className="col-span-1 flex h-fit max-w-sm flex-col gap-y-2 rounded-lg border p-4 shadow-md">
//             <a
//               href={`http://${domain.name}`}
//               target="_blank"
//               className="line-clamp-2 text-sm font-bold hover:underline"
//             >
//               {domain.name}
//             </a>
//             <p className="text-sm">
//               Community created{" "}
//               {new Date(domain.createdAt).toLocaleDateString("en-us", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               })}
//             </p>
//             {!domain.isMember &&
//               (user ? (
//                 <div className="pt-6">
//                   <JoinForm domainId={domain.id} email={user.email} />
//                 </div>
//               ) : (
//                 <Button
//                   className="mt-4 w-fit min-w-[80px] bg-indigo-600 font-semibold hover:bg-indigo-500"
//                   onClick={() => router.push(`/c/${domain.id}/join`)}
//                 >
//                   Join the conversation
//                 </Button>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommunityPage;

// "use client";

// import Link from "next/link";

// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { BlockEditor } from "@/features/editor/components/block-editor";

// export function PublicPanelList({ panels }) {
//   return (
//     <div className="flex flex-col">
//       {panels
//         .filter((p) => p.isPublished)
//         .map((panel) => (
//           <div className="w-full" key={panel.id}>
//             <Link href={`/p/${panel.id}`}>
//               <div className="flex flex-col gap-y-3 rounded-md p-5 hover:bg-slate-50">
//                 <div className="flex justify-between gap-x-10">
//                   <div className="flex flex-col justify-between gap-y-5">
//                     <div className="flex max-h-80 flex-col gap-y-2 overflow-hidden">
//                       <BlockEditor panelId={panel.id} readOnly />
//                     </div>
//                     <span>...</span>
//                     <div className="flex items-center gap-x-1">
//                       {panel._count.comments === 1 ? (
//                         <Badge className="w-fit shrink-0">
//                           {panel._count.comments} Comment
//                         </Badge>
//                       ) : (
//                         <Badge className="w-fit shrink-0">
//                           {panel._count.comments} Comments
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {panels.length >= 1 && <Separator className="my-2" />}
//             </Link>
//           </div>
//         ))}
//     </div>
//   );
// }

import { CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const commentColumns = ({ openChangeStatusModal }) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "text",
      label: "Comment",
      header: <></>,
      cell: ({ row }) => {
        const published = row.original.status === "PUBLISHED";
        const deleted = row.original.status === "DELETED";
        const spam = row.original.status === "SPAM";
        const pending = row.original.status === "PENDING";

        return (
          <div className="flex max-w-[800px] flex-col gap-4 px-4 py-2">
            <div>
              <div className="overflow-hidden text-ellipsis font-semibold">
                {row.original.author.name}
              </div>
              <div className="text-muted-foreground">
                {row.original.author.email}
              </div>
            </div>
            <div className="overflow-hidden text-ellipsis">
              {row.original.text}
            </div>
            <div className="flex gap-x-2">
              {pending ? (
                <Button
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-400"
                  onClick={() =>
                    openChangeStatusModal(row.original.id, "review")
                  }
                >
                  <CircleAlert className="mr-1 h-4 w-4" />
                  Review
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant={published ? "default" : "outline"}
                  className={published && "bg-emerald-500 hover:bg-emerald-400"}
                  onClick={() => {
                    if (!published)
                      openChangeStatusModal(row.original.id, "publish");
                  }}
                >
                  {published ? "Published" : "Publish"}
                </Button>
              )}
              {spam ? (
                <Button size="sm" className="bg-rose-500 hover:bg-rose-400">
                  Flagged as spam
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant={deleted ? "default" : "outline"}
                  className={deleted && "bg-rose-500 hover:bg-rose-400"}
                  onClick={() => {
                    if (!deleted)
                      openChangeStatusModal(row.original.id, "delete");
                  }}
                >
                  {deleted ? "Deleted" : "Delete"}
                </Button>
              )}
            </div>
          </div>
        );
      },
    },
  ];
};

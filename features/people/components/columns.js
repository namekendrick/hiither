import { MoreHorizontal, ArrowUpDown, ShieldEllipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const personColumns = ({ openChangeAccessModal }) => {
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
      accessorKey: "name",
      label: "Person",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Person
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex max-w-[800px] flex-col gap-1 px-4">
            <div className="overflow-hidden text-ellipsis font-semibold">
              {row.original.user.name}
            </div>
            <div className="text-muted-foreground">
              {row.original.user.email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "access",
      label: "Access",
      header: "Access",
      cell: ({ row }) => {
        const access = row.original.access;

        switch (access) {
          case "BANNED":
            return (
              <span
                style={{ color: "#ffffff", backgroundColor: "#f43f5e" }}
                className="select-none rounded-md px-5 py-2"
              >
                Banned
              </span>
            );
          case "TRUSTED":
            return (
              <span
                style={{ color: "#ffffff", backgroundColor: "#10b981" }}
                className="select-none rounded-md px-5 py-2"
              >
                Trusted
              </span>
            );
          default:
            return (
              <span
                style={{ backgroundColor: "#f8fafc" }}
                className="select-none rounded-md px-5 py-2"
              >
                Contributor
              </span>
            );
        }
      },
    },
    {
      id: "actions",
      label: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  openChangeAccessModal(row.original.id, row.original.access)
                }
              >
                <ShieldEllipsis className="mr-2 h-4 w-4" />
                <span>Change access</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

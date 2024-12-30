import Link from "next/link";
import {
  MoreHorizontal,
  ArrowUpDown,
  Clipboard,
  Pencil,
  Download,
} from "lucide-react";
import { CSVLink } from "react-csv";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenamePanelForm } from "@/features/panels/components/rename-panel-form";

export const panelColumns = ({
  openUnpublishModal,
  openDeleteModal,
  renamingPanel,
  setRenamingPanel,
  ToastAction,
  toast,
}) => {
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
      accessorKey: "title",
      label: "Name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <>
          {row.original.id === renamingPanel ? (
            <RenamePanelForm
              id={row.original.id}
              original={row.original.title}
              setRenamingPanel={setRenamingPanel}
            />
          ) : (
            <Link
              href={`/panel/${row.original.id}/edit`}
              className="px-4 hover:underline"
            >
              {row.getValue("title")}
            </Link>
          )}
        </>
      ),
    },
    {
      accessorKey: "isPublished",
      label: "Status",
      header: "Status",
      cell: ({ row }) => {
        if (row.getValue("isPublished")) {
          return (
            <span
              style={{ backgroundColor: "#86efac" }}
              className="select-none rounded-md px-5 py-2"
            >
              Published
            </span>
          );
        } else {
          return (
            <span
              style={{ backgroundColor: "#e2e8f0" }}
              className="select-none rounded-md px-5 py-2"
            >
              Draft
            </span>
          );
        }
      },
    },
    {
      accessorKey: "views",
      label: "Views",
      header: "Views",
      cell: ({ row }) => row.original._count.views,
    },
    {
      accessorKey: "joins",
      label: "New People",
      header: "New People",
      cell: ({ row }) => row.original._count.joins,
    },
    {
      accessorKey: "comments",
      label: "Comments",
      header: "Comments",
      cell: ({ row }) => row.original._count.comments,
    },
    {
      id: "actions",
      label: "Actions",
      cell: ({ row }) => {
        const panel = row.original;
        const emails = panel.joins.map((d) => d.user);

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
                onClick={() => {
                  navigator.clipboard.writeText(`#hii-${panel.id}`);
                  toast({
                    title: "Panel href copied!",
                    description:
                      "Use this href on a link to have it trigger the panel. Ex: <a href='#hii-123456'></a>",
                    action: (
                      <ToastAction
                        altText="Copy href"
                        onClick={() =>
                          navigator.clipboard.writeText(`#hii-${panel.id}`)
                        }
                      >
                        <Clipboard className="mr-1 h-4 w-4" />
                        Copy
                      </ToastAction>
                    ),
                  });
                }}
              >
                <Clipboard className="mr-2 h-4 w-4" />
                Copy href
              </DropdownMenuItem>
              <DropdownMenuItem>
                {/* TODO: Create lib for kebab casing the filename */}
                <CSVLink
                  data={emails}
                  headers={[{ label: "Email", key: "email" }]}
                  filename={`${panel.title}-contacts.csv`}
                  className={
                    emails.length
                      ? "flex cursor-default items-center"
                      : "pointer-events-none flex items-center text-slate-400"
                  }
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export contacts
                </CSVLink>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRenamingPanel(panel.id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {panel.isPublished && (
                <DropdownMenuItem onClick={() => openUnpublishModal(panel.id)}>
                  Unpublish
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => openDeleteModal(panel.id)}>
                <span className="text-red-500">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

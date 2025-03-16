import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./PostTableRowAction";
import { DataTableColumnHeader } from "@/components/common/DataTableColumnHeader";
import { Typography } from "@/components/ui/Typography";
import { TablePost } from "@/schema/postSchema";

export const postColumns: ColumnDef<TablePost>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        <Typography className="line-clamp-2 text-sm font-semibold py-0">{row.getValue("title")}</Typography>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
    cell: ({ row }) => <Typography className="text-sm">{row.getValue("location")}</Typography>,
  },
  {
    accessorKey: "job_type_names",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Job Type" />,
    cell: ({ row }) => (
      <Typography className="text-sm">{(row.getValue("job_type_names") as string[]).join(", ")}</Typography>
    ),
  },
  {
    accessorKey: "no_of_openings",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Openings" />,
    cell: ({ row }) => (
      <Typography className="text-sm text-center">{row.getValue("no_of_openings")}</Typography>
    ),
  },
  {
    accessorKey: "experience_level_names",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Experience" />,
    cell: ({ row }) => (
      <Typography className="text-sm">
        {(row.getValue("experience_level_names") as string[]).join(", ")}
      </Typography>
    ),
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export interface PostFilter {
  title?: string;
  location?: string;
}

export const postFilterConfig: {
  placeholder: string;
  key: keyof PostFilter;
}[] = [
  { placeholder: "Job Title", key: "title" },
  { placeholder: "Location", key: "location" },
];

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DataTableViewOptions } from "@/components/common/DataTableViewOptions";
import { useDispatch } from "react-redux";
import { setFilters } from "@/store/slice/paginationSlice";
import { postFilterConfig } from "./PostTableConfig";
import { TablePost } from "@/schema/postSchema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function PostTableToolbar({ table }: DataTableToolbarProps<TablePost>) {
  const dispatch = useDispatch();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {postFilterConfig.map((config) => (
          <Input
            key={config.key}
            placeholder={config.placeholder}
            value={(table.getColumn(config.key)?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn(config.key)?.setFilterValue(event.target.value);
              dispatch(
                setFilters({
                  filters: {
                    [config.key]: event.target.value,
                  },
                })
              );
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ))}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              dispatch(setFilters({ filters: {} }));
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

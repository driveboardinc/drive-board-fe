"use client";

import DataTable from "@/components/common/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  getPagination,
  getSorting,
  setIsLoading,
  setPaginationDetails,
} from "@/feature/slice/paginationSlice";
import { useEffect } from "react";
import { useGetJobPostsQuery } from "@/app/api/jobPostApiSlice";
import { postColumns } from "@/components/carrier/table/PostTableConfig";
import { PostTableToolbar } from "@/components/carrier/table/PostTableToolbar";

export default function JobListPage() {
  const dispatch = useDispatch();
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);

  const { data: postsResponse, isFetching } = useGetJobPostsQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });
  useEffect(() => {
    dispatch(setIsLoading({ loadingStatus: isFetching }));
  }, [isFetching, dispatch]);

  useEffect(() => {
    if (postsResponse?.success) {
      dispatch(
        setPaginationDetails({
          pagination: postsResponse.data.pagination,
          pageCount: postsResponse.data.pageCount,
          totalRecords: postsResponse.data.totalRecords,
        })
      );
    }
  }, [postsResponse, dispatch]);

  return (
    <div className="lg:p-4 rounded-lg">
      <h3 className="text-3xl font-semibold">Job List Page</h3>
      <div className="lg:p-4">
        <DataTable
          columns={postColumns}
          data={postsResponse?.data?.items || []}
          ToolbarComponent={PostTableToolbar}
        />
      </div>
    </div>
  );
}

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { BellSVG } from '@/assets/svg/Bell';
import { HelpSVG } from '@/assets/svg/HelpIcon';
import { MessagesSVG } from '@/assets/svg/Messages';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/common/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilters,
  getPagination,
  getSorting,
  setIsLoading,
  setPaginationDetails,
} from '@/feature/slice/paginationSlice';
import { useEffect } from 'react';
import { useGetJobPostsQuery } from '@/app/api/jobPostApiSlice';
import { postColumns } from './PostTableConfig';
import { PostTableToolbar } from './PostTableToolbar';

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
  }, [isFetching]);

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
    <div className="flex flex-col container mx-auto lg:px-4 py-6 w-full max-w-[1600px] h-full">
      <div className="flex w-full items-center justify-between mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Job List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <Button variant="ghost">
            <HelpSVG className="size-8" />
          </Button>
          <Button variant="ghost">
            <MessagesSVG className="size-8" />
          </Button>
          <Button variant="ghost">
            <BellSVG className="size-8" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
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
    </div>
  );
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnFilter, ColumnSort } from "@tanstack/react-table";

export interface PaginationState {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  pageCount: number;
  totalRecords: number;
  filters: ColumnFilter[];
  sorting: ColumnSort[];
  isLoading: boolean;
  refetchData: boolean;
}

const initialState: PaginationState = {
  pagination: {
    pageIndex: 1,
    pageSize: 10,
  },
  pageCount: 0,
  totalRecords: 0,
  filters: [],
  sorting: [],
  isLoading: false,
  refetchData: false,
};

const tablePaginationSlice = createSlice({
  name: "pageDetails",
  initialState: initialState,
  reducers: {
    setPaginationDetails: (
      state,
      action: PayloadAction<{
        pagination: { pageIndex: number; pageSize: number };
        pageCount: number;
        totalRecords: number;
      }>
    ) => {
      const { pagination, pageCount, totalRecords } = action.payload;
      state.pagination = pagination;
      state.pageCount = pageCount;
      state.totalRecords = totalRecords;
    },
    setPagination: (
      state,
      action: PayloadAction<{
        pageIndex: number;
        pageSize: number;
      }>
    ) => {
      const { pageIndex, pageSize } = action.payload;
      state.pagination = { pageIndex, pageSize };
    },

    setPageSize: (
      state,
      action: PayloadAction<{
        pageSize: number;
      }>
    ) => {
      state.pagination.pageSize = action.payload.pageSize;
    },

    setPageIndex: (
      state,
      action: PayloadAction<{
        pageIndex: number;
      }>
    ) => {
      state.pagination.pageIndex = action.payload.pageIndex;
    },

    resetPagination: (state) => {
      state.pagination = { pageIndex: 1, pageSize: 10 };
      state.pageCount = 0;
      state.totalRecords = 0;
      state.filters = [];
    },

    setRefetchData: (state) => {
      state.refetchData = !state.refetchData;
    },

    setFilters: (
      state,
      action: PayloadAction<{
        filters: Record<string, string>;
      }>
    ) => {
      state.filters = Object.entries(action.payload.filters).map(([id, value]) => ({
        id,
        value,
      }));
    },

    setSorting: (
      state,
      action: PayloadAction<{
        name: string;
        order: "asc" | "desc" | "";
      }>
    ) => {
      const { name, order } = action.payload;
      const isDescending = order === "desc";

      if (order === "") {
        state.sorting = state.sorting.filter((sort) => sort.id !== name);
        return;
      }

      const isSortExist = state.sorting.find((sort) => sort.id === name);

      if (isSortExist) {
        state.sorting = state.sorting.map((sort) =>
          sort.id === name ? { id: name, desc: isDescending } : sort
        );
      } else {
        state.sorting = [...state.sorting, { id: name, desc: isDescending }];
      }
    },

    setIsLoading: (
      state,
      action: PayloadAction<{
        loadingStatus: boolean;
      }>
    ) => {
      const { loadingStatus } = action.payload;
      state.isLoading = loadingStatus;
    },
  },
});

export const {
  setPaginationDetails,
  setPageSize,
  setPageIndex,
  resetPagination,
  setRefetchData,
  setPagination,
  setFilters,
  setSorting,
  setIsLoading,
} = tablePaginationSlice.actions;
export default tablePaginationSlice.reducer;

export const getPagination = (state: { pageDetails: PaginationState }) =>
  state?.pageDetails?.pagination || initialState.pagination;

export const getTotalPageCount = (state: { pageDetails: PaginationState }) =>
  state?.pageDetails?.pageCount || initialState.pageCount;

export const getTotalRecords = (state: { pageDetails: PaginationState }) =>
  state?.pageDetails?.totalRecords || initialState.totalRecords;

export const getFilters = (state: { pageDetails: PaginationState }) =>
  state?.pageDetails?.filters || initialState.filters;

export const getSorting = (state: { pageDetails: PaginationState }) =>
  state?.pageDetails?.sorting || initialState.sorting;

export const getRefetchStatus = (state: { pageDetails: PaginationState }) =>
  state?.pageDetails?.refetchData || initialState.refetchData;

export const getIsLoading = (state: { pageDetails: PaginationState }) =>
  state?.pageDetails?.isLoading || initialState.isLoading;

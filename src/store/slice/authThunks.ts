import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthCookies } from "@/utils/auth";

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  // You can add a fetch() here if you have a logout API
  clearAuthCookies(); // still clear cookies
});

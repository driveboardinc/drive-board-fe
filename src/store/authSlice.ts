import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  user: null | object;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isAuthenticated: false,
};

interface AuthPayload {
  email: string;
  password: string;
  userType: string;
}

// Async thunk for signup
export const signup = createAsyncThunk("auth/signup", async (formData: AuthPayload) => {
  const response = await fetch("http://ec2-3-85-162-187.compute-1.amazonaws.com:8000/api/signup/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      is_carrier: false,
      is_driver: true,
    }),
  });
  if (!response.ok) {
    throw new Error("Signup failed");
  }
  return await response.json();
});

// Async thunk for signin
export const signin = createAsyncThunk("auth/signin", async (formData: AuthPayload) => {
  const response = await fetch("http://ec2-3-85-162-187.compute-1.amazonaws.com:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });
  if (!response.ok) {
    throw new Error("Signin failed");
  }
  return await response.json();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message || "Signup failed";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.error = action.error.message || "Signin failed";
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { showToastError, showToastSuccess } from "@/@/utils/helpers";
import { cookiesOptions } from "@/@/utils/constant";
import publicApiClient from "../../libs/publicAxios"; // Public API for auth calls
import { AuthState, ForgotPasswordFormData } from "../../types/auth";
import apiClient from "../../libs/axios"; // Protected API for authenticated calls

// Initial State
const initialState: AuthState = {
  user: null,
  verified_user: false,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
  organizationList: null,
  selectedOrganization: null,
};

// **🔹 User Signup **
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    userData: {
      first_name: string;
      last_name: string;
      email: string;
      contact_no: number;
      password: string;
      confirm_password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await publicApiClient.post("/user", userData);
      const user = response?.data?.data;
      // Store tokens in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            user_id: user.user_id,
            contact_no: user.contact_no,
          })
        );
        localStorage.setItem(
          "contact_no_verification_token",
          user.contact_no_verification_token
        );
        Cookies.set(
          "contact_no_verification_token",
          user.contact_no_verification_token,
          {
            ...cookiesOptions,
            sameSite: "Strict",
          }
        );
        localStorage.setItem(
          "email_verification_token",
          user.email_verification_token
        );
        Cookies.set("email_verification_token", user.email_verification_token, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("user", JSON.stringify(user), {
          ...cookiesOptions,
          sameSite: "Strict",
        });
      }
      showToastSuccess(response.data.message || "Signup successful");
      return { token: user.contact_no_verification_token, user };
    } catch (error: any) {
      console.log("error :>> ", error);
      showToastError(error.response?.data?.message || "Signup failed");
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// **🔹 User Login **
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { loginId: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await publicApiClient.post("/user/login", credentials);
      // showToastSuccess(response.data.message || "Login successfully!");
      return response;
    } catch (error: any) {
      showToastError(error?.response?.data?.message || "Login failed");
      return rejectWithValue(error || "Login failed");
    }
  }
);

// **🔹 Forgot Password Thunk**
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: ForgotPasswordFormData, { rejectWithValue }) => {
    try {
      const response = await publicApiClient.post(
        `/user/forgot-password`,
        data
      );
      showToastSuccess(response.data.message || "Forgot password successful");
      return response;
    } catch (error: any) {
      showToastError(
        error?.response?.data?.message || "Failed to Forgot password"
      );
      return rejectWithValue(error);
    }
  }
);

// **🔹 Reset Password Thunk**
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: { token: string; password: string; confirm_password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await publicApiClient.post(`/user/reset-password`, data);
      return response;
    } catch (error: any) {
      showToastError(
        error?.response?.data?.message || "Failed to Reset password"
      );
      return rejectWithValue(error);
    }
  }
);

// **🔹 Verify OTP **
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (
    otpData: {
      loginId: string;
      emailToken: string;
      contactNumberToken: string;
      tokenRequired: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post(
        "/user/verify-email-phone",
        otpData
      );
      const data = response?.data?.data;
      // Store tokens in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.access_token);
        Cookies.set("token", data.access_token, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
        localStorage.setItem("refreshToken", data.refresh_token);
        Cookies.set("refreshToken", data.refresh_token, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
        Cookies.set("contact_no_verified", "true", {
          ...cookiesOptions,
          sameSite: "Strict",
        });
      }
      showToastSuccess(data?.message || "OTP Verified Successfully");
      return {
        access_token: data.access_token,
        verified_user: data.is_verified,
      };
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "OTP verification failed"
      );
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

// **🔹 Resend OTP **
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (otpData: { loginId: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        "/user/resend-verification",
        otpData
      );
      const result = response?.data?.data;
      // Store tokens in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "contact_no_verification_token",
          result.contact_no_verification_token
        );
        Cookies.set(
          "contact_no_verification_token",
          result.contact_no_verification_token,
          {
            ...cookiesOptions,
            sameSite: "Strict",
          }
        );
        localStorage.setItem(
          "email_verification_token",
          result.email_verification_token
        );
        Cookies.set(
          "email_verification_token",
          result.email_verification_token,
          {
            ...cookiesOptions,
            sameSite: "Strict",
          }
        );
      }
      showToastSuccess(result?.message || "OTP Resend Successfully");
      return result;
    } catch (error: any) {
      // showToastError(error.response?.data?.message || "OTP resend failed");
      return rejectWithValue(
        error.response?.data?.message || "OTP resend failed"
      );
    }
  }
);

// **🔹 Fetch Current User Data Thunk**
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/user/me"); // Protected route
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

// **🔹 Fetch Organization List Thunk **

export const fetchOrganizationList = createAsyncThunk(
  "auth/fetchOrganizationList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/user/organization-list");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch organization list"
      );
    }
  }
);

// **🔹 Fetch Organization List Thunk **

export const selectOrganization = createAsyncThunk(
  "auth/selectOrganization",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/change-user-loc", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to select organization"
      );
    }
  }
);

// **🔹 Logout User **
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/user/logout");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// **🔹 Auth Slice **
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle Signup
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.data.data.access_token;
      state.user = action.payload.data.data;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle Verified User Data
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle Fetching User Data
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.verified_user = action.payload.verified_user;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle Forgot Password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.user = null;
    });

    // Handle Fetch Organization List
    builder.addCase(fetchOrganizationList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrganizationList.fulfilled, (state, action) => {
      state.loading = false;
      state.organizationList = action.payload?.data;
    });
    builder.addCase(fetchOrganizationList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle Select Organization
    builder.addCase(selectOrganization.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(selectOrganization.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedOrganization = action.payload.data;
    });
    builder.addCase(selectOrganization.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;

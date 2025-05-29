import axios from "axios";
import Cookies from "js-cookie";
import { cookiesOptions } from "../utils/constant";
import { showToastError } from "../utils/helpers";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

// Function to get token from localStorage
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }
  return null;
};

const getCurrentAddress = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("curAddress") || sessionStorage.getItem("curAddress")
    );
  }
  return null;
};

const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken")
    );
  }
  return null;
};

// Function to clear storage and redirect to login
export const handleClearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();

  Cookies.remove("token", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });
  Cookies.remove("curAddress", { path: "/" });
  Cookies.remove("rememberMe", { path: "/" });
  Cookies.remove("contact_no_verification_token", { path: "/" });
  Cookies.remove("email_verification_token", { path: "/" });
  Cookies.remove("user", { path: "/" });
  Cookies.remove("contact_no_verified", { path: "/" });
  Cookies.remove("organizations", { path: "/" });
  Cookies.remove("first_organisation", { path: "/" });
  window.location.href = "/signin"; // Redirect to login page
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("Session expired. Please sign in again.");
    }

    const payload = {
      refresh_token: refreshToken,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
      payload
    );

    const {
      access_token,
      refresh_token: newRefreshToken,
      x_cur_add,
    } = response.data.data;

    if (access_token && newRefreshToken) {
      if (localStorage.getItem("rememberMe") === "true") {
        localStorage.setItem("token", access_token);
        Cookies.set("token", access_token, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
        localStorage.setItem("refreshToken", newRefreshToken);
        Cookies.set("refreshToken", newRefreshToken, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
        localStorage.setItem("curAddress", x_cur_add);
        Cookies.set("curAddress", x_cur_add, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
      } else {
        sessionStorage.setItem("token", access_token);
        Cookies.set("token", access_token, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
        sessionStorage.setItem("refreshToken", newRefreshToken);
        Cookies.set("refreshToken", newRefreshToken, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
        sessionStorage.setItem("curAddress", x_cur_add);
        Cookies.set("curAddress", x_cur_add, {
          ...cookiesOptions,
          sameSite: "Strict",
        });
      }
    }
    return access_token;
  } catch (error: any) {
    handleClearStorage();
    showToastError(error.message || "Session expired. Please sign in again.");
    return null;
  }
};

// Request Interceptor - Adds Authorization Header
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    const curAddress = getCurrentAddress();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["x-cur-add"] = curAddress;
    }
    return config;
  },
  (error) => {
    showToastError("Request Error. Please try again.");
    return Promise.reject(error);
  }
);

// Response Interceptor - Handles Errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log("error :>> ", error);

    if (!error.response) {
      showToastError("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    const status = error.response.status;
    // const errorMessage = error.response.data?.message || "An error occurred.";
    console.log("error.response :>> ", error.response);

    // Unauthorized (401) - Try to refresh token
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }
    }

    // // Forbidden (403) - Access Denied
    // if (status === 403) {
    //   toast.error("Access Denied. You do not have permission.");
    // }

    // // Not Found (404)
    // if (status === 404) {
    //   toast.error("Requested resource not found.");
    // }

    // // Bad Request (400)
    // if (status === 400) {
    //   toast.error(errorMessage);
    // }

    // // Internal Server Error (500)
    // if (status === 500) {
    //   toast.error("Server error. Please try again later.");
    // }

    return Promise.reject(error);
  }
);

export default apiClient;

// export const handleClearStorage = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("refreshToken");
//   localStorage.removeItem("curAddress");
//   localStorage.removeItem("rememberMe");
//   sessionStorage.removeItem("token");
//   sessionStorage.removeItem("refreshToken");
//   sessionStorage.removeItem("curAddress");
//   localStorage.removeItem("contact_no_verification_token");
//   localStorage.removeItem("email_verification_token");
//   localStorage.removeItem("user");
//   Cookies.remove("token", { path: "/" });
//   Cookies.remove("refreshToken", { path: "/" });
//   Cookies.remove("curAddress", { path: "/" });
//   Cookies.remove("rememberMe", { path: "/" });
//   Cookies.remove("contact_no_verification_token", { path: "/" });
//   Cookies.remove("email_verification_token", { path: "/" });
//   Cookies.remove("user", { path: "/" });
//   Cookies.remove("contact_no_verified", { path: "/" });
//   Cookies.remove("organizations", { path: "/" });
//   Cookies.remove("first_organisation", { path: "/" });
// };

export const handleClearStorageOnOTP = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("curAddress");
  localStorage.removeItem("rememberMe");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("curAddress");
  localStorage.removeItem("user");
  Cookies.remove("token", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });
  Cookies.remove("curAddress", { path: "/" });
  Cookies.remove("rememberMe", { path: "/" });
  Cookies.remove("user", { path: "/" });
  Cookies.remove("contact_no_verified", { path: "/" });
  Cookies.remove("organizations", { path: "/" });
  Cookies.remove("first_organisation", { path: "/" });
};

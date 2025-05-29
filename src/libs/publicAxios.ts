import axios from "axios";

// ✅ Create Axios instance for public API requests (No auth required)
const publicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
  //   timeout: 10000, // ⏳ Timeout after 10 seconds
});

// ✅ Global Error Handling (Optional)
publicApiClient.interceptors.response.use(
  (response) => response, // Pass successful responses as they are
  (error) => Promise.reject(error)
);

export default publicApiClient;

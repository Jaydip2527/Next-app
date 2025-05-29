import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/@/libs/axios";
import { showToastError, showToastSuccess } from "@/@/utils/helpers";
import { ERROR_MESSAGE } from "@/@/utils/errorMessages";

interface UserState {
  users: any;
  userList: any;
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  userList: {
    data: [],
    total_records: 0,
  },
  user: null,
  loading: false,
  error: null,
};

export const fetchAllUser = createAsyncThunk(
  "user/fetchAllUser",
  async (
    { page, limit, search, sortBy, sortOrder, is_with_respect_branch }: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.get("/user", {
        params: {
          page,
          limit,
          search,
          sortBy,
          sortOrder,
          is_with_respect_branch,
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.USER_LIST_FAILED
      );
    }
  }
);

// ** Async Thunks for API calls **
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (
    { page, limit, search, sortBy, sortOrder }: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.get("/user-invitation", {
        params: { page, limit, search, sortBy, sortOrder },
      });
      return response.data.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || ERROR_MESSAGE.USER_LIST_FAILED
      );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.USER_LIST_FAILED
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user-invitation", data);
      if (response.data.data?.errors?.length > 0) {
        showToastError(
          response.data.data.errors[0].message ||
            ERROR_MESSAGE.USER_CREATE_FAILED
        );
      } else {
        showToastSuccess(
          response.data?.data?.user_invitation_inserted[0].message ||
            ERROR_MESSAGE.USER_CREATE_SUCCESS
        );
      }
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.USER_CREATE_FAILED
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/user-invitation/${id}`, data);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.USER_UPDATE_SUCCESS
      );
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || ERROR_MESSAGE.USER_UPDATE_FAILED
      );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.USER_UPDATE_FAILED
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/user-invitation/${id}`);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.USER_DELETE_SUCCESS
      );
      return response?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || ERROR_MESSAGE.USER_DELETE_FAILED
      );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.USER_DELETE_FAILED
      );
    }
  }
);

// export const fetchSingleUser = createAsyncThunk(
//   "user/fetchSingleUser",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.get(`/user-invitation/${id}`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || ERROR_MESSAGE.USER_FETCH_FAILED);
//     }
//   }
// );

// ** Slice for User **
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    resetUser(state) {
      state.user = null; // Clears the user state on signout
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch All User
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // // fetch single User
    // .addCase(fetchSingleUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchSingleUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    // })
    // .addCase(fetchSingleUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

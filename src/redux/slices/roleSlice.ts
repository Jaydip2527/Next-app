import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../libs/axios";

interface RoleState {
  roleList: any;
  orgRoleList: any;
  role: any;
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roleList: [],
  orgRoleList: [],
  role: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/role`);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch roles");
    }
  }
);

export const fetchRolesByOrgId = createAsyncThunk(
  "role/fetchRolesByOrgId",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/organization/${id}/role`);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch roles");
    }
  }
);

// ** Slice for Role **
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
    resetRole(state) {
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roleList = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Roles by Organization ID
      .addCase(fetchRolesByOrgId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesByOrgId.fulfilled, (state, action) => {
        state.loading = false;
        state.orgRoleList = action.payload;
      })
      .addCase(fetchRolesByOrgId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRole, resetRole } = roleSlice.actions;

export default roleSlice.reducer;

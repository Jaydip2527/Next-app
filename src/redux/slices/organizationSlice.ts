import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/@/libs/axios";
import { showToastError, showToastSuccess } from "@/@/utils/helpers";

interface OrganizationState {
  organizationsList: any;
  organization: any;
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationState = {
  organizationsList: {
    data: [],
    total_records: 0,
  },
  organization: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchOrganizations = createAsyncThunk(
  "organization/fetchOrganizations",
  async (
    { page, limit, search, sortBy, sortOrder }: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.get("/organization", {
        params: { page, limit, search, sortBy, sortOrder },
      });
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to fetch organizationsList"
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch organizationsList"
      );
    }
  }
);

export const createOrganization = createAsyncThunk(
  "organization/createOrganization",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/organization", data);
      showToastSuccess(
        response.data.message || "Organization created successfully"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create organization"
      );
    }
  }
);

export const updateOrganization = createAsyncThunk(
  "organization/updateOrganization",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/organization/${id}`, data);
      showToastSuccess(
        response.data.message || "Organization updated successfully"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update organization"
      );
    }
  }
);

export const deleteOrganization = createAsyncThunk(
  "organization/deleteOrganization",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/organization/${id}`);
      showToastSuccess(
        response.data.message || "Organization removed successfully"
      );
      return response?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Organization removed failed"
      );
      return rejectWithValue(
        error.response?.data || "Failed to delete organization"
      );
    }
  }
);

// ** Slice for Organizations **
const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizations(state, action) {
      state.organization = action.payload;
    },
    resetOrganization(state) {
      state.organization = null; // Clears the organization state on signout
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Organizations
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationsList = action.payload?.data;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Organization
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationsList.push(action.payload);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Organization
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Organization
      .addCase(deleteOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganization.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setOrganizations, resetOrganization } =
  organizationSlice.actions;

export default organizationSlice.reducer;

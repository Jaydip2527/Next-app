import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/@/libs/axios";
import { showToastError, showToastSuccess } from "@/@/utils/helpers";

interface OrganizationBranchState {
  allbranchesList: any;
  orgBranchesList: any[];
  branchesList: any[];
  branch: any;
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationBranchState = {
  allbranchesList: null,
  orgBranchesList: [],
  branchesList: [],
  branch: null,
  loading: false,
  error: null,
};

// ** Fetch all organization branches **
export const fetchOrganizationBranches = createAsyncThunk(
  "organizationBranch/fetchOrganizationBranches",
  async (params: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/organization-branch", { params });
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to fetch organization branches"
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branches"
      );
    }
  }
);

// ** Fetch a single branch by ID **
export const fetchOrganizationBranchById = createAsyncThunk(
  "organizationBranch/fetchOrganizationBranchById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/organization-branch/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

// ** Create a new organization branch **

// Assuming you have an API function to create an organization branch
export const createOrganizationBranch = createAsyncThunk(
  "organization/createBranch",
  async (args: { organization_id: string; data: any }, { rejectWithValue }) => {
    const { organization_id, data } = args;

    try {
      const response = await apiClient.post(
        `/organization-branch?organization_id=${organization_id}`,
        data
      );
      showToastSuccess(
        response.data.message || "Organization branch created successfully"
      );
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to create organization branch"
      );
      return rejectWithValue(
        error.response?.data || "Failed to create organization branch"
      );
    }
  }
);

// ** Update an existing branch **
export const updateOrganizationBranch = createAsyncThunk(
  "organizationBranch/updateOrganizationBranch",
  async (
    { id, data }: { id: string | number; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(
        `/organization-branch/${id}`,
        data
      );
      showToastSuccess(
        response.data.message || "Organization branch updated successfully"
      );
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to update organization branch"
      );
      return rejectWithValue(
        error.response?.data || "Failed to update organization branch"
      );
    }
  }
);

// ** Delete an organization branch **
export const deleteOrganizationBranch = createAsyncThunk(
  "organizationBranch/deleteOrganizationBranch",
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/organization-branch/${id}`);
      showToastSuccess("Organization branch deleted successfully");
      return id;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to delete organization branch"
      );
      return rejectWithValue(
        error.response?.data || "Failed to delete organization branch"
      );
    }
  }
);

export const fetchOrganizationBranchByOrgId = createAsyncThunk(
  "organizationBranch/fetchOrganizationBranchByOrgId",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/organization-branch/organization/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchBranchesbyOrgId = createAsyncThunk(
  "organizationBranch/fetchBranchesbyOrgId",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/organization-branch/organization/${id}`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

// ** Slice for Organization Branches **
const organizationBranchSlice = createSlice({
  name: "organizationBranch",
  initialState,
  reducers: {
    setOrganizationBranch(state, action) {
      state.branch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Organization Branches
      .addCase(fetchOrganizationBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.allbranchesList = action.payload?.data;
      })
      .addCase(fetchOrganizationBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Single Organization Branch
      .addCase(fetchOrganizationBranchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationBranchById.fulfilled, (state, action) => {
        state.loading = false;
        state.branch = action.payload.data;
      })
      .addCase(fetchOrganizationBranchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Organization Branch
      .addCase(createOrganizationBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganizationBranch.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrganizationBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Organization Branch
      .addCase(updateOrganizationBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizationBranch.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrganizationBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Organization Branch
      .addCase(deleteOrganizationBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganizationBranch.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrganizationBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrganizationBranchByOrgId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationBranchByOrgId.fulfilled, (state, action) => {
        state.loading = false;
        state.branchesList = action.payload.data;
      })
      .addCase(fetchOrganizationBranchByOrgId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBranchesbyOrgId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranchesbyOrgId.fulfilled, (state, action) => {
        state.loading = false;
        state.orgBranchesList = action.payload;
      })
      .addCase(fetchBranchesbyOrgId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setOrganizationBranch } = organizationBranchSlice.actions;

export default organizationBranchSlice.reducer;

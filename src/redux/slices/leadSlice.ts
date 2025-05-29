import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../libs/axios";
import { showToastError, showToastSuccess } from "../../utils/helpers";

interface LeadState {
  leadList: any;
  lead: any;
  loading: boolean;
  error: string | null;
  assignees: any;
  tags: any;
  leadStatus: any;
  leadPriority: any;
  leadStatusList: any;
}

const initialState: LeadState = {
  leadList: [],
  lead: null,
  loading: false,
  error: null,
  assignees: null,
  tags: null,
  leadStatus: null,
  leadPriority: null,
  leadStatusList: null,
};

// ** Async Thunks for API calls **
export const fetchLeads = createAsyncThunk(
  "lead/fetchLeads",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tnt-lead", { params });
      return response?.data?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch leads");
    }
  }
);

export const getLeadById = createAsyncThunk(
  "lead/getLeadById",
  async (id: string | string[], { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-lead/${id}`);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch lead");
    }
  }
);

export const createLead = createAsyncThunk(
  "lead/createLead",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/tnt-lead", data);
      showToastSuccess(response.data.message || "Lead created successfully");
      return response.data?.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage?.length > 0) {
        errorMessage?.map((msg: string) => showToastError(msg));
      } else {
        showToastError(errorMessage || "Failed to create lead");
      }
      return rejectWithValue(errorMessage || "Failed to create lead");
    }
  }
);

export const updateLead = createAsyncThunk(
  "lead/updateLead",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-lead/${id}`, data);
      showToastSuccess(response.data.message || "Lead updated successfully");
      return response.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Failed to update lead");
      return rejectWithValue(error.response?.data || "Failed to update lead");
    }
  }
);

export const deleteLead = createAsyncThunk(
  "lead/deleteLead",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/tnt-lead/${id}`);
      showToastSuccess(response.data.message || "Lead removed successfully");
      return response?.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Lead removal failed");
      return rejectWithValue(error.response?.data || "Failed to delete lead");
    }
  }
);

// ** Additional API Calls **
export const getAssignees = createAsyncThunk(
  "lead/getAssignees",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-lead/${id}/assignees`);
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch assignees"
      );
    }
  }
);

export const updateAssignees = createAsyncThunk(
  "lead/updateAssignees",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-lead/${id}/assignees`, data);
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to update assignees"
      );
      return rejectWithValue(
        error.response?.data || "Failed to update assignees"
      );
    }
  }
);

export const getTags = createAsyncThunk(
  "lead/getTags",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-lead/${id}/tags`);
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch tags");
    }
  }
);

export const updateTags = createAsyncThunk(
  "lead/updateTags",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-lead/${id}/tags`, data);
      return response.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Failed to update tags");
      return rejectWithValue(error.response?.data || "Failed to update tags");
    }
  }
);

export const getLeadStatus = createAsyncThunk(
  "lead/getLeadStatus",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-lead/${id}/status`);
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead status"
      );
    }
  }
);

export const updateLeadStatus = createAsyncThunk(
  "lead/updateLeadStatus",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-lead/${id}/status`, data);
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to update lead status"
      );
      return rejectWithValue(
        error.response?.data || "Failed to update lead status"
      );
    }
  }
);

export const getAllLeadStatus = createAsyncThunk(
  "lead/getAllLeadStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-lead/lead/status`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update lead status"
      );
    }
  }
);

export const getLeadPriority = createAsyncThunk(
  "lead/getLeadPriority",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-lead/${id}/priority`);
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead priority"
      );
    }
  }
);

export const updateLeadPriority = createAsyncThunk(
  "lead/updateLeadPriority",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-lead/${id}/priority`, data);
      return response.data.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to update lead priority"
      );
      return rejectWithValue(
        error.response?.data || "Failed to update lead priority"
      );
    }
  }
);

// ** Slice for Lead **
const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    setLead(state, action) {
      state.lead = action.payload;
    },
    resetLead(state) {
      state.lead = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Leads
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leadList = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Lead By Id
      .addCase(getLeadById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadById.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
      })
      .addCase(getLeadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Lead
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leadList = action.payload;
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Lead
      .addCase(updateLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLead.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Lead
      .addCase(deleteLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLead.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getAssignees
      .addCase(getAssignees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignees.fulfilled, (state, action) => {
        state.loading = false;
        state.assignees = action.payload;
      })
      .addCase(getAssignees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getTags
      .addCase(getTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getLeadStatus
      .addCase(getLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.leadStatus = action.payload;
      })
      .addCase(getLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateAssignees
      .addCase(updateAssignees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAssignees.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAssignees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateLeadStatus
      .addCase(updateLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeadStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateTag
      .addCase(updateTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTags.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getAllLeadStatus
      .addCase(getAllLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLeadStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.leadStatusList = action.payload;
      })
      .addCase(getAllLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getLeadPriority
      .addCase(getLeadPriority.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadPriority.fulfilled, (state, action) => {
        state.loading = false;
        state.leadPriority = action.payload;
      })
      .addCase(getLeadPriority.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateLeadPriority
      .addCase(updateLeadPriority.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeadPriority.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateLeadPriority.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLead, resetLead } = leadSlice.actions;

export default leadSlice.reducer;

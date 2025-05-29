import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../libs/axios";
import { showToastError, showToastSuccess } from "../../utils/helpers";

interface LeadTaskState {
  leadTaskList: any;
  leadTaskStatus: any;
  leadTask: any;
  loading: boolean;
  error: string | null;
}

const initialState: LeadTaskState = {
  leadTaskList: [],
  leadTaskStatus: [],
  leadTask: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **

// Fetch Lead Tasks
export const fetchLeadTasks = createAsyncThunk(
  "leadTask/fetchLeadTasks",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tnt-task", { params });
      return response?.data?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to fetch lead tasks"
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead tasks"
      );
    }
  }
);

// Fetch Lead Task
export const fetchTaskbyId = createAsyncThunk(
  "leadTask/fetchTaskbyId",
  async ({ id, params }: { id: any; params: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-task/${id}`, { params });
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch lead task"
      );
    }
  }
);

// Create Lead Task
export const createLeadTask = createAsyncThunk(
  "leadTask/createLeadTask",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/tnt-task", data);
      showToastSuccess(
        response.data.message || "Lead task created successfully"
      );
      return response.data?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Lead task creation failed"
      );
      return rejectWithValue(
        error.response?.data || "Failed to create lead task"
      );
    }
  }
);

// Update Lead Task
export const updateLeadTask = createAsyncThunk(
  "leadTask/updateLeadTask",
  async (
    { id, data, params }: { id: any; data: any; params: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(`/tnt-task/${id}`, data, {
        params,
      });
      showToastSuccess(
        response.data.message || "Lead task updated successfully"
      );
      return response.data?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Lead task update failed"
      );
      return rejectWithValue(
        error.response?.data || "Failed to update lead task"
      );
    }
  }
);

// Delete Lead Task
export const deleteLeadTask = createAsyncThunk(
  "leadTask/deleteLeadTask",
  async ({ id, params }: { id: string; params: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/tnt-task/${id}`, { params });
      showToastSuccess(
        response.data.message || "Lead task removed successfully"
      );
      return response?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Lead task removal failed"
      );
      return rejectWithValue(
        error.response?.data || "Failed to delete lead task"
      );
    }
  }
);

// Update Lead Task Status
export const getLeadTaskStatus = createAsyncThunk(
  "leadTask/getLeadTaskStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-lead/tasks/status`);

      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to get lead task status"
      );
    }
  }
);

// ** Slice for Lead Task **
const leadTaskSlice = createSlice({
  name: "leadTask",
  initialState,
  reducers: {
    setLeadTask(state, action) {
      state.leadTask = action.payload;
    },
    resetLeadTask(state) {
      state.leadTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Lead Tasks
      .addCase(fetchLeadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.leadTaskList = action.payload;
      })
      .addCase(fetchLeadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Lead Task by ID
      .addCase(fetchTaskbyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskbyId.fulfilled, (state, action) => {
        state.loading = false;
        state.leadTask = action.payload;
      })
      .addCase(fetchTaskbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Lead Task
      .addCase(createLeadTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeadTask.fulfilled, (state) => {
        state.loading = false;
        // state.leadTaskList.push(action.payload);
      })
      .addCase(createLeadTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Lead Task
      .addCase(updateLeadTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeadTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateLeadTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Lead Task
      .addCase(deleteLeadTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeadTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLeadTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Lead Task Status
      .addCase(getLeadTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadTaskStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.leadTaskStatus = action.payload;
      })
      .addCase(getLeadTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLeadTask, resetLeadTask } = leadTaskSlice.actions;

export default leadTaskSlice.reducer;

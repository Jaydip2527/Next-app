import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_MESSAGE } from "@/@/utils/errorMessages";
import apiClient from "../../libs/axios";
import { showToastError, showToastSuccess } from "../../utils/helpers";

interface LeadStatusState {
  tntStatusList: any;
  leadStatusList: any;
  leadStatus: any;
  loading: boolean;
  error: string | null;
}

const initialState: LeadStatusState = {
  tntStatusList: [],
  leadStatusList: [],
  leadStatus: null,
  loading: false,
  error: null,
};

export const fetchAllTntStatus = createAsyncThunk(
  "leadStatus/fetchAllTntStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tnt-status");
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_STATUS_LIST_FAILED
      );
    }
  }
);

// ** Async Thunks for API calls **
export const fetchLeadStatus = createAsyncThunk(
  "leadStatus/fetchLeadStatus",
  async (
    { page, limit, search, sortBy, sortOrder, organizationId }: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.get("/tnt-template/tnt_status-list", {
        params: {
          page,
          limit,
          search,
          sortBy,
          sortOrder,
          module: "lead",
          organizationId,
        },
      });
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_STATUS_LIST_FAILED
      );
    }
  }
);

export const createLeadStatus = createAsyncThunk(
  "leadStatus/createLeadStatus",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/tnt-status", data);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.LEAD_STATUS_CREATE_SUCCESS
      );
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || ERROR_MESSAGE.LEAD_STATUS_CREATE_FAILED
      );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_STATUS_CREATE_FAILED
      );
    }
  }
);

export const updateLeadStatus = createAsyncThunk(
  "leadStatus/updateLeadStatus",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-status/${id}`, data);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.LEAD_STATUS_UPDATE_SUCCESS
      );
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || ERROR_MESSAGE.LEAD_STATUS_UPDATE_FAILED
      );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_STATUS_UPDATE_FAILED
      );
    }
  }
);

export const deleteLeadStatus = createAsyncThunk(
  "leadStatus/deleteLeadStatus",
  async (
    {
      id,
      organizationId,
      module,
    }: { id: string; organizationId: string; module: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.delete(`/tnt-status/${id}`, {
        params: { organizationId, module },
      });
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.LEAD_STATUS_DELETE_SUCCESS
      );
      return response?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || ERROR_MESSAGE.LEAD_STATUS_DELETE_FAILED
      );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_STATUS_DELETE_FAILED
      );
    }
  }
);

export const fetchSingleLeadStatus = createAsyncThunk(
  "user/fetchSingleLeadStatus",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-status/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.USER_FETCH_FAILED
      );
    }
  }
);

// ** Slice for LeadStatus **
const leadStatusSlice = createSlice({
  name: "leadStatus",
  initialState,
  reducers: {
    setLeadStatus(state, action) {
      state.leadStatus = action.payload;
    },
    resetLeadStatus(state) {
      state.leadStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Tnt Status
      .addCase(fetchAllTntStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTntStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.tntStatusList = action.payload;
      })
      .addCase(fetchAllTntStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch LeadStatus
      .addCase(fetchLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.leadStatusList = action.payload;
      })
      .addCase(fetchLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Single LeadStatus
      .addCase(fetchSingleLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleLeadStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.leadStatus = action.payload;
      })
      .addCase(fetchSingleLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create LeadStatus
      .addCase(createLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeadStatus.fulfilled, (state) => {
        state.loading = false;
        // state.leadStatusList = [...state.leadStatusList, action.payload];
      })
      .addCase(createLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update LeadStatus
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
      // Delete LeadStatus
      .addCase(deleteLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeadStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLeadStatus, resetLeadStatus } = leadStatusSlice.actions;

export default leadStatusSlice.reducer;

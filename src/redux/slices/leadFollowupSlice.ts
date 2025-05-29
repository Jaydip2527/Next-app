import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/@/libs/axios";
import { showToastError, showToastSuccess } from "@/@/utils/helpers";
import { ERROR_MESSAGE } from "@/@/utils/errorMessages";

interface LeadFollowupState {
  leadFollowupList: any;
  leadFollowup: any;
  loading: boolean;
  error: string | null;
}

const initialState: LeadFollowupState = {
  leadFollowupList: {
    data: [],
    total_records: 0,
  },
  leadFollowup: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchLeadFollowup = createAsyncThunk(
  "leadFollowup/fetchLeadFollowup",
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-lead/${id}/notes`, {
        params: data,
      });
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message ||
          ERROR_MESSAGE.LEAD_FOLLOW_UP_LIST_FAILED
      );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_FOLLOW_UP_LIST_FAILED
      );
    }
  }
);

export const createLeadFollowup = createAsyncThunk(
  "leadFollowup/createLeadFollowup",
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/tnt-lead/${id}/notes`, data);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.LEAD_FOLLOW_UP_CREATE_SUCCESS
      );
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message ||
          ERROR_MESSAGE.LEAD_FOLLOW_UP_CREATE_FAILED
      );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_FOLLOW_UP_CREATE_FAILED
      );
    }
  }
);

// ** Slice for LeadFollowup **
const leadFollowupSlice = createSlice({
  name: "leadFollowup",
  initialState,
  reducers: {
    setLeadFollowup(state, action) {
      state.leadFollowup = action.payload;
    },
    resetLeadFollowup(state) {
      state.leadFollowup = null; // Clears the leadFollowup state on signout
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch LeadFollowup
      .addCase(fetchLeadFollowup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadFollowup.fulfilled, (state, action) => {
        state.loading = false;
        state.leadFollowupList = action.payload?.data;
      })
      .addCase(fetchLeadFollowup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create LeadFollowup
      .addCase(createLeadFollowup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeadFollowup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createLeadFollowup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLeadFollowup, resetLeadFollowup } = leadFollowupSlice.actions;

export default leadFollowupSlice.reducer;

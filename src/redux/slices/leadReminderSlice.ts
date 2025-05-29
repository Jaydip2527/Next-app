import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/@/libs/axios";
import { showToastSuccess } from "@/@/utils/helpers";
import { ERROR_MESSAGE } from "@/@/utils/errorMessages";

interface LeadReminderState {
  leadReminderList: any;
  leadReminder: any;
  loading: boolean;
  error: string | null;
}

const initialState: LeadReminderState = {
  leadReminderList: {
    data: [],
    total_records: 0,
  },
  leadReminder: null,
  loading: false,
  error: null,
};

// // ** Async Thunks for API calls **
// export const fetchLeadReminder = createAsyncThunk(
//   "leadReminder/fetchLeadReminder",
//   async ({ page, limit, search, sortBy, sortOrder, SourceId, SourceType }: any, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.get("/tnt-reminders", {
//         params: { page, limit, search, sortBy, sortOrder, SourceId, SourceType },
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data || ERROR_MESSAGE.LEAD_REMINDER_LIST_FAILED
//       );
//     }
//   }
// );

export const createLeadReminder = createAsyncThunk(
  "leadReminder/createLeadReminder",
  async ({ id, data }: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/tnt-lead/${id}/reminders`, data);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.LEAD_REMINDER_CREATE_SUCCESS
      );
      return response.data;
    } catch (error: any) {
      // showToastError(
      //   error.response?.data?.message[0] || ERROR_MESSAGE.LEAD_REMINDER_CREATE_FAILED
      // );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_REMINDER_CREATE_FAILED
      );
    }
  }
);

export const updateLeadReminder = createAsyncThunk(
  "leadReminder/updateLeadReminder",
  async ({ id, reminderId, data }: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(
        `/tnt-lead/${id}/reminders/${reminderId}`,
        data
      );
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.LEAD_REMINDER_UPDATE_SUCCESS
      );
      return response.data;
    } catch (error: any) {
      // showToastError(
      //   error.response?.data?.message[0] || ERROR_MESSAGE.LEAD_REMINDER_UPDATE_FAILED
      // );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_REMINDER_UPDATE_FAILED
      );
    }
  }
);

export const deleteLeadReminder = createAsyncThunk(
  "leadReminder/deleteLeadReminder",
  async ({ id, reminderId }: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(
        `/tnt-lead/${id}/reminders/${reminderId}`
      );
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.LEAD_REMINDER_DELETE_SUCCESS
      );
      return response?.data;
    } catch (error: any) {
      // showToastError(
      //   error.response?.data?.message || ERROR_MESSAGE.LEAD_REMINDER_DELETE_FAILED
      // );
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.LEAD_REMINDER_DELETE_FAILED
      );
    }
  }
);

// ** Slice for LeadReminder **
const leadReminderSlice = createSlice({
  name: "leadReminder",
  initialState,
  reducers: {
    setLeadReminder(state, action) {
      state.leadReminder = action.payload;
    },
    resetLeadReminder(state) {
      state.leadReminder = null; // Clears the leadReminder state on signout
    },
  },
  extraReducers: (builder) => {
    builder
      // // Fetch LeadReminder
      // .addCase(fetchLeadReminder.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchLeadReminder.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.leadReminderList = action.payload?.data;
      // })
      // .addCase(fetchLeadReminder.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
      // Create LeadReminder
      .addCase(createLeadReminder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeadReminder.fulfilled, (state) => {
        state.loading = false;
        // state.leadReminderList = [action.payload, ...state.leadReminderList];
      })
      .addCase(createLeadReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update LeadReminder
      .addCase(updateLeadReminder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeadReminder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateLeadReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete LeadReminder
      .addCase(deleteLeadReminder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeadReminder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLeadReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLeadReminder, resetLeadReminder } = leadReminderSlice.actions;

export default leadReminderSlice.reducer;

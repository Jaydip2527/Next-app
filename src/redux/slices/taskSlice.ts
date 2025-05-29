import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../libs/axios";

interface TaskState {
  taskList: any;

  task: any;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  taskList: [],

  task: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-task/task-list`);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch tasks");
    }
  }
);

// ** Slice for Task **
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask(state, action) {
      state.task = action.payload;
    },
    resetTask(state) {
      state.task = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTask, resetTask } = taskSlice.actions;

export default taskSlice.reducer;

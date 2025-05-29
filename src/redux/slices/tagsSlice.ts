import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../libs/axios";
import { showToastError, showToastSuccess } from "../../utils/helpers";

interface TagState {
  tagList: any;
  tag: any;
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  tagList: [],
  tag: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchTags = createAsyncThunk(
  "tag/fetchTags",
  async ({ module }: { module: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tnt-tag", { params: { module } });
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch tags");
    }
  }
);

export const createTag = createAsyncThunk(
  "tag/createTag",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/tnt-tag", data);
      return response.data?.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Failed to create tag");
      return rejectWithValue(error.response?.data || "Failed to create tag");
    }
  }
);

export const updateTag = createAsyncThunk(
  "tag/updateTag",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-tag/${id}`, data);
      return response.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Failed to update tag");
      return rejectWithValue(error.response?.data || "Failed to update tag");
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/tnt-tag/${id}`);
      showToastSuccess(response.data.message || "Tag removed successfully");
      return response?.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Tag removal failed");
      return rejectWithValue(error.response?.data || "Failed to delete tag");
    }
  }
);

// ** Slice for Tag **
const tagsSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTag(state, action) {
      state.tag = action.payload;
    },
    resetTag(state) {
      state.tag = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tags
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tagList = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Tag
      .addCase(createTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tagList = [...state.tagList, action.payload];
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Tag
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTag.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Tag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTag, resetTag } = tagsSlice.actions;

export default tagsSlice.reducer;

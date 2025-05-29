import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../libs/axios";
import { showToastError, showToastSuccess } from "../../utils/helpers";

interface CommentState {
  commentList: any;
  comment: any;
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  commentList: [],
  comment: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (
    { id, taskId, params }: { id: any; taskId: any; params: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.get(
        `/tnt-lead/${id}/tasks/${taskId}/comments`,
        { params }
      );
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (
    { id, taskId, data }: { id: any; taskId: any; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post(
        `/tnt-lead/${id}/tasks/${taskId}/comments`,
        data
      );
      showToastSuccess(response.data.message || "Comment added successfully");
      return response.data?.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Failed to add comment");
      return rejectWithValue(
        error.response?.data || "Failed to create comment"
      );
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (
    {
      id,
      taskId,
      commentId,
      data,
    }: { id: any; taskId: any; commentId: any; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(
        `/tnt-lead/${id}/tasks/${taskId}/comments/${commentId}`,
        data
      );
      showToastSuccess(response.data.message || "Comment updated successfully");
      return response.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to update comment"
      );
      return rejectWithValue(
        error.response?.data || "Failed to update comment"
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (
    { id, taskId, commentId }: { id: any; taskId: any; commentId: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.delete(
        `/tnt-lead/${id}/tasks/${taskId}/comments/${commentId}`
      );
      showToastSuccess(response.data.message || "Comment removed successfully");
      return response?.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Comment removal failed");
      return rejectWithValue(
        error.response?.data || "Failed to delete comment"
      );
    }
  }
);

// ** Slice for Comment **
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComment(state, action) {
      state.comment = action.payload;
    },
    resetComment(state) {
      state.comment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.commentList = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setComment, resetComment } = commentSlice.actions;

export default commentSlice.reducer;

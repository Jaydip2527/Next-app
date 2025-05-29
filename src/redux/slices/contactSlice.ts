import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../libs/axios";
import { showToastError, showToastSuccess } from "../../utils/helpers";

interface ContactState {
  contactList: any;
  contactListWithoutGroupBy: any;
  contact: any;
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contactList: [],
  contactListWithoutGroupBy: [],
  contact: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tnt-contact", { params });
      return response?.data?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to fetch contacts"
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch contacts"
      );
    }
  }
);

// Fetch Contact by ID
export const fetchContactById = createAsyncThunk(
  "contact/fetchContactById",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-contact/${id}`);
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch contact");
    }
  }
);

export const createContact = createAsyncThunk(
  "contact/createContact",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/tnt-contact", data);
      showToastSuccess(response.data.message || "Contact created successfully");
      return response.data?.data;
    } catch (error: any) {
      console.log("error :>> ", error);
      showToastError(
        error.response?.data?.message || "Contact creation failed"
      );
      return rejectWithValue(
        error.response?.data || "Failed to create contact"
      );
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-contact/${id}`, data);

      showToastSuccess(response.data.message || "Contact updated successfully");
      return response.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Contact update failed");
      return rejectWithValue(
        error.response?.data || "Failed to update contact"
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/tnt-contact/${id}`);
      showToastSuccess(response.data.message || "Contact removed successfully");
      return response?.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Contact removal failed");
      return rejectWithValue(
        error.response?.data || "Failed to delete contact"
      );
    }
  }
);

export const fetchContactsWithoutGroupBy = createAsyncThunk(
  "contact/fetchContactsWithoutGroupBy",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tnt-contact/without-group-by", {
        params,
      });
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch contacts"
      );
    }
  }
);

export const deleteLeadContact = createAsyncThunk(
  "contact/deleteLeadContact",
  async ({ id, leadId }: { id: string; leadId: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(
        `/tnt-contact/${id}/lead/${leadId}`
      );
      showToastSuccess(response.data.message || "Contact removed successfully");
      return response?.data;
    } catch (error: any) {
      showToastError(error.response?.data?.message || "Contact removal failed");
      return rejectWithValue(
        error.response?.data || "Failed to delete contact"
      );
    }
  }
);

// ** Slice for Contact **
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContact(state, action) {
      state.contact = action.payload;
    },
    resetContact(state) {
      state.contact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contactList = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Contact by ID
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Contact
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Contacts Without Group By
      .addCase(fetchContactsWithoutGroupBy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactsWithoutGroupBy.fulfilled, (state, action) => {
        state.loading = false;
        state.contactListWithoutGroupBy = action.payload;
      })
      .addCase(fetchContactsWithoutGroupBy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Lead Contact
      .addCase(deleteLeadContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeadContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLeadContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setContact, resetContact } = contactSlice.actions;

export default contactSlice.reducer;

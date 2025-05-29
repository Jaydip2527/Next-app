import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/@/libs/axios";
import { ERROR_MESSAGE } from "@/@/utils/errorMessages";
import { showToastError, showToastSuccess } from "@/@/utils/helpers";
interface CompanyState {
  companyList: any;
  company: any;
  companyContacts: any;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  companyList: [],
  company: null,
  companyContacts: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (
    { page, limit, search, sortBy, sortOrder }: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.get("/tnt-company", {
        params: { page, limit, search, sortBy, sortOrder },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.COMPANY_LIST_FAILED
      );
    }
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/tnt-company", data);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.COMPANY_CREATE_SUCCESS
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.COMPANY_CREATE_FAILED
      );
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/tnt-company/${id}`, data);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.COMPANY_UPDATE_SUCCESS
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.COMPANY_UPDATE_FAILED
      );
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/tnt-company/${id}`);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.COMPANY_DELETE_SUCCESS
      );
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.COMPANY_DELETE_FAILED
      );
    }
  }
);

export const deleteCompanyContact = createAsyncThunk(
  "company/deleteCompanyContact",
  async ({ id, companyId }: { id: string; companyId: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/tnt-contact/${id}/company/${companyId}`);
      showToastSuccess(
        response.data.message || ERROR_MESSAGE.COMPANY_DELETE_SUCCESS
      );
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || ERROR_MESSAGE.COMPANY_DELETE_FAILED
      );
    }
  }
);

export const fetchSingleCompany = createAsyncThunk(
  "company/fetchSingleCompany",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tnt-company/${id}`);
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || ERROR_MESSAGE.COMPANY_FETCH_FAILED);
    }
  }
);

// ** Async Thunks for API calls **
export const fetchCompanyContacts = createAsyncThunk(
  "contact/fetchCompanyContacts",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/tnt-contact", { params });
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch contacts"
      );
    }
  }
);

// ** Slice for Company **
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany(state, action) {
      state.company = action.payload;
    },
    resetCompany(state) {
      state.company = null; // Clears the company state on signout
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Company
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companyList = action.payload.data;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Company
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Company
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetch single Company
      .addCase(fetchSingleCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchSingleCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetch single Company contact
      .addCase(fetchCompanyContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.companyContacts = action.payload;
      })
      .addCase(fetchCompanyContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCompany, resetCompany } = companySlice.actions;

export default companySlice.reducer;

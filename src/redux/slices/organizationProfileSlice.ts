import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/@/libs/axios";
import { showToastError } from "@/@/utils/helpers";

interface OrganizationProfileState {
  organizationTypes: any[];
  industries: any[];
  countries: any[];
  languages: any[];
  currencies: any[];
  states: any[];
  cities: any[];
  organizationSetup: any;
  companyDetails: any;
  taxationDetails: any;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: OrganizationProfileState = {
  organizationTypes: [],
  industries: [],
  countries: [],
  languages: [],
  currencies: [],
  states: [],
  cities: [],
  organizationSetup: null,
  companyDetails: null,
  taxationDetails: null,
  loading: false,
  error: null,
};

// ** Async Thunks for API calls **
export const fetchOrganizationTypes = createAsyncThunk(
  "organizationProfile/fetchOrganizationTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/organization-types");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization types"
      );
    }
  }
);

export const fetchIndustries = createAsyncThunk(
  "organizationProfile/fetchIndustries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/industries");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch industries"
      );
    }
  }
);

export const fetchCountries = createAsyncThunk(
  "organizationProfile/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/master-data/countries");
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch countries"
      );
    }
  }
);

export const fetchLanguages = createAsyncThunk(
  "organizationProfile/fetchLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/master-data/language");
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch languages"
      );
    }
  }
);
export const fetchCurrencies = createAsyncThunk(
  "organizationProfile/fetchCurrencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/master-data/currency");
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch languages"
      );
    }
  }
);
export const fetchStates = createAsyncThunk(
  "organizationProfile/fetchStates",
  async (country_id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/master-data/states?countryId=${country_id}`
      );
      return response?.data?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to fetch languages"
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch languages"
      );
    }
  }
);
export const fetchCities = createAsyncThunk(
  "organizationProfile/fetchCities",
  async (state_id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/master-data/cities?stateId=${state_id}`
      );
      return response?.data?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to fetch languages"
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch languages"
      );
    }
  }
);

export const fetchSingleOrganization = createAsyncThunk(
  "organizationProfile/fetchSingleOrganization",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/organization/${id}`);
      return response.data?.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch single organization"
      );
    }
  }
);

// ** Reducer for saveOrganizationSetup, saveCompanyDetails, and saveTaxationDetails with API call also store data in redux **
export const saveOrganizationSetup = createAsyncThunk(
  "organizationProfile/saveOrganizationSetup",
  async (data: any, { dispatch }) => {
    dispatch(organizationProfileSlice.actions.setOrganizationSetup(data));
  }
);

export const saveCompanyDetails = createAsyncThunk(
  "organizationProfile/saveCompanyDetails",
  async (data: any, { dispatch }) => {
    dispatch(organizationProfileSlice.actions.setCompanyDetails(data));
  }
);

export const createOrganization = createAsyncThunk(
  "organizationProfile/createOrganization",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/organization", data);

      return response?.data?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to create organization"
      );
      return rejectWithValue(
        error.response?.data || "Failed to create organization"
      );
    }
  }
);

export const saveTaxationDetails = createAsyncThunk(
  "organizationProfile/saveTaxationDetails",
  async (data: any, { dispatch }) => {
    dispatch(organizationProfileSlice.actions.setTaxationDetails(data));
  }
);

export const updateOrganization = createAsyncThunk(
  "organizationProfile/updateOrganization",
  async (
    { id, branch_id, data }: { id: string; branch_id: string; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.patch(
        `/organization/${id}?branch_id=${branch_id}`,
        data
      );
      // showToastSuccess("Organization updated successfully");
      return response?.data?.data;
    } catch (error: any) {
      showToastError(
        error.response?.data?.message || "Failed to update organization"
      );
      return rejectWithValue(
        error.response?.data || "Failed to update organization"
      );
    }
  }
);

// ** Slice for Organization Profile **
const organizationProfileSlice = createSlice({
  name: "organizationProfile",
  initialState,
  reducers: {
    setOrganizationSetup: (state, action) => {
      state.organizationSetup = action.payload;
    },
    setCompanyDetails: (state, action) => {
      if (action.payload) {
        state.companyDetails = { ...state.companyDetails, ...action.payload };
      } else {
        state.companyDetails = action.payload;
      }
    },
    setTaxationDetails: (state, action) => {
      state.taxationDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Organization Types
      .addCase(fetchOrganizationTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationTypes = action.payload;
      })
      .addCase(fetchOrganizationTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Industries
      .addCase(fetchIndustries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.loading = false;
        state.industries = action.payload;
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Languages
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Currencies
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch States
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Cities
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Organization
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDetails = { ...state.companyDetails, ...action.payload };
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Organization
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state) => {
        state.loading = false;
        // state.taxationDetails = { ...state.taxationDetails, ...action.payload };
        // state.companyDetails = { ...state.companyDetails, ...action.payload };
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update fetchSingleOrganization
      .addCase(fetchSingleOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.taxationDetails = { ...state.taxationDetails, ...action.payload };
        state.companyDetails = { ...state.companyDetails, ...action.payload };
        state.organizationSetup = {
          organization_type_id: action.payload.organization_type_id,
          industry_id: action.payload.industry_id,
          language_id: action.payload.language_id,
          country_id: action.payload.country_id,
        };
      })
      .addCase(fetchSingleOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export selectors
export const selectOrganizationProfile = (state: any) =>
  state.organizationProfile;

// Export reducer
export default organizationProfileSlice.reducer;

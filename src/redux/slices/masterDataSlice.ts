import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/@/libs/axios";

// Define async thunks for each API call
export const fetchCitiesList = createAsyncThunk(
  "masterData/fetchCitiesList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/master-data/cities");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchCityById = createAsyncThunk(
  "masterData/fetchCityById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/master-data/cities/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchStatesLIst = createAsyncThunk(
  "masterData/fetchStatesLIst",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/master-data/states");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchStateById = createAsyncThunk(
  "masterData/fetchStateById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/master-data/states/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchCountries = createAsyncThunk(
  "masterData/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/master-data/countries");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchCountryById = createAsyncThunk(
  "masterData/fetchCountryById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/master-data/countries/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchCurrencies = createAsyncThunk(
  "masterData/fetchCurrencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/master-data/currency");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchCurrencyById = createAsyncThunk(
  "masterData/fetchCurrencyById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/master-data/currency/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchLanguages = createAsyncThunk(
  "masterData/fetchLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/master-data/language");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

export const fetchLanguageById = createAsyncThunk(
  "masterData/fetchLanguageById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/master-data/language/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch organization branch"
      );
    }
  }
);

const masterDataSlice = createSlice({
  name: "masterData",
  initialState: {
    cityList: [],
    stateList: [],
    countries: [],
    currencies: [],
    languages: [],
    cityById: null,
    stateById: null,
    countryById: null,
    currencyById: null,
    languageById: null,
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesList.fulfilled, (state, action) => {
        state.cityList = action.payload.data;
      })
      .addCase(fetchStatesLIst.fulfilled, (state, action) => {
        state.stateList = action.payload.data;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload.data;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.currencies = action.payload.data;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languages = action.payload.data;
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.cityById = action.payload.data;
      })
      .addCase(fetchStateById.fulfilled, (state, action) => {
        state.stateById = action.payload.data;
      })
      .addCase(fetchCountryById.fulfilled, (state, action) => {
        state.countryById = action.payload.data;
      })
      .addCase(fetchCurrencyById.fulfilled, (state, action) => {
        state.currencyById = action.payload.data;
      })
      .addCase(fetchLanguageById.fulfilled, (state, action) => {
        state.languageById = action.payload.data;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

// Export the actions and the reducer
export default masterDataSlice.reducer;

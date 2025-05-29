import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../redux/slices/authSlice";
import organizationProfileReducer from "../redux/slices/organizationProfileSlice";
import organizationReducer from "../redux/slices/organizationSlice";
import organizationBranchReducer from "../redux/slices/organizationBranchSlice";
import masterDataReducer from "../redux/slices/masterDataSlice";
import leadStatusReducer from "../redux/slices/leadStatusSlice";
import leadReducer from "../redux/slices/leadSlice";
import tagsReducer from "../redux/slices/tagsSlice";
import leadReminderReducer from "../redux/slices/leadReminderSlice";
import contactReducer from "../redux/slices/contactSlice";
import leadTaskReducer from "../redux/slices/leadTaskSlice";
import leadFollowupReducer from "../redux/slices/leadFollowupSlice";
import userReducer from "../redux/slices/userSlice";
import commentReducer from "../redux/slices/commentSlice";
import companyReducer from "../redux/slices/companySlice";
import roleReducer from "../redux/slices/roleSlice";
import taskReducer from "../redux/slices/taskSlice";

// Persist only the 'organization' slice
const persistConfig = {
  key: "organization",
  storage,
  whitelist: ["organization"], // Only persist the 'organization' state
};

const persistedOrganizationReducer = persistReducer(
  persistConfig,
  organizationReducer
);

export const store = configureStore({
  reducer: {
    auth: authReducer, // This won't be persisted
    organizationProfile: organizationProfileReducer,
    organization: persistedOrganizationReducer, // Only this will persist
    organizationBranch: organizationBranchReducer,
    masterData: masterDataReducer,
    leadStatus: leadStatusReducer,
    lead: leadReducer,
    tags: tagsReducer,
    leadReminder: leadReminderReducer,
    contact: contactReducer,
    leadTask: leadTaskReducer,
    leadFollowup: leadFollowupReducer,
    user: userReducer,
    comment: commentReducer,
    company: companyReducer,
    role: roleReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ Disables serializability check
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

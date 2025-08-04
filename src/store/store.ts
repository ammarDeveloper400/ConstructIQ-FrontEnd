import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage by default
import { combineReducers } from "redux";
import fileUploadReducer from "./fileUploadSlice";

// Combine all reducers
const rootReducer = combineReducers({
  fileUpload: fileUploadReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["fileUpload"], // only persist this slice
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // suppress non-serializable warnings (e.g., File object)
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

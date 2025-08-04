import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileUploadState {
  file: File | null;
}

const initialState: FileUploadState = {
  file: null,
};

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    setUploadedFile(state, action: PayloadAction<File>) {
      state.file = action.payload;
    },
    clearFile(state) {
      state.file = null;
    },
  },
});

export const { setUploadedFile, clearFile } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;

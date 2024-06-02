import { configureStore } from "@reduxjs/toolkit";
// import imageReducer from "../reducers/imageReducer";
import imageUploadSlice from "./slices/imageUploadSlice";

export const store = configureStore({
    reducer: {
        image: imageUploadSlice,
    }
})

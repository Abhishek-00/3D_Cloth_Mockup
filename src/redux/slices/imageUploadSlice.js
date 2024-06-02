import { createSlice, createSelector } from "@reduxjs/toolkit";
import image from '/Textures/onePiece.png'

const imageSlice = createSlice({
    name: 'image',
    initialState: {
        image: image,
        preview: true,
        width: 1600,
        height: 1541,
    },
    reducers: {
        setImage: (state, action) => {
            console.log(action)
            state.image = action.payload.image;
            state.preview = action.payload.preview;
            state.width = action.payload.width;
            state.height = action.payload.height;
        },
    }
})

export const getImageSelector = createSelector(state => state.image, state => state)

export const { setImage } = imageSlice.actions;

export default imageSlice.reducer;
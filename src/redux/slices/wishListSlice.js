import { createSlice } from "@reduxjs/toolkit";
const wishListSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addToWishList: (state, action) => {
            const existingItem = state.find((item) => {
                return item.id === action.payload.id
            })
            if (!existingItem) {
                state.push(action.payload)
            }

        },
        removeFromWishList: (state, action) => {
            const index = state.findIndex((item) => {
                return item.id === action.payload.id
            })
            if (index !== -1) {

                state.splice(index, 1)
            }
        },
        restoreWishlist:(action)=>{
            return action.payload
        },
        clearWishlist:()=>{
            return [];
        }

    }
})
export default wishListSlice.reducer;
export const { addToWishList, removeFromWishList, clearWishlist, restoreWishlist } = wishListSlice.actions;
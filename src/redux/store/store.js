import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../slices/authSlice'
import cartSlice from '../slices/cartSlice'
import wishListReducer from '../slices/wishListSlice'
import orderSlice from '../slices/orderSlice'
import productSlice from '../slices/productSlice'
const store = configureStore({
    reducer:{
        auth:loginReducer,
        cart:cartSlice,
        wishlist:wishListReducer,
        orders:orderSlice,
        products:productSlice
    }
})
export default store
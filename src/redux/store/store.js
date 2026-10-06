import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../slices/authSlice'
import cartSlice from '../slices/cartSlice'
import wishListReducer from '../slices/wishListSlice'
import orderSlice from '../slices/orderSlice'
import productSlice from '../slices/productSlice'
import adminSlice from '../../admin/redux/slices/adminSlice.js'
import adminUserSlice from '../../admin/redux/slices/adminUserSlice.js'
import adminProductSlice from '../../admin/redux/slices/adminProductSlice.js';
import adminOrderSlice from '../../admin/redux/slices/adminOrderSlice.js'
const store = configureStore({
    reducer:{
        auth:loginReducer,
        cart:cartSlice,
        wishlist:wishListReducer,
        orders:orderSlice,
        products:productSlice,
        admin:adminSlice,
        adminUsers:adminUserSlice,
        adminProducts :adminProductSlice,
        adminOrders: adminOrderSlice
    }
})
export default store
import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchOrders } from "../../services/orderService";
const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null
    },
    
    extraReducers: (builder) => {

        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload);
            state.loading = false;
            state.error = null;
        });

        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        builder.addCase(fetchOrders.pending,(state)=>{
            state.loading = true;
            state.error= null;
        })
        builder.addCase(fetchOrders.fulfilled,(state,action)=>{
            state.orders = action.payload;
            state.loading=false;
            state.error = null;
        })
        builder.addCase(fetchOrders.rejected,(state,action)=>{
            state.loading = false;
            state.error =action.error.message;
        })
    }
})
export default orderSlice.reducer;

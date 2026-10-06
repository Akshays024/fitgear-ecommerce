import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders, updateOrderStatus } from "../../services/adminOrderService";
const adminOrderSlice = createSlice({
    name:"adminOrders",
    initialState:{
        orders:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllOrders.pending,(state,action)=>{
            state.loading = true;
            state.error = null
        }),
        builder.addCase(getAllOrders.fulfilled,(state,action)=>{
            state.orders = action.payload
            state.loading = false;
            state.error = null
        }),
        builder.addCase(getAllOrders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        }),

        builder.addCase(updateOrderStatus.pending,(state,action)=>{
            state.loading = true;
            state.error = null
        }),
        builder.addCase(updateOrderStatus.fulfilled,(state,action)=>{
            const index = state.orders.findIndex(order =>order.id === action.payload.id)
            if(index !== -1){
                state.orders[index] = action.payload
            }
            state.loading = false;
            state.error = null
        }),
        builder.addCase(updateOrderStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        })
    }
})
export default adminOrderSlice.reducer
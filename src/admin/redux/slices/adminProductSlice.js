import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../../services/adminProductService";
const adminProductSlice = createSlice({
    name:"adminProducts",
    initialState:{
        products:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            state.products = action.payload
            state.loading = false;
            state.error = null;
        }),
        builder.addCase(getAllProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        }),

        builder.addCase(addProduct.pending,(state)=>{
            state.loading=true;
            state.error = null;
        }),
        builder.addCase(addProduct.fulfilled,(state,action)=>{
            state.products.push(action.payload)
            state.loading=false;
            state.error=null;
        }),
        builder.addCase(addProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error.message
        }),

        builder.addCase(deleteProduct.pending,(state)=>{
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            const index = state.products.findIndex(item=>item.id === action.payload)
            if(index !== -1){
                state.products.splice(index, 1)
            }
            state.loading = false;
            state.error = null;
        }),
        builder.addCase(deleteProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        }),

        builder.addCase(updateProduct.pending,(state)=>{
            state.loading=true;
            state.error = null;
        }),
        builder.addCase(updateProduct.fulfilled,(state,action)=>{
            const index = state.products.findIndex(item=>item.id === action.payload.id)
            if(index !== -1){
                state.products[index] = action.payload
            }
            state.loading=false;
            state.error = null
        }),
        builder.addCase(updateProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message
        })


    }
})
export default adminProductSlice.reducer;

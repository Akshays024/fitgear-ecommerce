import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name:"Products",
    initialState:{
        products:[],
        loading:false,
        error:null
    },
    reducers:{
        setProducts:(state,action)=>{
            state.products = action.payload
        },
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        }
    }
})
export const {setError,setLoading,setProducts} = productSlice.actions
export default productSlice.reducer
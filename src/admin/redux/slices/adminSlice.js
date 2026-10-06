import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    admin:null,
    isInitialized:false
}
const adminSlice = createSlice({
    name:"admin",
    initialState:initialState,
    reducers:{
        adminLogin:(state,action)=>{
            state.admin = action.payload
        },
        adminLogout:(state,action)=>{
            state.admin = null
        },
        restoreAdmin:(state,action)=>{
            state.admin = action.payload
            state.isInitialized = true
        }
    }
})
export default adminSlice.reducer;
export const {adminLogin,adminLogout,restoreAdmin} = adminSlice.actions
import {createSlice }from '@reduxjs/toolkit'
const authSlice = createSlice({
    name:"authentication",
    initialState:{
     user:null,
     isInitialized:false   
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },
        logout:(state)=>{
            state.user = null
        },
        restoreUser:(state,action)=>{
            state.user = action.payload
            state.isInitialized=true
        }
    }

})
export default authSlice.reducer
export const {login, logout, restoreUser} = authSlice.actions
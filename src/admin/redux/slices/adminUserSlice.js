import { createSlice } from "@reduxjs/toolkit";
import { blockUser, getAllUsers, unblockUser } from "../../services/adminUserService";
const adminUserSlice = createSlice({
    name: "adminUsers",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null
        }),
            builder.addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.loading = false;
                state.error = null
            }),
            builder.addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            }),

            builder.addCase(blockUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            }),
            builder.addCase(blockUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id)
                if(index !==-1){
                    state.users[index] = action.payload
                }
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(blockUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            }),

            builder.addCase(unblockUser.pending,(state)=>{
                state.loading=  true;
                state.error = null
            }),
             builder.addCase(unblockUser.fulfilled,(state,action)=>{
                const index = state.users.findIndex(user=>user.id === action.payload.id)
                if(index !== -1){
                    state.users[index] = action.payload
                }
                state.loading = false;
                state.error = null
             }),
             builder.addCase(unblockUser.rejected,(state,action)=>{
                state.loading=false;;
                state.error = action.error.message
             })

    }

})
export default adminUserSlice.reducer
export const { setUsers } = adminUserSlice.actions
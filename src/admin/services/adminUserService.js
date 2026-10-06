import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/api";

export const getAllUsers =createAsyncThunk(
    'adminUsers/getAllUsers',
    async()=>{
        const response = await axios.get(`${API_URL}/users`)
        return response.data
    }
)

export const blockUser = createAsyncThunk(
    'adminUsers/blockUser',
    async({id})=>{
        const response = await axios.patch(`${API_URL}/users/${id}`,{
            isBlocked:true
        })
        return response.data
    }
)

export const unblockUser = createAsyncThunk(
    'adminUsers/unblockUser',
    async({id})=>{
        const response = await axios.patch(`${API_URL}/users/${id}`,{
            isBlocked:false
        })
        return response.data
    }
)
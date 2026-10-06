import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/api";
import axios from "axios";
export const getAllOrders = createAsyncThunk(
    'adminOrders/getAllOrders',
    async()=>{
        const response = await axios.get(`${API_URL}/orders`)
        return response.data
    }
)

export const updateOrderStatus = createAsyncThunk(
    'adminOrders/updateOrderStatus',
    async({id,status})=>{
        const response = await axios.patch(`${API_URL}/orders/${id}`,{
            status:status
        })
        return response.data
    }
)
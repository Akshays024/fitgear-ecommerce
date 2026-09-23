import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants/api";
export const createOrder = createAsyncThunk(
    'orders/createorder',
    async (orderData)=>{
        const response = await axios.post(`${API_URL}/orders`,orderData)
        return response.data;
    }
    
)

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async(userId)=>{
        const response = await axios.get(`${API_URL}/orders?userId=${userId}`)
        return response.data;
    }
)
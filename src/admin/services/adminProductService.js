import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../constants/api"

export const getAllProducts = createAsyncThunk(
    'adminProducts/getAllProducts',
    async()=>{
        const response = await axios.get(`${API_URL}/products`)
        return response.data;
    }
)
export const addProduct = createAsyncThunk(
    'adminProducts/addProduct',
    async(newProduct)=>{
        const response = await axios.post(`${API_URL}/products`,newProduct)
        return response.data
    }
)
export const deleteProduct = createAsyncThunk(
    'adminProduct/deleteProduct',
    async(id)=>{
        await axios.delete(`${API_URL}/products/${id}`)
        return id
    }
)
export const updateProduct = createAsyncThunk(
    'adminProducts/updateProduct',
    async({id, updatedProduct})=>{
        const response = await axios.patch(`${API_URL}/products/${id}`,updatedProduct)
        return response.data
    }
)
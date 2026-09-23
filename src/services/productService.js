import axios from "axios";
import { API_URL } from "../constants/api";
export async function getProducts(page, limit, search, category) {
    let url = `${API_URL}/products?title:contains=${search}&_page=${page}&_per_page=${limit}`
    if (category) {
        url += `&category=${category}`
    }
    const response = await axios.get(url)
    return response.data
}
export async function getProductById(id) {
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data
}
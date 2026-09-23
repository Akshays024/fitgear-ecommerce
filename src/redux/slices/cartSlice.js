import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cart.find(product => product.id === action.payload.id)
            const quantityToAdd = action.payload.quantity || 1
            if (existingProduct) {
                if(
                    existingProduct.stock !== undefined && existingProduct.quantity + quantityToAdd > existingProduct.stock
                ){
                    existingProduct.quantity = existingProduct.stock
                    return
                }
                existingProduct.quantity += quantityToAdd
            }
            else {
                const quantity = action.payload.stock !== undefined ?
                Math.min(quantityToAdd, action.payload.stock):
                quantityToAdd

                state.cart.push({
                    ...action.payload,
                    quantity
                })
            }
        },
        removeItem: (state, action) => {
            const index = state.cart.findIndex(product => product.id === action.payload)
            if (index !== -1) {
                state.cart.splice(index, 1)
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cart.find(product => product.id === action.payload)
            if (item.quantity > 1) {
                item.quantity -= 1
            }
            else {
                const index = state.cart.findIndex(product => product.id === action.payload)
                if (index !== -1) {
                    state.cart.splice(index, 1)
                }
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find(product => product.id === action.payload)
            if(item && (
                item.stock === undefined || item.quantity < item.stock
            )){
                item.quantity+=1
            }
        },
        restoreCart:(state,action)=>{
            state.cart = action.payload
        },
        clearCart:(state)=>{
            state.cart = []
        }

    }
})
export default cartSlice.reducer;
export const { addToCart, removeItem, decreaseQuantity, increaseQuantity, restoreCart, clearCart} = cartSlice.actions
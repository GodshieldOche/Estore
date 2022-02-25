import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'



export const postToCart = createAsyncThunk(
    `cart/postToCart`,
    async ({prodId, quantity}, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/cart`, { prodId, quantity }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)


export const getCartItems = createAsyncThunk(
    `cart/getCartItems`,
    async (obj, { rejectWithValue }) => {
        // const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`/api/cart`)
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postDeleteItem = createAsyncThunk(
    `deleteRoom/postDeleteRoom`,
    async ({ id, index }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/cart/${id}`)
            dispatch(deleteOne(index))
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postDeleteItems = createAsyncThunk(
    `deleteRoom/postDeleteRooms`,
    async (obj, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/cart/`)
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        cartItems: [],
        message: null,
        success: null
    },
    reducers: {
        deleteOne: (state, { payload }) => {
            state.cartItems.splice(payload, 1)
        },
    },
    extraReducers: {
        [postToCart.pending]: (state) => {
            state.loading = true
        },
        [postToCart.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postToCart.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [getCartItems.pending]: (state) => {
            state.loading = true
        },
        [getCartItems.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.cartItems = payload.cartItems
        },
        [getCartItems.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postDeleteItem.pending]: (state) => {
            state.loading = true
        },
        [postDeleteItem.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postDeleteItem.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postDeleteItems.pending]: (state) => {
            state.loading = true
        },
        [postDeleteItems.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postDeleteItems.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export const { deleteOne } = cartSlice.actions
export default cartSlice.reducer
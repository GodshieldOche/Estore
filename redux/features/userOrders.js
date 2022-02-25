import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const getCurrentUserOrders = createAsyncThunk(
    `products/getCurrentUserOrders`,
    async (obj, { rejectWithValue }) => {
        // const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`/api/order`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const userOrdersSlice = createSlice({
    name: 'userOrders',
    initialState: {
        loading: false,
        orders: [],
        message: null,
    },
    reducers: {

    },
    extraReducers: {
        [getCurrentUserOrders.pending]: (state) => {
            state.loading = true
        },
        [getCurrentUserOrders.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.orders = payload.orders
        },
        [getCurrentUserOrders.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = userOrdersSlice.actions
export default userOrdersSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'



export const postOrder = createAsyncThunk(
    `order/postOrder`,
    async ({orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingFee, totalPrice }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/order`, { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingFee, totalPrice }, {
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


export const getOrderDetails = createAsyncThunk(
    `order/getOrderDetails`,
    async ({ req, id }, { rejectWithValue }) => {
        const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`${origin}/api/order/${id}`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postUpdatePaid = createAsyncThunk(
    `updateRoom/postUpdatePaid`,
    async ({ orderId, id, status, updateTime, emailAddress }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/order/${orderId}`, {id, status, updateTime, emailAddress }, {
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



const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        order: null,
        message: null,
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [postOrder.pending]: (state) => {
            state.loading = true
        },
        [postOrder.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [postOrder.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [getOrderDetails.pending]: (state) => {
            state.loading = true
        },
        [getOrderDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.order = payload.order
        },
        [getOrderDetails.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postUpdatePaid.pending]: (state) => {
            state.loading = true
        },
        [postUpdatePaid.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.order = payload.order
        },
        [postUpdatePaid.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default orderSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const getAdminOrders = createAsyncThunk(
    `adminOrders/getAdminOrders`,
    async (obj, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/admin/order`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const getAdminOrderDetails = createAsyncThunk(
    `adminOrders/getAdminOrderDetails`,
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/admin/order/${id}`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postUpdateDelivered = createAsyncThunk(
    `adminOrders/postUpdateDelivered`,
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/admin/order/${id}`, {
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

export const postDeleteOrder = createAsyncThunk(
    `adminOrders/postDeleteOrder`,
    async ({ id, index }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/admin/order/${id}`)
            dispatch(deleteOne(index))
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)


const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        loading: false,
        orders: [],
        order: null,
        message: null,
    },
    reducers: {
        deleteOne: (state, { payload }) => {
            state.orders.splice(payload, 1)
        },
    },
    extraReducers: {
        [getAdminOrders.pending]: (state) => {
            state.loading = true
        },
        [getAdminOrders.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.orders = payload.orders
        },
        [getAdminOrders.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [getAdminOrderDetails.pending]: (state) => {
            state.loading = true
        },
        [getAdminOrderDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.order = payload.order
        },
        [getAdminOrderDetails.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postUpdateDelivered.pending]: (state) => {
            state.loading = true
        },
        [postUpdateDelivered.fulfilled]: (state) => {
            state.loading = false
        },
        [postUpdateDelivered.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postDeleteOrder.pending]: (state) => {
            state.loading = true
        },
        [postDeleteOrder.fulfilled]: (state) => {
            state.loading = false
        },
        [postDeleteOrder.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export const { deleteOne } = adminOrdersSlice.actions
export default adminOrdersSlice.reducer
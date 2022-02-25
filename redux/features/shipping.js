import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const getShippingAddress = createAsyncThunk(
    `shipping/getShippingAddress`,
    async (obj, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/order/shipping`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


export const postUpdateAddress = createAsyncThunk(
    `updateRoom/postUpdateAddress`,
    async ( shippingData, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/order/shipping`, shippingData, {
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


const shippingSlice = createSlice({
    name: 'shipping',
    initialState: {
        loading: false,
        shippingAddress: {},
        message: null,
        success: null,
    },
    reducers: {

    },
    extraReducers: {
        [getShippingAddress.pending]: (state) => {
            state.loading = true
        },
        [getShippingAddress.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.shippingAddress = payload.shippingAddress
        },
        [getShippingAddress.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postUpdateAddress.pending]: (state) => {
            state.loading = true
        },
        [postUpdateAddress.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postUpdateAddress.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = shippingSlice.actions
export default shippingSlice.reducer
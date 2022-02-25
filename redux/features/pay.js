import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const postPayStack = createAsyncThunk(
    `pay/postPayStack`,
    async ({ email, amount, callback_url }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`https://api.paystack.co/transaction/initialize`,
                { email, amount, callback_url }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer sk_test_6db217e6fbac2cc4e993a74a7a09762741ce3321",
                }
            })
            
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const verifyPayment = createAsyncThunk(
    `user/verifyPayment`,
    async ({ reference }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                headers: {
                    Authorization: "Bearer sk_test_6db217e6fbac2cc4e993a74a7a09762741ce3321",
                }
            })
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)



const paySlice = createSlice({
    name: 'pay',
    initialState: {
        loading: false,
        message: null,
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [postPayStack.pending]: (state) => {
            state.loading = true
        },
        [postPayStack.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload
        },
        [postPayStack.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [verifyPayment.pending]: (state) => {
            state.loading = true
        },
        [verifyPayment.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload
        },
        [verifyPayment.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default paySlice.reducer
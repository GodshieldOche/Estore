import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const getProdDetails = createAsyncThunk(
    `user/getProdDetails`,
    async ({ req, prodId }, { rejectWithValue }) => {
        const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`${origin}/api/products/${prodId}`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: null,
        message: null,
    },
    reducers: {

    },
    extraReducers: {
        [getProdDetails.pending]: (state) => {
            state.loading = true
        },
        [getProdDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.product = payload.product
        },
        [getProdDetails.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = productSlice.actions
export default productSlice.reducer
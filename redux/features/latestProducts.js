import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const getLatestProducts = createAsyncThunk(
    `latestProducts/getLatestProducts`,
    async (req, { rejectWithValue }) => {
        const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`${origin}/api/latest`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const latestProductsSlice = createSlice({
    name: 'latestProducts',
    initialState: {
        loading: false,
        products: [],
        message: null,
    },
    reducers: {

    },
    extraReducers: {
        [getLatestProducts.pending]: (state) => {
            state.loading = true
        },
        [getLatestProducts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.products = payload.products
        },
        [getLatestProducts.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = latestProductsSlice.actions
export default latestProductsSlice.reducer
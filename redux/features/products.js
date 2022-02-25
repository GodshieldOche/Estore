import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const getAllProducts = createAsyncThunk(
    `products/getAllProducts`,
    async ({ keyword = ''}, { rejectWithValue }) => {
        // const {origin} = absoluteUrl(req)
        try {
            const { data } = await axios.get(`/api?keyword=${keyword}`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        message: null,
    },
    reducers: {

    },
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.loading = true
        },
        [getAllProducts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.products = payload.products
        },
        [getAllProducts.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = productsSlice.actions
export default productsSlice.reducer
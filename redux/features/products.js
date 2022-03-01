import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const getAllProducts = createAsyncThunk(
    `products/getAllProducts`,
    async ({req, keyword = '', category, brand }, { rejectWithValue }) => {
        const {origin} = absoluteUrl(req)
        let link = `${origin}/api?keyword=${keyword}`
        if (category) {
            link = link.concat(`&category=${category}`)
        }
        if (brand) {
            link = link.concat(`&brand=${brand}`)
        }
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const getFilters = createAsyncThunk(
    `user/getFilters`,
    async (req, { rejectWithValue }) => {
        const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`${origin}/api/products/filter`)
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
        categories: [],
        brands: []
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
        [getFilters.pending]: (state) => {
            state.loading = true
        },
        [getFilters.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.categories = payload.categories
            state.brands = payload.brands
        },
        [getFilters.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = productsSlice.actions
export default productsSlice.reducer
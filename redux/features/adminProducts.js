import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const getAdminProducts = createAsyncThunk(
    `adminProducts/getAdminProducts`,
    async (obj, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/products`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        loading: false,
        products: [],
        message: null,
    },
    reducers: {

    },
    extraReducers: {
        [getAdminProducts.pending]: (state) => {
            state.loading = true
        },
        [getAdminProducts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.products = payload.products
        },
        [getAdminProducts.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = adminProductsSlice.actions
export default adminProductsSlice.reducer
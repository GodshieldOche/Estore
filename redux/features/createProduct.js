import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const postProduct = createAsyncThunk(
    `createProduct/postProduct`,
    async (productData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/products`, productData, {
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



const createProductSlice = createSlice({
    name: 'createProduct',
    initialState: {
        loading: false,
        product: null,
        message: null,
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [postProduct.pending]: (state) => {
            state.loading = true
        },
        [postProduct.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
            state.product = payload.product
        },
        [postProduct.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default createProductSlice.reducer
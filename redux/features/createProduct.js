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

export const postAudio = createAsyncThunk(
    `createProduct/postAudio`,
    async ({ audio }, { rejectWithValue }) => {
        
        try {
            const formData = new FormData();
            formData.append("audio", audio)
            const { data } = await axios.post(`/api/products/audio`, formData , {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
        result: {},
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
        [postAudio.pending]: (state) => {
            state.loading = true
        },
        [postAudio.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.result = payload.result
        },
        [postAudio.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default createProductSlice.reducer
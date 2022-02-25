import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const postRegister = createAsyncThunk(
    `register/postRegister`,
    async ({ name, email, password, imageUrl }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/auth/register`, { name, email, password, imageUrl }, {
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



const registerSlice = createSlice({
    name: 'register',
    initialState: {
        loading: false,
        message: null,
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [postRegister.pending]: (state) => {
            state.loading = true
        },
        [postRegister.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [postRegister.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default registerSlice.reducer
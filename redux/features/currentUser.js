import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const loadUser = createAsyncThunk(
    `user/loadUser`,
    async (obj, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/me`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        loading: true,
        user: null,
        message: null,
    },
    reducers: {

    },
    extraReducers: {
        [loadUser.pending]: (state) => {
            state.loading = true
        },
        [loadUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.user
        },
        [loadUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = currentUserSlice.actions
export default currentUserSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const getPendingReviews = createAsyncThunk(
    `user/getPendingReviews`,
    async (obj, { rejectWithValue }) => {
        // const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`/api/review/items`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postReview = createAsyncThunk(
    `register/postReview`,
    async ({ id, name, rating, comment }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/review/${id}`, { name, rating, comment }, {
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

export const postupdateIsReviewed = createAsyncThunk(
    `adminOrders/postupdateIsReviewed`,
    async ({id, orderId}, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/review/${id}`, { orderId }, {
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


export const getProductReviews = createAsyncThunk(
    `user/getProductReviews`,
    async (id, { rejectWithValue }) => {
        // const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`/api/review/${id}`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        loading: false,
        reviews: [],
        reviewItems: [],
        message: null,
    },
    reducers: {

    },
    extraReducers: {
        [getPendingReviews.pending]: (state) => {
            state.loading = true
        },
        [getPendingReviews.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.reviewItems = payload.reviewItems
        },
        [getPendingReviews.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postReview.pending]: (state) => {
            state.loading = true
        },
        [postReview.fulfilled]: (state) => {
            state.loading = false
        },
        [postReview.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postupdateIsReviewed.pending]: (state) => {
            state.loading = true
        },
        [postupdateIsReviewed.fulfilled]: (state) => {
            state.loading = false
        },
        [postupdateIsReviewed.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [getProductReviews.pending]: (state) => {
            state.loading = true
        },
        [getProductReviews.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.reviews = payload.reviews
        },
        [getProductReviews.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addreviews } = reviewsSlice.actions
export default reviewsSlice.reducer
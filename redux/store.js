import { configureStore, combineReducers, createReducer } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import registerReducer from './features/register'
import currentUserReducer from './features/currentUser'
import createProductReducer from './features/createProduct'
import adminProductsReducer from './features/adminProducts'
import productsReducer from './features/products'
import productReducer from './features/product'
import cartReducer from './features/cart'
import latestProductsReducer from './features/latestProducts'
import shippingReducer from './features/shipping'
import orderReducer from './features/order'
import payReducer from './features/pay'
import userOrdersReducer from './features/userOrders'
import adminOrdersReducer from './features/adminOrders'
import reviewsReducer from './features/reviews'
import modalReducer from './features/modal'


const combinedReducers = combineReducers({
    register: registerReducer,
    currentUser: currentUserReducer,
    createProduct: createProductReducer,
    adminProducts: adminProductsReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    latestProducts: latestProductsReducer,
    shipping: shippingReducer,
    order: orderReducer,
    pay: payReducer,
    userOrders: userOrdersReducer,
    adminOrders: adminOrdersReducer,
    reviews: reviewsReducer,
    modal: modalReducer,
});

const rootReducer = createReducer(combinedReducers(undefined, { type: "" }), (builder) => {
    builder
        .addCase("__NEXT_REDUX_WRAPPER_HYDRATE__", (state, action) => ({ ...state, ...action.payload }))
        .addDefaultCase(combinedReducers);
});

const initStore = () => {
    const store = configureStore({
        reducer: rootReducer,
    })
    return store
}

export const wrapper = createWrapper(initStore)
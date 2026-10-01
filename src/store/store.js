import { configureStore } from '@reduxjs/toolkit'
import AuthSliceReducer from './Auth'

const store = configureStore({
    reducer: {
        auth: AuthSliceReducer
    },
    //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
})

export default store;
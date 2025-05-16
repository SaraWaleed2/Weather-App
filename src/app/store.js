import { configureStore } from '@reduxjs/toolkit';
import weatherApiSliceReducer from '../features/weatherApiSlice';

export const store = configureStore({
    reducer: {
        weather: weatherApiSliceReducer
    },
})

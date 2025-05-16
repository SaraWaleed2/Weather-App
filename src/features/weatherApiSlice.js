import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApi = createAsyncThunk('weather/fetchApi', async () => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=9140be087a4dd0c71785c85aa94a6dfa');

    let tempMin = response.data.main.temp_min;
    let tempMax = response.data.main.temp_max;
    let description = response.data.weather[0].description;
    let icon = response.data.weather[0].icon;
    const resTemp = Math.round(response.data.main.temp - 273.15);

    return {
        temp: resTemp,
        tempMin: Math.round(tempMin - 273.15),
        tempMax: Math.round(tempMax - 273.15),
        description: description,
        icon: icon
    };
});

export const weatherApiSlice = createSlice({
    name: 'weather',
    initialState: {
        result: "empty",
        weatherData: {},
        isLoading: false,
    },
    reducers: {
        changeResult: (state, action) => {
            state.result = "Changed";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.weatherData = action.payload;

            })
            .addCase(fetchApi.rejected, (state, action) => {
                state.isLoading = false;

            });
    },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { login, reconnect } from "./connexionAsyncAction";

const connexionSlice = createSlice({
    name: "connexion",
    initialState: {
        token: localStorage.getItem('authToken') || null,
        loading: false,
        error: null,
        isConnected:false,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isConnected = false;
            localStorage.removeItem("authToken");
        },
        resetError: (state)=>{
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isConnected = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isConnected = true;
                localStorage.setItem("authToken", action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isConnected = false;
            })
            .addCase(reconnect.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isConnected = false;
            })
            .addCase(reconnect.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem("authToken", action.payload);
                state.isConnected = true;
            })
            .addCase(reconnect.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isConnected = false;
            });
    },
});

export const { logout, resetError } = connexionSlice.actions;
export default connexionSlice.reducer;
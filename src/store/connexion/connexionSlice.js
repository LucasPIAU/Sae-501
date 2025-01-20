import { createSlice } from "@reduxjs/toolkit";
import { login } from "./connexionAsyncAction";

const connexionSlice = createSlice({
    name: "connexion",
    initialState: {
        token: localStorage.getItem('authToken') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("authToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem("authToken", action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = connexionSlice.actions;
export default connexionSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { login, reconnect } from "./connexionAsyncAction";

const connexionSlice = createSlice({
    name: "connexion",
    initialState: {
        token: localStorage.getItem('authToken') || null,
        loading: false,
        error: null,
        isConnected:false,
        timer:null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isConnected = false;
            localStorage.removeItem("authToken");
            if (state.timer) {
                clearTimeout(state.timer);
            }
        },
        resetError: ( state)=>{
            state.error = null;
        },
        setToken: (state, action) =>{
            state.token = action.payload;
            localStorage.setItem("authToken", action.payload);
        },
        setTimer:(state, action)=>{
            if (state.timer) {
                clearInterval(state.timer);
            }
            state.timer = action.payload;
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
                state.token = action.payload.token;
                state.isConnected = true;
                localStorage.setItem("authToken", action.payload.token);
                if (state.timer) {
                    clearInterval(state.timer);
                }
                state.timer = action.payload.timer;
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
                state.token = action.payload.token;
                localStorage.setItem("authToken", action.payload.token);
                state.isConnected = true;
                if (state.timer) {
                    clearInterval(state.timer);
                }
                state.timer = action.payload.timer;
            })
            .addCase(reconnect.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isConnected = false;
            });
    },
});

export const { logout, resetError,setToken, setTimer } = connexionSlice.actions;
export default connexionSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./connexionSlice";

export const login = createAsyncThunk(
    "connexion/login",
    async ({ username, password }, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_LINK + "/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.error || "Connexion échouée");
            }

            const timer = setTimeout(() => {
                dispatch(logout());
            }, 7200000);

            const data = await response.json();
             return { token: data.token, timer: timer };
        } catch (error) {
            return rejectWithValue(error.message || "Erreur de connexion");
        }
    }
);

export const reconnect = createAsyncThunk(
    "connexion/reconnect",
    async (token, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_LINK + "/auth/re", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.error || "Reconnexion échouée");
            }

            const timer = setTimeout(() => {
                dispatch(logout());
            }, 7200000);

            const data = await response.json();
            return { token: data.token, timer: timer };
        } catch (error) {
            return rejectWithValue(error.message || "Erreur de reconnexion");
        }
    }
);

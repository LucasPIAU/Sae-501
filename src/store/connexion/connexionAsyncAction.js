import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    "connexion/login",
    async ({ username, password }, { rejectWithValue }) => {
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

            const data = await response.json();
            return data.token;
        } catch (error) {
            return rejectWithValue(error.message || "Erreur de connexion");
        }
    }
);

export const reconnect = createAsyncThunk(
    "connexion/reconnect",
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_LINK + "/auth/re", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token" : token
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.error || "Reconnexion échouée");
            }

            const data = await response.json();
            return data.token;
        } catch (error) {
            return rejectWithValue(error.message || "Erreur de reconnexion");
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    "connexion/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3001/api/auth", {
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
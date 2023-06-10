import {createSlice} from "@reduxjs/toolkit";
import {IAuth} from "./auth.interface.ts";

const initialState: IAuth = {user: null, token: null};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        refresh: (state, action) => {
            const {user, token}: IAuth = action.payload;

            if (user) {
                state.user = user;
            } else {
                state.user = null;
            }

            if (token) {
                state.token = token;
            } else {
                state.token = null
            }
        },
        logOut: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const {refresh, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuth = (state: any) => state.auth;

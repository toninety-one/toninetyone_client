import {createSlice} from "@reduxjs/toolkit";
import {IAuth} from "../user/user.interface";

const initialState: IAuth = {user: null, token: null};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        refresh: (state, action) => {
            const {user, token}: IAuth = action.payload;

            if (user) {
                state.user = user;
            }

            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const {refresh, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuth = (state: any) => state.auth;

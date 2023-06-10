import {apiSlice} from "../../api/api.slice";
import {ILogin, IToken, IUser, IUserDetails} from "./auth.interface.ts";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IToken, ILogin>({
            query: (credentials: ILogin) => ({
                url: "/Identity/authenticate",
                method: "POST",
                body: {...credentials},
            }),
        }),
        getUserData: builder.query<IUserDetails, null>({
            query: () => ({
                url: "/User",
                method: "GET",
            }),
        }),
        getUser: builder.mutation<IUserDetails, null>({
            query: () => ({
                url: "/User",
                method: "GET",
            }),
        }),
        getAllUsers: builder.query<{ users: IUser[] }, null>({
            query: () => ({
                url: "/User/GetAll",
                method: "GET",
            }),
        }),
    }),
});

export const {useLoginMutation, useGetUserDataQuery, useGetUserMutation, useGetAllUsersQuery} =
    authApiSlice;

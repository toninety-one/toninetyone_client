import {apiSlice} from "../../api/api.slice";
import {ILogin, IToken, IUserDetails} from "./auth.interface.ts";

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
            // keepUnusedDataFor: 1,
        }),
        getUser: builder.mutation<IUserDetails, null>({
            query: () => ({
                url: "/User",
                method: "GET",
            }),
        }),
    }),
});

export const {useLoginMutation, useGetUserDataQuery, useGetUserMutation} =
    authApiSlice;

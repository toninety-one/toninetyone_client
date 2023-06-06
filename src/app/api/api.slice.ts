import {
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {logOut, refresh} from "../types/auth/auth.slice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:7010",
    credentials: "include",
    prepareHeaders: (headers: Headers, {getState}: any): Headers => {
        const token = getState().auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token.accessToken}`);
        }
        headers.set("Accept", "application/json");
        headers.set("Content-type", "application/json");

        return headers;
    },
});

const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: any,
    extraOptions: {}
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error) {
        const body = {...api.getState().auth.token};
        // send refresh token to get new access token
        const refreshResponce = await baseQuery(
            {
                url: "/identity/refresh",
                method: "POST",
                // body: { accessToken: "", refreshToken: "" },
                body: body,
            },
            api,
            extraOptions
        );

        if (refreshResponce) {
            const userResponse = await baseQuery("/user", api, extraOptions);
            // store the new token
            api.dispatch(
                refresh({token: refreshResponce.data, user: userResponse.data})
            );
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    refetchOnFocus: true,
    // @ts-ignore
    endpoints: (builder) => ({}),
});

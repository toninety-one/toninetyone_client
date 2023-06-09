import {createApi, FetchArgs, fetchBaseQuery,} from "@reduxjs/toolkit/query/react";
import {logOut, refresh} from "../types/auth/auth.slice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:7010",
    credentials: "include",
    prepareHeaders: (headers: Headers, {getState}: any): Headers => {
        const token = getState().auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token.accessToken}`);
        }

        if (!headers.has("Content-Type")) {
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");
        }

        return headers;
    },
});

const baseQueryWithReAuth = async (
    args: string | FetchArgs,
    api: any,
    extraOptions: NonNullable<unknown>
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error) {
        const body = {...api.getState().auth.token};
        // send refresh token to get new access token
        const refreshResponce = await baseQuery(
            {
                url: "/identity/refresh",
                method: "POST",
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
    baseQuery: baseQueryWithReAuth,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder) => ({}),
});

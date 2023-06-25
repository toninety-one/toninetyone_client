import {apiSlice} from "../../api/api.slice";
import {ILogin, IToken, IUpdateIdentity, IUser, IUserDetails, IUserLookupDto} from "./auth.interface.ts";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IToken, ILogin>({
            query: (credentials: ILogin) => ({
                url: "/Identity/authenticate",
                method: "POST",
                body: {...credentials},
            }),
        }),
        getUser: builder.query<IUserDetails, null | string>({
            query: (id: string | null) => ({
                url: `/User${id && id.length > 0 ? `?id=${id}` : ""}`,
                method: "GET",
            }),
        }),
        getAllUsers: builder.query<{ users: IUserLookupDto[] }, null>({
            query: () => ({
                url: "/User/GetAll",
                method: "GET",
            }),
        }),
        updateIdentityUser: builder.mutation<null, IUpdateIdentity>({
            query: (body) => ({
                url: "/User/i",
                method: "PUT",
                body: body
            })
        }),
        updateUser: builder.mutation<null, IUser>({
            query: (body) => ({
                url: "/User",
                method: "PUT",
                body: body
            })
        })
    }),
});

export const {
    useLoginMutation,
    useGetUserQuery,
    useUpdateIdentityUserMutation,
    useGetAllUsersQuery,
    useUpdateUserMutation
} =
    authApiSlice;

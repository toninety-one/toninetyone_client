import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin, IToken } from "./user/user.interface";

export const identityApi = createApi({
  reducerPath: "identity",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  tagTypes: ["Identity"],
  endpoints: (builder) => ({
    login: builder.query<IToken, ILogin>({
      query: (body: ILogin) => ({
        url: `/identity/authenticate"`,
        method: 'POST',
        body,
      }),
      providesTags: ["Identity"],
    }),
  }),
});

export const { useLoginQuery } = identityApi;

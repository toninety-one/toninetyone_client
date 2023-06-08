import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin, IToken } from "./auth/auth.interface.ts";

export const identityApi = createApi({
  reducerPath: "identity",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7010",
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

import {apiSlice} from "../../api/api.slice.ts";

export const labWorkApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createLabWork: builder.mutation<string, FormData>({
            query: (body: FormData) => ({
                url: "/labWork",
                method: "POST",
                body: body,
                headers: {
                    "content-type": "multipart/form-data: boundary=--14737809831466499882746641449.",
                    'Accept': '*/*',
                },
                formData: true,
            }),
        }),
    }),
});

export const {useCreateLabWorkMutation} = labWorkApiSlice;

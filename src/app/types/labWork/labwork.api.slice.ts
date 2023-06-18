import {ILabWork, ILabWorkLookupDto} from "./labWork.interface.ts";
import {apiSlice} from "../../api/api.slice.ts";

export const labWorkApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLabWorkById: builder.query<ILabWork, string>({
            query: (id: string) => ({
                url: `/labwork/${id}`,
                method: "GET",
            }),
        }),
        getLabWorks: builder.query<{ labWorks: ILabWorkLookupDto[] }, string | null>({
            query: (id: string) => ({
                url: `/labwork` + (id != null ? "?disicplineId=" + id : ""),
                method: "GET",
            }),
        }),
    })
})

export const {
    useGetLabWorkByIdQuery,
    useGetLabWorksQuery
} = labWorkApiSlice;
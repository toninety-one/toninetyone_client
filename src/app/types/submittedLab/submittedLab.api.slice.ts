import {apiSlice} from "../../api/api.slice.ts";
import {ISubmittedLabDetails} from "./submittedLab.interface.ts";

export const submittedLabApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubmittedLabById: builder.query<ISubmittedLabDetails, { labId: string, subId: string }>({
            query: ({labId, subId}) => ({
                url: `/labwork/${labId}/${subId}`,
                method: "GET",
            }),
        }),
    })
})

export const {
    useGetSubmittedLabByIdQuery
} = submittedLabApiSlice;
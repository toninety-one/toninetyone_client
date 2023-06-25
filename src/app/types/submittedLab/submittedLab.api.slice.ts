import {apiSlice} from "../../api/api.slice.ts";
import {IMarkSubmittedLab, ISubmittedLabDetails} from "./submittedLab.interface.ts";

export const submittedLabApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubmittedLabById: builder.query<ISubmittedLabDetails, { labId: string, subId: string }>({
            query: ({labId, subId}) => ({
                url: `/labwork/${labId}/${subId}`,
                method: "GET",
            }),
        }),
        markSubmittedLab: builder.mutation<null, IMarkSubmittedLab>({
            query: ({labId, subId, mark}) => ({
                url: `/labwork/${labId}/${subId}`,
                method: "PUT",
                body: {mark}
            }),
        }),

    })
})

export const {
    useGetSubmittedLabByIdQuery,
    useMarkSubmittedLabMutation
} = submittedLabApiSlice;
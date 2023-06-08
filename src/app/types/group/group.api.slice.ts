import {apiSlice} from "../../api/api.slice.ts";
import {IGroupDetails, IGroupDiscipline, IGroupLookup} from "./group.interface.ts";

export const groupApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGroups: builder.query<{ groups: IGroupLookup[] }, null>({
            query: () => ({
                url: "/group",
                method: "GET",
            }),
        }),
        getGroupById: builder.query<IGroupDetails, string>({
            query: (id: string) => ({
                url: `/group/${id}`,
                method: "GET",
            }),
        }),
        createGroup: builder.mutation<string, IGroupDetails>({// TODO IGroupCreate
            query: () => ({
                url: "/group",
                method: "POST",
            }),
        }),
        addDisciplineToGroup: builder.mutation<string, IGroupDiscipline>({// TODO IGroupCreate
            query: (body: IGroupDiscipline) => ({
                url: "/DisciplineGroup/AddDisciplineGroup",
                method: "POST",
                body: body,
            }),
        }),
        // update
        deleteGroup: builder.mutation<null, string>({
            query: (id: string) => ({
                url: `/group/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const {
    useGetGroupsQuery,
    useGetGroupByIdQuery,
    useDeleteGroupMutation,
    useAddDisciplineToGroupMutation
} = groupApiSlice;
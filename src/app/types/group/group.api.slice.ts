import {apiSlice} from "../../api/api.slice.ts";
import {IGroupCreate, IGroupDetails, IGroupDiscipline, IGroupLookup} from "./group.interface.ts";

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
        createGroup: builder.mutation<string, IGroupCreate>({
            query: (body) => ({
                url: "/group",
                method: "POST",
                body: body,
            }),
        }),
        addDisciplineToGroup: builder.mutation<string, IGroupDiscipline>({
            query: (body: IGroupDiscipline) => ({
                url: "/DisciplineGroup",
                method: "POST",
                body: body,
            }),
        }),
        deleteDisciplineFromGroup: builder.mutation<string, IGroupDiscipline>({
            query: (body: IGroupDiscipline) => ({
                url: "/DisciplineGroup",
                method: "DELETE",
                body: body,
            }),
        }),
        updateGroup: builder.mutation<null, IGroupLookup>({
            query: (body) => ({
                url: `/group`,
                method: "PUT",
                body: body,
            }),
        }),
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
    useAddDisciplineToGroupMutation,
    useCreateGroupMutation,
    useUpdateGroupMutation
} = groupApiSlice;
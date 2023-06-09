import {apiSlice} from "../../api/api.slice.ts";
import {IDiscipline, IDisciplineCreate, IDisciplineLookup, IDisciplineUpdate} from "./discipline.interface.ts";

export const disciplineApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDisciplines: builder.query<{ disciplines: IDisciplineLookup[] }, null>({
            query: () => ({
                url: "/discipline",
                method: "GET",
            }),
        }),
        getDisciplineById: builder.query<IDiscipline, string>({
            query: (id: string) => ({
                url: `/discipline/${id}`,
                method: "GET",
            }),
        }),
        createDiscipline: builder.mutation<string, IDisciplineCreate>({
            query: (body: IDisciplineCreate) => ({
                url: "/discipline",
                method: "POST",
                body: body
            }),
        }),
        updateDiscipline: builder.mutation<string, IDisciplineUpdate>({// TODO IDisciplineCreate
            query: (body: IDisciplineUpdate) => ({
                url: "/discipline",
                method: "PUT",
                body: body
            }),
        }),
        deleteDiscipline: builder.mutation<null, string>({
            query: (id: string) => ({
                url: `/discipline/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const {
    useGetDisciplinesQuery,
    useGetDisciplineByIdQuery,
    useCreateDisciplineMutation,
    useDeleteDisciplineMutation,
    useUpdateDisciplineMutation
} = disciplineApiSlice;
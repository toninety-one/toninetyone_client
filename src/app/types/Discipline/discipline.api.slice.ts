import {apiSlice} from "../../api/api.slice.ts";
import {IDiscipline, IDisciplineLookup, IDisciplineUpdate} from "./discipline.interface.ts";

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
        createDiscipline: builder.mutation<string, IDiscipline>({// TODO IDisciplineCreate
            query: () => ({
                url: "/discipline",
                method: "POST",
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
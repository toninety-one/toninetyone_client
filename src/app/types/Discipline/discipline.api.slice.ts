import {apiSlice} from "../../api/api.slice.ts";
import {IDiscipline, IDisciplineLookup} from "./discipline.interface.ts";

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
        // update
        deleteDiscipline: builder.mutation<null, string>({
            query: (id: string) => ({
                url: `/discipline/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const {useGetDisciplinesQuery, useGetDisciplineByIdQuery, useCreateDisciplineMutation, useDeleteDisciplineMutation} = disciplineApiSlice;
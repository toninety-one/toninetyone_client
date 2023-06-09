import {apiSlice} from "../../api/api.slice.ts";
import {ILabWorkCreate} from "./labWork.interface.ts";

export const labWorkApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createLabWork: builder.mutation<string, ILabWorkCreate>({
            query: (body: ILabWorkCreate) => ({
                url: "/labWork",
                method: "POST",
                body: () => {
                    const formData = new FormData();
                    formData.append("title", body.title)
                    formData.append("disciplineId", body.disciplineId)
                    formData.append("details", body.details)
                    body.files.forEach((file) => {
                        formData.append(`files`, file, file.name);
                    });
                    return formData;
                },
                headers: {
                    "content-type": "multipart/form-data: boundary=00000013232213132132",
                },
            }),
        }),
    }),
});

export const {useCreateLabWorkMutation} = labWorkApiSlice;

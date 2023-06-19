import useAuth from "../../../../../hooks/useAuth.ts";
import {ILabWorkCreate} from "../../../../../types/labWork/labWork.interface.ts";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import useHeader from "../../../../../hooks/useHeader.ts";
import useFormFiles from "../../../../../hooks/useFormFiles.ts";

function DisciplineCreateLab() {
    useHeader("Создание лабораторной работы")

    const auth = useAuth()

    const {disciplineId} = useParams();

    const {files, handleFileChange, handleDelete} = useFormFiles()

    const {register, handleSubmit} = useForm<ILabWorkCreate>();

    const handleUploadClick = async (data: ILabWorkCreate) => {
        if (!files) {
            return;
        }

        const formData = new FormData();

        files.forEach(file => {
            formData.append(`files`, file.file, file.file.name);
        });

        formData.append("details", data.details)
        formData.append("title", data.title)
        formData.append("disciplineId", disciplineId ? disciplineId : "")

        await fetch(import.meta.env.VITE_API_URL + "/labwork", {
            method: 'POST',
            body: formData,
            headers: {
                "authorization": `bearer ${auth.token?.accessToken}`
            }
        })


    };

    return (
        <form onSubmit={handleSubmit(handleUploadClick)} encType="multipart/form-data">
            <input type="text" placeholder="title" {...register("title", {})} />
            <br/>
            <input type="text" placeholder="details" {...register("details", {})} />
            <br/>
            <input type="file" multiple onChange={handleFileChange}/>
            <table>
                {files.map(file => (
                    <tr>
                        <td key={file.id}>
                            {file.file.name}
                        </td>
                        <td>
                            <button onClick={() => handleDelete(file.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>

            <button>Create</button>
        </form>
    );
}

export default DisciplineCreateLab;

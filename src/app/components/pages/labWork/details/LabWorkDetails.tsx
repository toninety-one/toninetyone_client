import useHeader from "../../../../hooks/useHeader.ts";
import {FC} from "react";
import {useParams} from "react-router-dom";

const LabWorkDetails: FC = () => {
    useHeader("Лабораторная работа")
    const {labId} = useParams();

    // const [fileList, setFileList] = useState<FileList | null>(null);
    // const auth = useAuth()
    //
    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setFileList(e.target.files);
    // };
    // const {disciplineId} = useParams();
    //
    // const {register, handleSubmit} = useForm<ILabWorkCreate>();
    //
    //
    // const handleUploadClick = async (data: ILabWorkCreate) => {
    //     if (!fileList) {
    //         return;
    //     }
    //
    //     const formData = new FormData();
    //
    //     files.forEach(file => {
    //         formData.append(`files`, file, file.name);
    //     });
    //
    //     formData.append("details", data.details)
    //     formData.append("title", data.title)
    //     formData.append("disciplineId", disciplineId ? disciplineId : "")
    //
    //     await fetch(import.meta.env.VITE_API_URL + "/labwork", {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //             "authorization": `bearer ${auth.token?.accessToken}`
    //         }
    //     })
    //
    //
    // };
    //
    // const files = fileList ? [...fileList] : [];


    return (
        <div>
            {labId}
        </div>
    )
}
//         <form onSubmit = {handleSubmit(handleUploadClick)}
//     encType = "multipart/form-data" >
//     <input type = "text"
//     placeholder = "title"
//     {...
//         register("title", {})
//     }
//     />
//     < br / >
//     <input type = "text"
//     placeholder = "details"
//     {...
//         register("details", {})
//     }
//     />
//     < br / >
//     <input type = "file"
//     onChange = {handleFileChange}
//     multiple / >
//
//     <ul>
//         {
//             files.map((file, i) => (
//                 <li key = {i} >
//                     {file.name} - {file.type}
//                     < /li>
//             ))
//         }
//     < /ul>
//
//     < button > Create < /button>
//     < /form>
// )
//     ;
// }

export default LabWorkDetails;

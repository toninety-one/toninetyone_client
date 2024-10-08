import {ChangeEvent, useState} from "react";
import {FileData, getLastIndex} from "../types/labFile/labFile.helper.ts";

const useFormFiles = () => {
    const [files, setFiles] = useState<FileData[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles: FileData[] = Array.from(event.target.files).map((file, index) => ({
                id: index + getLastIndex(files) + 1,
                file
            }));

            setFiles([...files, ...newFiles]);
        }
    };

    const handleDelete = (id: number) => {
        const updatedFiles = files.filter(file => file.id !== id);
        setFiles(updatedFiles);
    };

    const getFilesFormData = () => {
        const formData = new FormData();

        files.forEach(file => {
            formData.append(`files`, file.file, file.file.name);
        });

        return formData
    }

    return {files, handleFileChange, handleDelete, getFilesFormData};
};

export default useFormFiles;

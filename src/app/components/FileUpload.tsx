import React, {useState} from 'react';

interface FileData {
    id: number;
    file: File;
}

const UploadForm: React.FC = () => {
    const [files, setFiles] = useState<FileData[]>([]);

    const getLastIndex = (): number => {
        if (files.length > 0) {
            return files[files.length - 1].id
        }
        return 0;
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles: FileData[] = Array.from(event.target.files).map((file, index) => ({
                id: index + getLastIndex() + 1,
                file
            }));

            setFiles([...files, ...newFiles]);
        }
    };

    const handleDelete = (id: number) => {
        console.log(files)
        const updatedFiles = files.filter(file => file.id !== id);
        setFiles(updatedFiles);
    };

    const handleUpload = () => {
        // Perform upload operation with files array
        console.log(files);
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange}/>
            <ul>
                {files.map(file => (
                    <li key={file.id}>
                        {file.file.name}
                        <button onClick={() => handleDelete(file.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadForm;

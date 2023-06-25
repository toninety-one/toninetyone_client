import {useNavigate} from "react-router-dom";
import styles from "./listItem.module.scss"
import {IFile} from "../../../../types/labFile/labFile.interface.ts";
import {FC} from "react";

type ListItemProps = {
    title: string;
    path?: string;
    file?: IFile;
    optionalText?: string;
}

const ListItem: FC<ListItemProps> = ({title, path, file, optionalText}) => {
    const navigate = useNavigate();

    const download = (fileData: IFile) => {
        const element = document.createElement("a");
        const blobFile = new Blob(
            [
                `${import.meta.env.VITE_API_URL}/${fileData.path}`
            ],
            {type: "*/*"}
        );
        element.href = URL.createObjectURL(blobFile);
        element.download = fileData.fileName;
        element.click();
    };

    return (
        <>
            <div className={styles.list__item} onClick={() => {
                if (path) {
                    navigate(path)
                }

                if (file && file.path) {
                    download(file)
                }
            }}>

                <div>{title}</div>
                {optionalText ? (<div>{optionalText}</div>) : ""}
            </div>
            <div className={styles.list__line}/>
        </>
    );
};

export default ListItem;

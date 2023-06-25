import {useNavigate} from "react-router-dom";
import styles from "./listItem.module.scss"

type ListItemProps = {
    title: string;
    path?: string;
    filePath?: string;
    optionalText?: string;
}

const ListItem = ({title, path, filePath, optionalText}: ListItemProps) => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.list__item} onClick={() => {
                if (path) {
                    navigate(path)
                }

                if (filePath) {
                    const link = document.createElement('a');
                    link.href = filePath;
                    link.click();
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

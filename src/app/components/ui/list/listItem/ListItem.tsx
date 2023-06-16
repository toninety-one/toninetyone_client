import {useNavigate} from "react-router-dom";
import "./listItem.scss"

const ListItem = ({title, path}: { title: string, path: string }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className={"list__item"} onClick={() => {
                navigate(path)
            }}>
                {title}
            </div>
            <div className={"list__line"}/>
        </>
    );
};

export default ListItem;

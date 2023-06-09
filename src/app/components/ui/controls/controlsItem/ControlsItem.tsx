import "./controlsItem.scss"
import {useNavigate} from "react-router-dom";

const ControlsItem = ({title, path}: { title: string, path: string }) => {
    const navigate = useNavigate()

    return (
        <div className={"controls__item"} onClick={() => navigate(path)}>
            {title}
        </div>
    )
}

export default ControlsItem;
import "./sideBarButton.scss";
import {useNavigate} from "react-router-dom";

interface Props {
    button_text: string;
    path: string;
    iconPath?: string
}

const SideBarButton = ({path, button_text, iconPath}: Props) => {
    const navigate = useNavigate()

    path = path.toLowerCase();

    let active = "";

    if (location.pathname.toLowerCase().includes(path)) {
        active = " sideBar__link_active";
    }

    if (location.pathname.toLowerCase() != "/" && path == "/") {
        active = ""
    }

    return (
        <div onClick={() => navigate(path)}
             className={"sideBar__link" + active}>
            {iconPath && <img src={iconPath} alt={iconPath}></img>}
            {button_text}
        </div>
    );
};

export default SideBarButton;
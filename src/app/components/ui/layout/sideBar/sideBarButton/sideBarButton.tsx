import "./sideBarButton.scss";
import {useNavigate} from "react-router-dom";

interface Props {
    button_text: string;
    path: string;
}

const SideBarButton = ({path, button_text}: Props) => {
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
            {button_text}
        </div>
    );
};

export default SideBarButton;
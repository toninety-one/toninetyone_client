import "./sideBarButton.scss";
import {useNavigate} from "react-router-dom";

interface Props {
    button_text: string;
    path: string;
}

const SideBarButton = ({path, button_text}: Props) => {
    const navigate = useNavigate()

    let active = "";

    if (location.pathname.includes(path)) {
        active = " sideBar__link_active";
    }

    if (location.pathname != "/" && path == "/"){
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
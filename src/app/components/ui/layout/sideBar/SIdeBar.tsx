import "./sideBar.scss";
import SideBarButton from "./sideBarButton/sideBarButton.tsx";
import {Role} from "../../../../types/role.enum.ts";

const SideBar = ({role}: { role: Role }) => {
    console.log(role)

    return (
        <div id="sideBar__container">
            <div className={"sideBar__menu"}>


                <SideBarButton button_text={"Профиль"} path={"/"}/>

                <SideBarButton button_text={"Дисциплины"} path={"/discipline"}/>

                {role == Role.Teacher || role == Role.Admin && (
                    <SideBarButton button_text={"Группы"} path={"/group"}/>
                )}

                {role == Role.Admin && (
                    <SideBarButton button_text={"Пользователи"} path={"/users"}/>
                )}


                <SideBarButton button_text={"О проекте"} path={"/about"}/>
            </div>
            <div className={"sideBar__logout"}>
                <SideBarButton button_text={"Выйти"} path={"/logout"}/>
            </div>
        </div>
    );
}
export default SideBar;
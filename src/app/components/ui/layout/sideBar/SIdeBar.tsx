import "./sideBar.scss";
import SideBarButton from "./sideBarButton/sideBarButton.tsx";
import {Role} from "../../../../types/auth/role.enum.ts";

const SideBar = ({role}: { role: Role }) => {
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

                {role == Role.User && (
                    <SideBarButton button_text={"Лабораторные работы"} path={"/labwork"}/>
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
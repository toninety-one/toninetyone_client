import {Outlet, useLocation} from "react-router-dom";
import Header from "../header/Header.tsx";
import SideBar from "../sideBar/SIdeBar.tsx";
import Footer from "../footer/Footer.tsx";
import "./layout.scss"
import useAuth from "../../../../hooks/useAuth.ts";
import {Role} from "../../../../types/auth/role.enum.ts";

const Layout = () => {
    const {pathname} = useLocation();
    const {user, token} = useAuth();

    const showAuthComponents = !(pathname.includes("/login") || !token);

    return (
        <div id="layout">
            {showAuthComponents ? <Header/> : <></>}
            <main>
                {showAuthComponents ?
                    <div id="sideBar">
                        <SideBar role={user?.userRole ? user.userRole : Role.User}/>
                    </div> : <></>}
                {!pathname.includes("/login") ? <div id="body">
                    <div className={pathname}>
                        <Outlet/>
                    </div>
                </div> : <Outlet/>}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;

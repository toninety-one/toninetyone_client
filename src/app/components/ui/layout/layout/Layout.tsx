import {Outlet, useLocation} from "react-router-dom";
import Header from "../header/Header.tsx";
import SideBar from "../sIdeBar/SIdeBar.tsx";
import Footer from "../footer/Footer.tsx";
import "./layout.scss"
import useAuth from "../../../../hooks/useAuth.ts";
import {Role} from "../../../../types/role.enum.ts";

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
                <div id="body">
                    <div className="body__container">
                        <Outlet/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;

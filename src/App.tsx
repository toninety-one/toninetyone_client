import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Login from "./app/components/pages/login/Login.tsx";
import Error from "./app/components/pages/error/Error.tsx";
import Profile from "./app/components/pages/Profile/Profile.tsx";
import Layout from "./app/components/ui/layout/layout/Layout.tsx";
import RequireAuth from "./app/components/ui/layout/RequireAuth";
import Group from "./app/components/pages/group/Group.tsx";
import GroupDetails from "./app/components/pages/group/details/GroupDetails.tsx";
import {Role} from "./app/types/role.enum.ts";
import Discipline from "./app/components/pages/discipline/Discipline.tsx";
import DisciplineDetails from "./app/components/pages/discipline/details/DisciplineDetails.tsx";
import "./global.scss";
import About from "./app/components/pages/about/About.tsx";
import LogOut from "./app/components/pages/logOut/LogOut.tsx";
import Users from "./app/components/pages/users/Users.tsx";
import DisciplineDetailsManager from "./app/components/pages/discipline/details/manager/DIsciplineDetailsManager.tsx";
import DisciplineCreateLab from "./app/components/pages/discipline/details/createLab/DisciplineCreateLab.tsx";
import DisciplineManager from "./app/components/pages/discipline/manager/DisciplineManager.tsx";
import LabWorkDetails from "./app/components/pages/labWork/details/LabWorkDetails.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            {/* public rotes */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<LogOut/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="*" element={<Error code={404} text={"Страница не найдена"}/>}/>

            {/* protected rotes */}
            <Route element={<RequireAuth/>}>
                <Route index element={<Profile/>}/>
                <Route path="discipline" element={<Discipline/>}/>
                <Route path="discipline/:disciplineId" element={<DisciplineDetails/>}/>
                <Route path="labWork/:labId" element={<LabWorkDetails/>}/>
            </Route>

            <Route element={<RequireAuth roles={[Role.Admin, Role.Teacher]}/>}>
                <Route path="discipline/manager" element={<DisciplineManager/>}/>
                <Route path="discipline/:disciplineId/manager" element={<DisciplineDetailsManager/>}/>
                <Route path="discipline/:disciplineId/createLab" element={<DisciplineCreateLab/>}/>
            </Route>

            <Route element={<RequireAuth roles={[Role.Admin]}/>}>
                <Route path="group" element={<Group/>}/>
                <Route path="users" element={<Users/>}/>
                <Route path="group/:groupId" element={<GroupDetails/>}/>
            </Route>
        </Route>
    )
);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import "./global.scss";
import Layout from "./app/components/ui/layout/layout/Layout.tsx";
import RequireAuth from "./app/components/ui/layout/RequireAuth";
import {Role} from "./app/types/auth/role.enum.ts";
import Login from "./app/components/pages/login/Login.tsx";
import Error from "./app/components/pages/error/Error.tsx";
import Profile from "./app/components/pages/Profile/Profile.tsx";
import Group from "./app/components/pages/group/Group.tsx";
import GroupDetails from "./app/components/pages/group/details/GroupDetails.tsx";
import Discipline from "./app/components/pages/discipline/Discipline.tsx";
import DisciplineDetails from "./app/components/pages/discipline/details/DisciplineDetails.tsx";
import About from "./app/components/pages/about/About.tsx";
import LogOut from "./app/components/pages/logOut/LogOut.tsx";
import Users from "./app/components/pages/users/Users.tsx";
import DisciplineDetailsManager from "./app/components/pages/discipline/details/manager/DIsciplineDetailsManager.tsx";
import DisciplineCreateLab from "./app/components/pages/discipline/details/createLab/DisciplineCreateLab.tsx";
import CreateDiscipline from "./app/components/pages/discipline/manager/CreateDiscipline.tsx";
import LabWorkDetails from "./app/components/pages/labWork/details/LabWorkDetails.tsx";
import UsersDetails from "./app/components/pages/users/details/UsersDetails.tsx";
import CreateGroup from "./app/components/pages/group/create/CreateGroup.tsx";
import SubmitLabWork from "./app/components/pages/labWork/details/submit/SubmitLabWork.tsx";
import LabWork from "./app/components/pages/labWork/LabWork.tsx";

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
            <Route element={<RequireAuth roles={[Role.User]}/>}>
                <Route path="labWork" element={<LabWork/>}/>
                <Route path="labWork/:labId/submit" element={<SubmitLabWork/>}/>
            </Route>

            <Route element={<RequireAuth roles={[Role.Admin, Role.Teacher]}/>}>
                <Route path="discipline/create" element={<CreateDiscipline/>}/>
                <Route path="discipline/:disciplineId/manager" element={<DisciplineDetailsManager/>}/>
                <Route path="discipline/:disciplineId/createLab" element={<DisciplineCreateLab/>}/>
            </Route>

            <Route element={<RequireAuth roles={[Role.Admin]}/>}>
                <Route path="group" element={<Group/>}/>
                <Route path="group/create" element={<CreateGroup/>}/>
                <Route path="group/:groupId" element={<GroupDetails/>}/>

                <Route path="users" element={<Users/>}/>
                <Route path="users/:userId" element={<UsersDetails/>}/>
            </Route>
        </Route>
    )
);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;

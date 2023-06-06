import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./app/components/pages/Login";
import NotFound from "./app/components/pages/NotFound";
import Profile from "./app/components/pages/Profile";
import Public from "./app/components/pages/Public";
import Layout from "./app/components/ui/layout/Layout";
import RequireAuth from "./app/components/ui/layout/RequireAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* public rotes */}
      <Route index element={<Public />} />
      <Route path="*" element={<NotFound />} />
      <Route path="login" element={<Login />} />
      {/* protected rotes */}
      <Route element={<RequireAuth />}>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

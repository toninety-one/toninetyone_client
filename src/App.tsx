import { Route, Routes } from "react-router-dom";
import Public from "./app/components/pages/Public";
import Login from "./app/components/pages/Login";
import Profile from "./app/components/pages/Profile";
import Layout from "./app/components/ui/layout/Layout";
import RequireAuth from "./app/components/ui/layout/RequireAuth";
import NotFound from "./app/components/pages/NotFound";

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;

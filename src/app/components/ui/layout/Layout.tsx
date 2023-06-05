import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>header</div>
      <Outlet />
    </>
  );
};

export default Layout;

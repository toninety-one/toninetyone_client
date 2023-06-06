import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>{document.title}</div>
      <header>
        <div>
          <Link to="/">home</Link>
        </div>
        <div>
          <Link to="/login">login</Link>
        </div>
        <div>
          <Link to="/profile">profile</Link>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;

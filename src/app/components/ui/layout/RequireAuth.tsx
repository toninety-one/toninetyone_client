import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Role } from "../../../types/role.enum";
import useAuth from "../../../hooks/useAuth";

const RequireAuth = ({ roles }: { roles?: Role[] }) => {
  const location = useLocation();

  const { user, token } = useAuth();

  if (!user || !user.userRole || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles == null || roles?.includes(user.userRole)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

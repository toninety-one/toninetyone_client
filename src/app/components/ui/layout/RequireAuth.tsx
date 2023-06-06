import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Role } from "../../../types/role.enum";
import useAuth from "../../../hooks/useAuth";
import { refresh } from "../../../types/auth/auth.slice";
import { useGetUserDataQuery } from "../../../types/auth/auth.api.slice";
import { useDispatch } from "react-redux";

const RequireAuth = ({ roles }: { roles?: Role[] }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { token } = useAuth();
  const { data, isLoading } = useGetUserDataQuery(null);

  dispatch(refresh({ token, user: data }));

  const { user } = useAuth();

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!token || !user || !user.userRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles == null || roles?.includes(user.userRole)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

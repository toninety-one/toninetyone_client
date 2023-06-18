import {Navigate, Outlet, useLocation} from "react-router-dom";
import {Role} from "../../../types/auth/role.enum.ts";
import useAuth from "../../../hooks/useAuth";
import {refresh} from "../../../types/auth/auth.slice";
import {useGetUserQuery} from "../../../types/auth/auth.api.slice";
import {useDispatch} from "react-redux";
import Loader from "../loader/Loader.tsx";

const RequireAuth = ({roles}: { roles?: Role[] }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const {token} = useAuth();

    const {data, isLoading, refetch, isFetching} = useGetUserQuery(null, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    });

    dispatch(refresh({token, user: data}));

    const {user} = useAuth();

    if (isLoading) {
        if (!isFetching) {
            refetch()
        }

        return <Loader/>;
    }

    if (!token || !user || !user.userRole) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    if (roles == null || roles?.includes(user.userRole)) {
        return <Outlet/>;
    } else {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
};

export default RequireAuth;

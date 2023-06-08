import {useDispatch} from "react-redux";
import {logOut} from "../../types/auth/auth.slice.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LogOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logOut());
        navigate("/login")
    })

    return (
        <div>Page NotFound</div>
    )
}

export default LogOut
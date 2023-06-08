import {useRef} from "react";
import {useForm} from "react-hook-form";
import {ILogin} from "../../../types/auth/auth.interface.ts";
import {refresh} from "../../../types/auth/auth.slice.ts";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../../types/auth/auth.api.slice.ts";
import {useDispatch} from "react-redux";
import "./login.scss"
import Loader from "../../ui/loader/Loader.tsx";

export default function Login() {
    const errRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        // formState: {  },
    } = useForm<ILogin>();
    const onSubmit = async (data: ILogin) => {
        try {
            const loginResponce = await login(data).unwrap();

            dispatch(refresh({token: loginResponce, user: null}));

            navigate("/");
        } catch (err) {
            // catch errors or use formState: {errors}
            errRef.current?.focus();
        }
    };

    return isLoading ? (
        <Loader/>
    ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="UserName" {...register("username", {})} />
            <input
                type="password"
                placeholder="Password"
                {...register("password", {})}
            />

            <input type="submit"/>
        </form>
    );
}

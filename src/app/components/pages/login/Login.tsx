import {useRef} from "react";
import {useForm} from "react-hook-form";
import {ILogin} from "../../../types/auth/auth.interface.ts";
import {refresh} from "../../../types/auth/auth.slice.ts";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../../types/auth/auth.api.slice.ts";
import {useDispatch} from "react-redux";
import Loader from "../../ui/loader/Loader.tsx";
import useHeader from "../../../hooks/useHeader.ts";
import styles from "./login.module.scss"
import Button from "../../ui/formContainer/button/button.tsx";

export default function Login() {
    useHeader("Вход")

    const errRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
    } = useForm<ILogin>();
    const onSubmit = async (data: ILogin) => {
        try {
            const loginResponce = await login(data).unwrap();

            dispatch(refresh({token: loginResponce, user: null}));

            navigate("/");
        } catch (err) {
            errRef.current?.focus();
        }
    };

    return isLoading ? (
        <Loader/>
    ) : (
        <div className={styles.login__container}>
            <div className={styles.login__form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Вход</h1>
                    <input
                        className={styles.login__input}
                        type="text"
                        placeholder="UserName"
                        {...register("username", {})}
                    />
                    <input
                        className={styles.login__input}
                        type="password"
                        placeholder="Password"
                        {...register("password", {})}
                    />
                    <Button button_text={"Войти"} button_type={"submit"}/>
                </form>
            </div>
        </div>
    );
}

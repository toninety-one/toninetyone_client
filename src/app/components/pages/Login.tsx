import React, {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {ILogin} from "../../types/user/user.interface";
import {refresh} from "../../types/auth/auth.slice";
import {useNavigate} from "react-router-dom";
import {useGetUserMutation, useLoginMutation} from "../../types/auth/auth.api.slice";
import {useDispatch} from "react-redux";

export default function Login() {
    const errRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const [getUser] = useGetUserMutation();

    const {register, handleSubmit, formState: {errors}} = useForm<ILogin>();
    const onSubmit = async (data: ILogin) => {

        try {
            const loginResponce = await login(data).unwrap();

            dispatch(refresh({token: loginResponce, user: null}));

            const userResponce = await getUser(null).unwrap();

            dispatch(refresh({token: loginResponce, user: userResponce}));

            navigate("/profile");
        } catch (err: any) {
            // catch errors or use formState: {errors}
            errRef.current?.focus();
        }
    };

    return isLoading ? (<div>loading</div>) : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="UserName" {...register("username", {})} />
            <input type="password" placeholder="Password" {...register("password", {})} />

            <input type="submit"/>
        </form>
    );
}
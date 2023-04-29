import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
    userName: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("userName")} />
            <input {...register("password")} />

            <input type="submit" />
        </form>
    );
}

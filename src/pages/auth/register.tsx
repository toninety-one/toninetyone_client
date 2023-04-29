import {SubmitHandler, useForm} from "react-hook-form";

type FormValues = {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName: string;
};

export default function RegisterPage() {

    const {register, handleSubmit} = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <input {...register("userName")} />
            </div>
            <div>

                <input {...register("password")} />
            </div>

            <div>
                <input {...register("firstName")} />
            </div>

            <div>
                <input {...register("lastName")} />
            </div>

            <div>
                <input {...register("middleName")} />
            </div>

            <input type="submit"/>
        </form>
    );
}
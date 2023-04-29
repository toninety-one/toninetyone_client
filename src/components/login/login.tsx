import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/button/button";

type FormValues = {
  userName: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("userName")} />
      <input {...register("password")} />
      <Button button_text={"Войти"} button_type={"submit"} />
        
    </form>
  );
};

export default Login;

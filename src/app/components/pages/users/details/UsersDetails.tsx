import useHeader from "../../../../hooks/useHeader.ts";
import {
    useGetUserQuery,
    useUpdateIdentityUserMutation,
} from "../../../../types/auth/auth.api.slice.ts";
import Loader from "../../../ui/loader/Loader.tsx";
import {useParams} from "react-router-dom";
import NotEnoughItems from "../../../ui/notEnoughtItems/NotEnoughItems.tsx";
import {useForm} from "react-hook-form";
import {IUpdateIdentity} from "../../../../types/auth/auth.interface.ts";
import useAuth from "../../../../hooks/useAuth.ts";

const UsersDetails = () => {
    const {userId} = useParams();

    const {data, isLoading} = useGetUserQuery(userId ? userId : null, {refetchOnMountOrArgChange: true});

    const [updateUser, {isLoading: updateLoading}] = useUpdateIdentityUserMutation();

    const auth = useAuth()
    let title = `${data?.lastName} ${data?.firstName} ${data?.middleName}`;

    if (isLoading || updateLoading) {
        title = "Пользователь";
    }

    useHeader(title)

    const {register, handleSubmit} = useForm<IUpdateIdentity>({
        defaultValues: {
            id: userId,
            userRole: auth.user?.userRole,
            userName: data?.userName,
        }
    });

    const onSubmit = async (data: IUpdateIdentity) => {
        console.log(data)
        await updateUser(data)
    };

    return isLoading ? (<Loader/>) : (
        <div>
            {data ?
                <div>
                    <pre>{JSON.stringify(data, null, 2)}</pre>

                </div>
                : <NotEnoughItems title={"Информация о пользователе не найдена"}/>}

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="userName" {...register("userName", {})} />
                    <select {...register("userRole")}>
                        <option value="User">User</option>
                        <option value="Teacher"> Teacher</option>
                        <option value="Admin"> Admin</option>
                    </select>

                    <input type="submit"/>
                </form>
            </div>
        </div>
    );
};

export default UsersDetails;

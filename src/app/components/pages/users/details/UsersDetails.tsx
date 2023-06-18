import useHeader from "../../../../hooks/useHeader.ts";
import {
    useGetUserQuery,
    useUpdateIdentityUserMutation,
    useUpdateUserMutation,
} from "../../../../types/auth/auth.api.slice.ts";
import Loader from "../../../ui/loader/Loader.tsx";
import {useParams} from "react-router-dom";
import NotEnoughItems from "../../../ui/notEnoughtItems/NotEnoughItems.tsx";
import {useForm} from "react-hook-form";
import {IUpdateIdentity, IUser} from "../../../../types/auth/auth.interface.ts";

const UsersDetails = () => {
    const {userId} = useParams();

    const {data, isLoading} = useGetUserQuery(userId ? userId : null, {refetchOnMountOrArgChange: true});

    const [updateUser, {isLoading: updateLoading}] = useUpdateUserMutation();
    const [updateIdentityUser, {isLoading: updateIdentityLoading}] = useUpdateIdentityUserMutation();

    let title = `${data?.lastName} ${data?.firstName} ${data?.middleName}`;

    if (isLoading || updateIdentityLoading || updateLoading) {
        title = "Пользователь";
    }

    useHeader(title)

    const {register: registerIdentity, handleSubmit: handleIdentity} = useForm<IUpdateIdentity>({
        defaultValues: {
            id: userId,
            userRole: data?.userRole,
            userName: data?.userName,
        }
    });

    const {register: registerUser, handleSubmit: handleUser} = useForm<IUser>({
        defaultValues: {
            id: userId,
            firstName: data?.firstName,
            lastName: data?.lastName,
            middleName: data?.middleName,
            groupId: data?.groupId ?? null,
        }
    });

    const onSubmit = async (data: IUpdateIdentity) => {
        console.log(data)
        await updateIdentityUser(data)
    };

    const onSubmitUser = async (data: IUser) => {
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
                <form onSubmit={handleIdentity(onSubmit)}>
                    <input type="text" placeholder="userName" {...registerIdentity("userName", {})} />
                    <select {...registerIdentity("userRole")}>
                        <option value="User">User</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Administrator">Administrator</option>
                    </select>

                    <input type="submit"/>
                </form>
            </div>

            <div>
                <form onSubmit={handleUser(onSubmitUser)}>
                    <input type="text" placeholder="lastName" {...registerUser("lastName", {})} />
                    <input type="text" placeholder="firstName" {...registerUser("firstName", {})} />
                    <input type="text" placeholder="middleName" {...registerUser("middleName", {})} />
                    <input type="text" placeholder="groupId" {...registerUser("groupId", {})} />

                    <input type="submit"/>
                </form>
            </div>

        </div>
    );
};

export default UsersDetails;

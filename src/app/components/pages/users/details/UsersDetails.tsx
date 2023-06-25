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
import DetailsContainer from "../../../ui/detailsContainer/DetailsContainer.tsx";
import DetailsProperty from "../../../ui/detailsContainer/property/DetailsProperty.tsx";
import List from "../../../ui/list/List.tsx";
import ListItem from "../../../ui/list/listItem/ListItem.tsx";

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
                    <DetailsContainer title={"Пользователь"}>
                        <DetailsProperty text={"Фамилия"} data={data.lastName}/>
                        <DetailsProperty text={"Имя"} data={data.firstName}/>
                        <DetailsProperty text={"Отчество"} data={data.middleName ?? "Отсутствует"}/>
                        <DetailsProperty text={"Логин"} data={data.userName}/>
                        <DetailsProperty text={"Роль"} data={data.userRole}/>
                        {data.userGroup ?
                            <DetailsProperty text={"Группа"} data={data.userGroup.title ?? "Отсутствует"}/> : ""}
                        <DetailsProperty text={"Номер"} data={data.id}/>
                    </DetailsContainer>

                    {data.lastSubmittedLabs && data.lastSubmittedLabs.length > 0 ?
                        <List title={"Последние сданные лабораторные работы"} collapsable={true}>
                            {data.lastSubmittedLabs.map(l => <ListItem title={l.title}
                                                                       path={"/labwork/" + l.labWorkId + "/" + l.id}
                                                                       optionalText={l.mark}/>)}
                        </List> : ""}

                    <form onSubmit={handleIdentity(onSubmit)}>
                        <input type="text" placeholder="userName" {...registerIdentity("userName", {})} />
                        <select {...registerIdentity("userRole")}>
                            <option value="User">User</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Administrator">Administrator</option>
                        </select>

                        <input type="submit"/>
                    </form>

                    <form onSubmit={handleUser(onSubmitUser)}>
                        <input type="text" placeholder="lastName" {...registerUser("lastName", {})} />
                        <input type="text" placeholder="firstName" {...registerUser("firstName", {})} />
                        <input type="text" placeholder="middleName" {...registerUser("middleName", {})} />
                        <input type="text" placeholder="groupId" {...registerUser("groupId", {})} />

                        <input type="submit"/>
                    </form>

                </div>
                : <NotEnoughItems title={"Информация о пользователе не найдена"}/>}
        </div>
    );
};

export default UsersDetails;

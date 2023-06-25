import {useGetAllUsersQuery} from "../../../types/auth/auth.api.slice.ts";
import Loader from "../../ui/loader/Loader.tsx";
import useHeader from "../../../hooks/useHeader.ts";
import List from "../../ui/list/List.tsx";
import ListItem from "../../ui/list/item/ListItem.tsx";
import {getUserTitle} from "../../../types/auth/user.helper.ts";

const Users = () => {
    useHeader("Пользователи")
    const {data, isLoading} = useGetAllUsersQuery(null);

    return isLoading ? (<Loader/>) : (
        <List title={"Пользователи"} notEnoughMessage={"Пользователи не найдены"}>
            {data?.users && data.users.map(u => (
                <ListItem key={u.id} path={`${u.id}`} title={getUserTitle(u)}/>))}
        </List>
    );
};

export default Users;
